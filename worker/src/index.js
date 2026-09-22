// Ücretsiz Çevrimiçi Araçlar platformu için Cloudflare Worker.
//
// Görevler:
//   POST /shorten       → kısa link oluşturur (KV'ye yazar)
//   GET  /check?url=... → yönlendirme zincirini izler ve raporlar
//   GET  /{alias}       → kayıtlı kısa linki hedefine yönlendirir
//
// Gereksinimler:
//   - SHORT_LINKS adında bir KV namespace bağlaması (wrangler.toml içinde)
//   - İsteğe bağlı: ALLOWED_ORIGIN ortam değişkeni (CORS kısıtlaması için)
//
// Güvenlik notları:
//   - Hedef URL'ler yalnızca http/https olabilir; özel ağ adresleri
//     (localhost, 10.x, 192.168.x, 169.254.x vb.) SSRF korumasıyla reddedilir.
//   - Basit bellek içi hız sınırı vardır (izolat başına). Üretimde
//     Cloudflare WAF "Rate limiting rules" ile kalıcı sınırlar önerilir.

const MAX_REDIRECTS = 10;
const ALIAS_RE = /^[a-z0-9-]{3,32}$/;
const RATE_WINDOW_MS = 60_000;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS_HEADERS },
  });
}

// --- Bellek içi hız sınırı (izolat başına) ---
const hits = new Map();

function rateLimited(key, limit) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 10_000) {
    for (const [k, v] of hits) {
      if (now - v[v.length - 1] > RATE_WINDOW_MS) hits.delete(k);
    }
  }
  return arr.length > limit;
}

// --- SSRF koruması ---
function isBlockedIpv4(host) {
  const parts = host.split(".");
  if (parts.length !== 4) return false;
  const nums = parts.map((p) => (/^\d{1,3}$/.test(p) ? Number(p) : -1));
  if (nums.some((n) => n < 0 || n > 255)) return false;
  const [a, b] = nums;
  if (a === 0 || a === 10 || a === 127) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && (b === 0 || b === 168)) return true;
  if (a === 198 && (b === 18 || b === 19)) return true;
  if (a >= 224) return true;
  return false;
}

function isBlockedIp(host) {
  if (!host.includes(":")) return isBlockedIpv4(host);
  const h = host.toLowerCase();
  if (h === "::" || h === "::1") return true;
  if (/^f[cd]/.test(h)) return true; // fc00::/7
  if (/^fe[89ab]/.test(h)) return true; // fe80::/10
  const mapped = h.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isBlockedIpv4(mapped[1]);
  return false;
}

function isBlockedHostname(host) {
  const h = host.replace(/\.$/, "").toLowerCase();
  return (
    h === "localhost" ||
    h.endsWith(".localhost") ||
    h.endsWith(".local") ||
    h.endsWith(".internal") ||
    h.endsWith(".lan") ||
    h.endsWith(".home.arpa")
  );
}

function parseTarget(raw) {
  let u;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  if (!u.hostname) return null;
  const host = u.hostname.replace(/^\[|\]$/g, "");
  if (isBlockedHostname(host) || isBlockedIp(host)) return null;
  return u;
}

// --- POST /shorten ---
async function handleShorten(request, env, origin) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Geçersiz istek gövdesi." }, 400);
  }
  const rawUrl = typeof body.url === "string" ? body.url.trim() : "";
  const target = parseTarget(rawUrl);
  if (!target) {
    return json(
      { ok: false, error: "Geçerli bir genel http:// veya https:// adresi girin." },
      400
    );
  }
  const alias =
    typeof body.alias === "string" ? body.alias.trim().toLowerCase() : "";
  if (alias && !ALIAS_RE.test(alias)) {
    return json(
      {
        ok: false,
        error:
          "Kısa ad 3–32 karakter olmalı; yalnızca küçük harf, rakam ve tire kullanılabilir.",
      },
      400
    );
  }
  const store = env.SHORT_LINKS;
  if (!store) {
    return json({ ok: false, error: "Sunucu depolaması yapılandırılmamış." }, 503);
  }

  let finalAlias = alias;
  if (finalAlias) {
    if (await store.get(finalAlias)) {
      return json(
        { ok: false, error: "Bu kısa ad zaten kullanılıyor. Farklı bir ad deneyin." },
        409
      );
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const candidate = Math.random().toString(36).slice(2, 8);
      if (!(await store.get(candidate))) {
        finalAlias = candidate;
        break;
      }
    }
    if (!finalAlias) {
      return json(
        { ok: false, error: "Kısa link oluşturulamadı. Lütfen tekrar deneyin." },
        503
      );
    }
  }

  await store.put(finalAlias, target.href, {
    metadata: { createdAt: new Date().toISOString() },
  });
  return json({ ok: true, shortUrl: `${origin}/${finalAlias}` });
}

