const W = "https://free-tools-worker.efeslive24.workers.dev";

const s = await fetch(W + "/shorten", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://example.com/uzun/bir/adres" }),
});
const sj = await s.json();
console.log("shorten:", s.status, JSON.stringify(sj));

const c = await fetch(W + "/check?url=" + encodeURIComponent("https://httpbin.org/redirect/2"));
const cj = await c.json();
console.log("check:", c.status, JSON.stringify(cj).slice(0, 250));

if (sj.ok && sj.shortUrl) {
  const alias = sj.shortUrl.split("/").pop();
  const r = await fetch(W + "/" + alias, { redirect: "manual" });
  console.log("redirect:", r.status, "->", r.headers.get("location"));
}

const b = await fetch(W + "/check?url=" + encodeURIComponent("http://127.0.0.1:8080/admin"));
const bj = await b.json();
console.log("ssrf guard:", b.status, JSON.stringify(bj).slice(0, 200));

const bad = await fetch(W + "/shorten", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "gecersiz-adres", alias: "X!" }),
});
console.log("validation:", bad.status, JSON.stringify(await bad.json()).slice(0, 200));
