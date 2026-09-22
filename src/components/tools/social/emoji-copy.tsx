"use client";

import { useRef, useState } from "react";
import { Label, Input } from "@/components/ui/field";
import { IconCheck } from "@/components/icons";

interface EmojiItem {
  char: string;
  keywords: string;
}

const EMOJI_CATEGORIES: { id: string; name: string; emojis: EmojiItem[] }[] = [
  {
    id: "yuzler",
    name: "Yüzler ve Duygular",
    emojis: [
      { char: "😀", keywords: "gülen yüz mutlu siritma smile" },
      { char: "😂", keywords: "gülme kahkaha sevinç gözyaşı laugh" },
      { char: "😊", keywords: "gülümseme mutlu blush smile" },
      { char: "😍", keywords: "kalp göz aşk sevgi love" },
      { char: "😎", keywords: "gözlük havalı cool sunglasses" },
      { char: "🤔", keywords: "düşünen şüphe merak think" },
      { char: "😢", keywords: "ağlama üzgün gözyaşı sad" },
      { char: "😴", keywords: "uyku uykulu yorgun sleep" },
      { char: "🥳", keywords: "parti kutlama doğum günü celebrate" },
      { char: "😮", keywords: "şaşkın şaşırma surprise" },
      { char: "🥺", keywords: "yalvaran sevimli üzgün begging" },
      { char: "🤗", keywords: "sarılma kucaklaşma hug" },
      { char: "😅", keywords: "ter gülme rahatlama sweat" },
      { char: "🤯", keywords: "akıl patlama şok mind blown" },
      { char: "😇", keywords: "melek masum angel" },
      { char: "🥰", keywords: "kalpli gülümseme sevgi smiling hearts" },
      { char: "🙃", keywords: "ters gülümseme upside down" },
      { char: "😉", keywords: "göz kırpma wink" },
      { char: "😭", keywords: "çok ağlama hüzün crying" },
      { char: "🤩", keywords: "yıldız göz hayran star struck" },
    ],
  },
  {
    id: "jestler",
    name: "Jestler ve Eller",
    emojis: [
      { char: "👍", keywords: "beğeni onay thumbs up" },
      { char: "👎", keywords: "beğenmeme red thumbs down" },
      { char: "👏", keywords: "alkış tebrik clap" },
      { char: "🙏", keywords: "teşekkür dua rica thanks pray" },
      { char: "💪", keywords: "güç kuvvet kas strong" },
      { char: "🤝", keywords: "el sıkışma anlaşma handshake" },
      { char: "✌️", keywords: "barış zafer peace victory" },
      { char: "👋", keywords: "selam merhaba el sallama wave" },
      { char: "🤙", keywords: "telefon işareti ara beni call" },
      { char: "👌", keywords: "tamam süper ok" },
      { char: "🤞", keywords: "şans dileme fingers crossed" },
      { char: "🤟", keywords: "sevgi işareti love sign" },
      { char: "✍️", keywords: "yazma imza writing" },
      { char: "👀", keywords: "göz bakma gözler eyes" },
      { char: "🙌", keywords: "kutlama eller yukarı raise hands" },
      { char: "🫶", keywords: "kalp işareti heart hands" },
      { char: "🤌", keywords: "italyan işareti parmak pinch" },
      { char: "🖐️", keywords: "açık el beş open hand" },
      { char: "☝️", keywords: "işaret parmağı dikkat point" },
      { char: "🤘", keywords: "rock işareti metal horns" },
    ],
  },
  {
    id: "kalpler",
    name: "Kalpler",
    emojis: [
      { char: "❤️", keywords: "kalp aşk sevgi red heart" },
      { char: "🧡", keywords: "turuncu kalp orange heart" },
      { char: "💛", keywords: "sarı kalp sarı yellow heart" },
      { char: "💚", keywords: "yeşil kalp doğa green heart" },
      { char: "💙", keywords: "mavi kalp blue heart" },
      { char: "💜", keywords: "mor kalp purple heart" },
      { char: "🖤", keywords: "siyah kalp black heart" },
      { char: "🤍", keywords: "beyaz kalp white heart" },
      { char: "💖", keywords: "parlayan kalp sparkling heart" },
      { char: "💕", keywords: "iki kalp iki two hearts" },
      { char: "💓", keywords: "atış kalp atan beating heart" },
      { char: "💘", keywords: "oklu kalp cupid" },
      { char: "💝", keywords: "kurdeleli kalp hediye gift heart" },
      { char: "💞", keywords: "dönen kalpler revolving" },
      { char: "💔", keywords: "kırık kalp ayrılık broken" },
      { char: "❤️‍🔥", keywords: "yanan kalp tutku heart fire" },
      { char: "💟", keywords: "kalp süsü decoration" },
      { char: "❣️", keywords: "kalp ünlem exclamation" },
    ],
  },
  {
    id: "hayvanlar",
    name: "Hayvanlar ve Doğa",
    emojis: [
      { char: "🐶", keywords: "köpek dog" },
      { char: "🐱", keywords: "kedi cat" },
      { char: "🦊", keywords: "tilki fox" },
      { char: "🐼", keywords: "panda" },
      { char: "🐨", keywords: "koala" },
      { char: "🦁", keywords: "aslan lion" },
      { char: "🐸", keywords: "kurbağa frog" },
      { char: "🐵", keywords: "maymun monkey" },
      { char: "🦋", keywords: "kelebeğ kelebek butterfly" },
      { char: "🐝", keywords: "arı bee" },
      { char: "🐞", keywords: "uğur böceği ladybug" },
      { char: "🌸", keywords: "çiçek kiraz çiçeği blossom" },
      { char: "🌹", keywords: "gül rose" },
      { char: "🌻", keywords: "ayçiçeği sunflower" },
      { char: "🌵", keywords: "kaktüs cactus" },
      { char: "🌲", keywords: "çam ağacı evergreen" },
      { char: "🍀", keywords: "yonca şans clover" },
      { char: "🌈", keywords: "gökkuşağı rainbow" },
      { char: "☀️", keywords: "güneş güneşli sun" },
      { char: "🌙", keywords: "ay gece moon" },
      { char: "⭐", keywords: "yıldız star" },
      { char: "❄️", keywords: "kar tanesi kış snow" },
      { char: "🔥", keywords: "ateş alev sıcak fire" },
      { char: "💧", keywords: "damla su water" },
    ],
  },
  {
    id: "yiyecek",
    name: "Yiyecek ve İçecek",
    emojis: [
      { char: "🍕", keywords: "pizza" },
      { char: "🍔", keywords: "hamburger burger" },
      { char: "🍟", keywords: "patates kızartması fries" },
      { char: "🌭", keywords: "sosisli hotdog" },
      { char: "🍿", keywords: "patlamış mısır popcorn" },
      { char: "🍩", keywords: "donut tatlı" },
      { char: "🍪", keywords: "kurabiye cookie" },
      { char: "🎂", keywords: "pasta doğum günü cake" },
      { char: "🍰", keywords: "dilim pasta slice" },
      { char: "🍦", keywords: "dondurma ice cream" },
      { char: "🍓", keywords: "çilek strawberry" },
      { char: "🍎", keywords: "elma apple" },
      { char: "🍌", keywords: "muz banana" },
      { char: "🍉", keywords: "karpuz watermelon" },
      { char: "🍇", keywords: "üzüm grape" },
      { char: "🥑", keywords: "avokado avocado" },
      { char: "🥕", keywords: "havuç carrot" },
      { char: "🍅", keywords: "domates tomato" },
      { char: "☕", keywords: "kahve coffee" },
      { char: "🍵", keywords: "çay tea" },
      { char: "🥤", keywords: "içecek meşrubat cup drink" },
      { char: "🍺", keywords: "bira beer" },
      { char: "🥂", keywords: "kadeh kutlama şampanya cheers" },
      { char: "🍽️", keywords: "tabak yemek plate" },
    ],
  },
  {
    id: "etkinlik",
    name: "Etkinlik ve Spor",
    emojis: [
      { char: "⚽", keywords: "futbol top soccer" },
      { char: "🏀", keywords: "basketbol basketball" },
      { char: "🏐", keywords: "voleybol volleyball" },
      { char: "🎾", keywords: "tenis tennis" },
      { char: "🏓", keywords: "masa tenisi ping pong" },
      { char: "🏆", keywords: "kupa şampiyonluk trophy" },
      { char: "🥇", keywords: "altın madalya gold medal" },
      { char: "🥈", keywords: "gümüş madalya silver" },
      { char: "🥉", keywords: "bronz madalya bronze" },
      { char: "🎮", keywords: "oyun kolu game" },
      { char: "🎲", keywords: "zar dice" },
      { char: "🎯", keywords: "hedef dart target" },
      { char: "🎨", keywords: "palet sanat art" },
      { char: "🎵", keywords: "müzik nota music" },
      { char: "🎸", keywords: "gitar guitar" },
      { char: "🎤", keywords: "mikrofon microphone" },
      { char: "🎬", keywords: "klaket film cinema" },
      { char: "📚", keywords: "kitap books" },
      { char: "✈️", keywords: "uçak seyahat airplane" },
      { char: "🚗", keywords: "araba car" },
      { char: "🚀", keywords: "roket rocket" },
      { char: "🏖️", keywords: "plaj tatil beach" },
      { char: "⛺", keywords: "çadır kamp tent" },
      { char: "🎉", keywords: "konfeti kutlama party" },
      { char: "🎁", keywords: "hediye gift" },
    ],
  },
  {
    id: "semboller",
    name: "Semboller ve İşaretler",
    emojis: [
      { char: "✅", keywords: "onay işareti tamam check" },
      { char: "❌", keywords: "çarpı hata red cross" },
      { char: "⚠️", keywords: "uyarı dikkat warning" },
      { char: "❗", keywords: "ünlem önemli exclamation" },
      { char: "❓", keywords: "soru işareti question" },
      { char: "💡", keywords: "ampul fikir idea" },
      { char: "📌", keywords: "raptiye sabitle pin" },
      { char: "📍", keywords: "konum iğnesi location" },
      { char: "🔍", keywords: "büyüteç arama search" },
      { char: "🔒", keywords: "kilit güvenlik lock" },
      { char: "🔑", keywords: "anahtar key" },
      { char: "⏰", keywords: "çalar saat alarm clock" },
      { char: "⌛", keywords: "kum saati bekleyin hourglass" },
      { char: "📅", keywords: "takvim tarih calendar" },
      { char: "📞", keywords: "telefon phone" },
      { char: "✉️", keywords: "zarf mail envelope" },
      { char: "💬", keywords: "konuşma balonu sohbet speech" },
      { char: "💭", keywords: "düşünce balonu thought" },
      { char: "📝", keywords: "not kalem memo" },
      { char: "💰", keywords: "para çuvalı money" },
      { char: "💳", keywords: "kredi kartı card" },
      { char: "🛒", keywords: "alışveriş sepeti cart" },
      { char: "📦", keywords: "kutu paket package" },
      { char: "🏠", keywords: "ev house" },
      { char: "🌐", keywords: "dünya internet globe" },
      { char: "📱", keywords: "telefon mobil phone" },
      { char: "💻", keywords: "bilgisayar laptop" },
      { char: "⚡", keywords: "yıldırım enerji zap" },
      { char: "✨", keywords: "parıltı yıldız sparkles" },
      { char: "🎀", keywords: "kurdele fiyonk ribbon" },
    ],
  },
];