// --- GET /check?url=... ---
async function handleCheck(request) {
  const rawUrl = new URL(request.url).searchParams.get("url") ?? "";
  const start = parseTarget(rawUrl);
  if (!start) {
    return json(
      { ok: false, error: "Geçerli bir genel http:// veya https:// adresi girin." },
      400
    );
  }

  const chain = [];
  let current = start;
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    let res;
    try {
      res = await fetch(current.href, {
        method: "GET",
        redirect: "manual",
        headers: {
          "User-Agent": "FreeOnlineTools-RedirectChecker/1.0",
          Accept: "text/html,application/xhtml+xml,*/*;q=0.8",
        },
      });
    } catch {
      if (chain.length === 0) {
        return json(
          { ok: false, error: "Adrese ulaşılamadı. Bağlantınızı ve adresi kontrol edin." },
          502
        );
      }
      return json({ ok: true, chain, finalUrl: current.href, finalStatus: 0 });
    }

    chain.push({ url: current.href, status: res.status });

    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) break;
      let next;
      try {
        next = new URL(loc, current.href);
      } catch {
        break;
      }
      if (next.protocol !== "http:" && next.protocol !== "https:") break;
      const host = next.hostname.replace(/^\[|\]$/g, "");
      if (isBlockedHostname(host) || isBlockedIp(host)) {
        // Özel ağ hedeflerine istek atılmaz; yalnızca raporlanır.
        chain.push({ url: next.href, status: 0 });
        return json({ ok: true, chain, finalUrl: next.href, finalStatus: 0 });
      }
      current = next;
      continue;
    }
    break;
  }

  const finalRes = chain[chain.length - 1];
  return json({
    ok: true,
    chain,
    finalUrl: current.href,
    finalStatus: finalRes ? finalRes.status : 0,
  });
}

// --- GET /{alias} ---
async function handleRedirect(request, env) {
  const alias = new URL(request.url).pathname.slice(1).toLowerCase();
  if (!ALIAS_RE.test(alias)) {
    return json({ ok: false, error: "Link bulunamadı." }, 404);
  }
  const store = env.SHORT_LINKS;
  if (!store) {
    return json({ ok: false, error: "Sunucu depolaması yapılandırılmamış." }, 503);
  }
  const target = await store.get(alias);
  if (!target) {
    return json({ ok: false, error: "Link bulunamadı." }, 404);
  }
  return new Response(null, {
    status: 301,
    headers: {
      Location: target,
      "Cache-Control": "no-store",
      ...CORS_HEADERS,
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (url.pathname === "/shorten" && request.method === "POST") {
      if (rateLimited(`s:${ip}`, 20)) {
        return json(
          { ok: false, error: "Çok fazla istek gönderdiniz. Bir dakika sonra tekrar deneyin." },
          429
        );
      }
      return handleShorten(request, env, url.origin);
    }

    if (url.pathname === "/check" && request.method === "GET") {
      if (rateLimited(`c:${ip}`, 30)) {
        return json(
          { ok: false, error: "Çok fazla istek gönderdiniz. Bir dakika sonra tekrar deneyin." },
          429
        );
      }
      return handleCheck(request);
    }

    // Dosya uzantılı istekler (favicon.ico vb.) ve ana sayfa kısa link değildir.
    if (request.method === "GET" && url.pathname !== "/" && !url.pathname.includes(".")) {
      if (rateLimited(`r:${ip}`, 120)) {
        return new Response("Çok fazla istek. Lütfen yavaşlayın.", { status: 429 });
      }
      return handleRedirect(request, env);
    }

    return json({ ok: false, error: "Bilinmeyen istek." }, 404);
  },
};