export default function EmojiCopy() {
  const [category, setCategory] = useState(EMOJI_CATEGORIES[0].id);
  const [query, setQuery] = useState("");
  const [copiedChar, setCopiedChar] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = query.trim().toLocaleLowerCase("tr");

  const visibleCategories = q
    ? EMOJI_CATEGORIES.map((c) => ({
        ...c,
        emojis: c.emojis.filter((e) =>
          e.keywords.toLocaleLowerCase("tr").includes(q)
        ),
      })).filter((c) => c.emojis.length > 0)
    : EMOJI_CATEGORIES.filter((c) => c.id === category);

  const copyEmoji = async (char: string) => {
    try {
      await navigator.clipboard.writeText(char);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = char;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedChar(char);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedChar(null), 2000);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {EMOJI_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCategory(c.id);
                setQuery("");
              }}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                !q && category === c.id
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="sm:w-64">
          <Label htmlFor="emoji-search">Emoji ara</Label>
          <Input
            id="emoji-search"
            value={query}
            placeholder="örn. kalp, kedi, onay..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      {visibleCategories.map((c) => (
        <div key={c.id} className="mt-5">
          <h3 className="text-sm font-semibold text-slate-700">{c.name}</h3>
          <div className="mt-2 grid grid-cols-6 gap-2 sm:grid-cols-10">
            {c.emojis.map((e) => (
              <button
                key={e.char}
                onClick={() => copyEmoji(e.char)}
                title="Kopyalamak için tıklayın"
                className="flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-white text-2xl transition hover:border-brand-300 hover:bg-brand-50"
              >
                {e.char}
              </button>
            ))}
          </div>
        </div>
      ))}
      {visibleCategories.length === 0 && (
        <p className="mt-6 text-sm text-slate-500">
          Aramanızla eşleşen emoji bulunamadı; farklı bir kelime deneyin.
        </p>
      )}
      {copiedChar && (
        <div
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg"
          role="status"
        >
          <span className="mr-1.5">{copiedChar}</span> kopyalandı
          <IconCheck size={14} className="ml-2 inline" />
        </div>
      )}
    </div>
  );
}
