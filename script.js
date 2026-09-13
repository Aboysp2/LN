const CONFIG = {
  useLiveFeeds: true,
  feedTimeoutMs: 3200,
  maxArticles: 28,
  cacheTTL: 7 * 60 * 1000,
  similarityThreshold: 0.52,
  feeds: {
    // للشريط العاجل فقط (لا يظهر كزر)
    breaking: [
      { name: "BBC Arabic", url: "https://feeds.bbci.co.uk/arabic/rss.xml", lang: "ar" },
      { name: "Tchadinfos", url: "https://tchadinfos.com/feed/", lang: "fr" },
      { name: "Alwihda Info", url: "https://www.alwihdainfo.com/xml/syndication.rss", lang: "fr" },
      { name: "RFI Afrique", url: "https://www.rfi.fr/fr/afrique/rss", lang: "fr" }
    ],
    // أخبار تشاد فقط
    chad: [
      { name: "Tchadinfos", url: "https://tchadinfos.com/feed/", lang: "fr" },
      { name: "Alwihda Info", url: "https://www.alwihdainfo.com/xml/syndication.rss", lang: "fr" },
      { name: "Journal du Tchad", url: "https://www.journaldutchad.com/feed/", lang: "fr" },
      { name: "Tchadone", url: "https://tchadone.com/post/author/tchadone/feed/", lang: "fr" }
    ],
    // أفريقيا فقط (بدون مصادر عالمية عامة)
    africa: [
      { name: "BBC Afrique", url: "https://feeds.bbci.co.uk/afrique/rss.xml", lang: "fr" },
      { name: "BBC Africa", url: "https://feeds.bbci.co.uk/news/world/africa/rss.xml", lang: "en" },
      { name: "Africanews", url: "https://www.africanews.com/feed/", lang: "en" },
      { name: "RFI Afrique", url: "https://www.rfi.fr/fr/afrique/rss", lang: "fr" },
      { name: "France 24 Afrique", url: "https://www.france24.com/fr/afrique/rss", lang: "fr" }
    ],
    // العالم بدون أفريقيا
    world: [
      { name: "BBC Arabic", url: "https://feeds.bbci.co.uk/arabic/rss.xml", lang: "ar" },
      { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", lang: "en" },
      { name: "BBC News", url: "https://feeds.bbci.co.uk/news/rss.xml", lang: "en" },
      { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", lang: "en" },
      { name: "France 24", url: "https://www.france24.com/fr/rss", lang: "fr" }
    ],
    sports: [
      { name: "BBC Sport", url: "https://feeds.bbci.co.uk/sport/rss.xml", lang: "en" },
      { name: "France 24 Sport", url: "https://www.france24.com/fr/sports/rss", lang: "fr" }
    ]
  },
  proxies: [
    { type: "rss2json", url: "https://api.rss2json.com/v1/api.json?rss_url=" },
    { type: "allorigins", url: "https://api.allorigins.win/raw?url=" }
  ]
};

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='system-ui' font-size='15' fill='%2394a3b8' text-anchor='middle' dy='.3em'%3ELabarkouh News%3C/text%3E%3C/svg%3E";

const translations = {
  ar: {
    direction: "rtl",
    name: "لاباركوه نيوز",
    description: "أخبار تشاد وأفريقيا والعالم والرياضة",
    latest: "آخر الأخبار",
    loading: "جاري تحميل الأخبار...",
    noNews: "لا توجد أخبار متاحة حاليًا.",
    error: "حدث خطأ أثناء تحميل الأخبار.",
    refresh: "تحديث",
    read: "اقرأ الخبر",
    notifyEnable: "تفعيل الإشعارات",
    notifyEnabled: "الإشعارات مفعّلة",
    notifyDenied: "الإشعارات محظورة",
    notifyUnsupported: "غير مدعوم",
    notifyNew: "خبر عاجل جديد",
    categories: { breaking: "عاجل", chad: "تشاد", africa: "أفريقيا", world: "العالم", sports: "الرياضة" }
  },
  fr: {
    direction: "ltr",
    name: "Labarkouh News",
    description: "Actualités du Tchad, d'Afrique, du monde et du sport",
    latest: "Dernières nouvelles",
    loading: "Chargement des nouvelles...",
    noNews: "Aucune nouvelle disponible.",
    error: "Une erreur est survenue.",
    refresh: "Actualiser",
    read: "Lire l'article",
    notifyEnable: "Activer les notifications",
    notifyEnabled: "Notifications activées",
    notifyDenied: "Notifications bloquées",
    notifyUnsupported: "Non supporté",
    notifyNew: "Nouvelle alerte",
    categories: { breaking: "Urgent", chad: "Tchad", africa: "Afrique", world: "Monde", sports: "Sports" }
  },
  en: {
    direction: "ltr",
    name: "Labarkouh News",
    description: "News from Chad, Africa, the world and sports",
    latest: "Latest News",
    loading: "Loading news...",
    noNews: "No news available at the moment.",
    error: "An error occurred while loading news.",
    refresh: "Refresh",
    read: "Read article",
    notifyEnable: "Enable notifications",
    notifyEnabled: "Notifications on",
    notifyDenied: "Notifications blocked",
    notifyUnsupported: "Not supported",
    notifyNew: "Breaking news",
    categories: { breaking: "Breaking", chad: "Chad", africa: "Africa", world: "World", sports: "Sports" }
  }
};

const demoNews = {
  breaking: [{
    title: { ar: "آخر الأخبار العاجلة من تشاد وأفريقيا", fr: "Dernières actualités urgentes du Tchad et d'Afrique", en: "Latest breaking news from Chad and Africa" },
    description: { ar: "تابع أهم المستجدات والأخبار العاجلة لحظة بلحظة.", fr: "Suivez les principaux développements et les actualités urgentes en direct.", en: "Follow the latest developments and breaking news live." },
    source: "Labarkouh News", publishedAt: new Date().toISOString(), image: PLACEHOLDER_IMAGE,
    url: "https://www.google.com/search?q=Chad+latest+news"
  }],
  chad: [{
    title: { ar: "أخبار تشاد اليوم", fr: "Actualités du Tchad aujourd'hui", en: "Chad news today" },
    description: { ar: "أهم الأخبار السياسية والاقتصادية والاجتماعية من تشاد.", fr: "Les principales actualités politiques, économiques et sociales du Tchad.", en: "Top political, economic and social news from Chad." },
    source: "Chad News", publishedAt: new Date().toISOString(), image: PLACEHOLDER_IMAGE,
    url: "https://www.google.com/search?q=Chad+news"
  }],
  africa: [{
    title: { ar: "أبرز أخبار أفريقيا", fr: "Principales actualités d'Afrique", en: "Top news from Africa" },
    description: { ar: "تغطية شاملة للأخبار السياسية والاقتصادية في أفريقيا.", fr: "Couverture complète de l'actualité politique et économique en Afrique.", en: "Full coverage of political and economic news in Africa." },
    source: "Africa News", publishedAt: new Date().toISOString(), image: PLACEHOLDER_IMAGE,
    url: "https://www.google.com/search?q=Africa+news"
  }],
  world: [{
    title: { ar: "أهم الأخبار العالمية", fr: "Principales actualités mondiales", en: "Top world news" },
    description: { ar: "آخر الأخبار والتطورات من مختلف أنحاء العالم.", fr: "Les dernières actualités et développements à travers le monde.", en: "The latest news and developments around the world." },
    source: "World News", publishedAt: new Date().toISOString(), image: PLACEHOLDER_IMAGE,
    url: "https://news.google.com"
  }],
  sports: [{
    title: { ar: "آخر أخبار الرياضة", fr: "Dernières actualités sportives", en: "Latest sports news" },
    description: { ar: "أهم نتائج ومباريات كرة القدم والرياضات العالمية.", fr: "Les principaux résultats et matchs de football et de sports mondiaux.", en: "Top results and matches in football and world sports." },
    source: "Sports News", publishedAt: new Date().toISOString(), image: PLACEHOLDER_IMAGE,
    url: "https://www.google.com/search?q=sports+latest+news"
  }]
};

let currentLanguage = localStorage.getItem("language") || "ar";
let currentCategory = "chad";
let requestToken = 0;
let tickerArticles = [];
let isLoading = false;
let lastNotifiedTitle = localStorage.getItem("labarkouh_last_notify") || "";
let notificationsEnabled = localStorage.getItem("labarkouh_notify") === "1";

const appNameElement = document.getElementById("appName");
const appDescriptionElement = document.getElementById("appDescription");
const sectionTitleElement = document.getElementById("sectionTitle");
const languageSelectElement = document.getElementById("languageSelect");
const refreshButtonElement = document.getElementById("refreshButton");
const newsContainerElement = document.getElementById("newsContainer");
const categoryButtons = document.querySelectorAll(".category-button");
const currentYearElement = document.getElementById("currentYear");
const tickerWrapElement = document.getElementById("tickerWrap");
const tickerTrackElement = document.getElementById("tickerTrack");
const tickerLabelElement = document.getElementById("tickerLabel");
const notifyButtonElement = document.getElementById("notifyButton");
const notifyButtonTextElement = document.getElementById("notifyButtonText");

function getCacheKey(category) {
  return `labarkouh_v3_${category}`;
}

function getCachedArticles(category) {
  try {
    const raw = localStorage.getItem(getCacheKey(category));
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() - data.ts > CONFIG.cacheTTL) return null;
    return data.articles;
  } catch {
    return null;
  }
}

function setCachedArticles(category, articles) {
  try {
    localStorage.setItem(getCacheKey(category), JSON.stringify({
      ts: Date.now(),
      articles: articles.slice(0, CONFIG.maxArticles)
    }));
  } catch (_) {}
}

function getCurrentText() {
  return translations[currentLanguage] || translations.ar;
}

function updateInterface() {
  const text = getCurrentText();
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = text.direction;
  appNameElement.textContent = text.name;
  appDescriptionElement.textContent = text.description;
  sectionTitleElement.textContent = text.latest;
  refreshButtonElement.textContent = text.refresh;
  categoryButtons.forEach((button) => {
    button.textContent = text.categories[button.dataset.category];
  });
  languageSelectElement.value = currentLanguage;
  tickerLabelElement.textContent = text.categories.breaking;
  updateNotifyButtonUI();
}

function formatDate(dateValue) {
  if (!dateValue) return "";
  const locale = currentLanguage === "ar" ? "ar" : currentLanguage === "fr" ? "fr-FR" : "en-US";
  const parsed = new Date(dateValue);
  if (isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

function escapeHtml(value) {
  if (value == null) return "";
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function stripHtml(html) {
  if (!html) return "";
  const withoutTags = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return withoutTags.length > 165 ? withoutTags.slice(0, 165) + "…" : withoutTags;
}

function extractImageFromHtml(html) {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : null;
}

function pickLang(value) {
  if (value && typeof value === "object") {
    return value[currentLanguage] || value.fr || value.ar || value.en || "";
  }
  return value || "";
}

function safeUrl(url) {
  return typeof url === "string" && /^https?:\/\//i.test(url) ? url : "#";
}

function normalizeForCompare(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titleSimilarity(a, b) {
  const wordsA = new Set(normalizeForCompare(a).split(" ").filter((w) => w.length > 2));
  const wordsB = new Set(normalizeForCompare(b).split(" ").filter((w) => w.length > 2));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;
  let common = 0;
  wordsA.forEach((w) => { if (wordsB.has(w)) common++; });
  return common / Math.min(wordsA.size, wordsB.size);
}

function showMessage(message) {
  newsContainerElement.innerHTML = `<div class="status-message">${escapeHtml(message)}</div>`;
}

function showSkeletons(count = 6) {
  newsContainerElement.innerHTML = Array.from({ length: count }, () =>
    `<div class="skeleton-card" aria-hidden="true"></div>`
  ).join("");
}

function normalizeArticle(article) {
  return {
    title: pickLang(article.title) || "Labarkouh News",
    description: pickLang(article.description) || "",
    source: (article.source && article.source.name) || article.source || "Labarkouh News",
    lang: article.lang || "",
    publishedAt: article.publishedAt || new Date().toISOString(),
    image: article.image || PLACEHOLDER_IMAGE,
    url: article.url || "#"
  };
}

function renderNews(articles) {
  const text = getCurrentText();
  if (!articles || articles.length === 0) {
    showMessage(text.noNews);
    return;
  }

  const html = articles.map((raw) => {
    const a = normalizeArticle(raw);
    const langBadge = a.lang ? `<span class="lang-badge">${escapeHtml(a.lang.toUpperCase())}</span>` : "";
    return `
      <article class="news-card">
        <img class="news-image" src="${escapeHtml(a.image)}" alt="" loading="lazy" decoding="async"
          onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'" />
        <div class="news-content">
          <div class="news-meta">
            <span class="news-meta-source">${escapeHtml(a.source)}${langBadge}</span>
            <span>${formatDate(a.publishedAt)}</span>
          </div>
          <h3 class="news-title">${escapeHtml(a.title)}</h3>
          <p class="news-description">${escapeHtml(a.description)}</p>
          <a class="read-link" href="${escapeHtml(safeUrl(a.url))}" target="_blank" rel="noopener noreferrer">${text.read}</a>
        </div>
      </article>`;
  }).join("");

  newsContainerElement.innerHTML = html;
}

function renderTicker() {
  if (!tickerArticles || tickerArticles.length === 0) {
    tickerWrapElement.style.display = "none";
    return;
  }
  tickerWrapElement.style.display = "flex";
  const items = tickerArticles.slice(0, 14).map((raw) => {
    const a = normalizeArticle(raw);
    return `<a class="ticker-item" href="${escapeHtml(safeUrl(a.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(a.title)}</a>`;
  });
  const sep = `<span class="ticker-sep">•</span>`;
  const content = items.join(sep);
  tickerTrackElement.innerHTML = content + sep + content;

  requestAnimationFrame(() => {
    const width = tickerTrackElement.scrollWidth / 2;
    const duration = Math.max(20, width / 52);
    tickerTrackElement.style.animationDuration = duration + "s";
  });
}

/* ---------- RSS parsing ---------- */
function localName(el) {
  return (el.localName || el.tagName || "").toLowerCase();
}

function findFirstTag(node, names) {
  const set = new Set(names.map((n) => n.toLowerCase()));
  const all = node.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    if (set.has(localName(all[i]))) return all[i];
  }
  return null;
}

function findAllTags(node, name) {
  const n = name.toLowerCase();
  const all = node.getElementsByTagName("*");
  const out = [];
  for (let i = 0; i < all.length; i++) {
    if (localName(all[i]) === n) out.push(all[i]);
  }
  return out;
}

function parseRssXml(xmlText) {
  try {
    const doc = new DOMParser().parseFromString(xmlText, "text/xml");
    if (doc.querySelector("parsererror")) return [];

    const entryNodes = Array.from(doc.getElementsByTagName("*")).filter((el) => {
      const n = localName(el);
      return n === "item" || n === "entry";
    });

    return entryNodes.map((node) => {
      const titleEl = findFirstTag(node, ["title"]);
      const title = titleEl ? titleEl.textContent.trim() : "";

      let link = "";
      for (const el of findAllTags(node, "link")) {
        const href = el.getAttribute("href");
        if (href && /^https?:/i.test(href)) { link = href; break; }
        const txt = (el.textContent || "").trim();
        if (txt && /^https?:/i.test(txt)) { link = txt; break; }
      }

      const descEl = findFirstTag(node, ["encoded", "description", "summary", "content"]);
      const descriptionRaw = descEl ? descEl.textContent : "";

      const dateEl = findFirstTag(node, ["pubDate", "published", "updated", "date"]);
      const pubDate = dateEl ? dateEl.textContent.trim() : "";

      let image = extractImageFromHtml(descriptionRaw);
      if (!image) {
        const media = findFirstTag(node, ["thumbnail", "content"]);
        if (media) image = media.getAttribute("url") || media.getAttribute("href");
      }
      if (!image) {
        const enclosure = findAllTags(node, "enclosure")
          .find((el) => (el.getAttribute("type") || "").startsWith("image"));
        if (enclosure) image = enclosure.getAttribute("url");
      }

      return { title, description: stripHtml(descriptionRaw), pubDate, image, link };
    }).filter((it) => it.title);
  } catch {
    return [];
  }
}

/* ---------- Fetching (FIXED: returns ALL items) ---------- */
async function fetchViaProxy(feed, proxy) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.feedTimeoutMs);
  try {
    const apiUrl = proxy.url + encodeURIComponent(feed.url);
    const response = await fetch(apiUrl, {
      signal: controller.signal,
      cache: "no-store"
    });
    if (!response.ok) throw new Error("HTTP " + response.status);

    let items = [];
    if (proxy.type === "rss2json") {
      const data = await response.json();
      if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("Parse failed");
      items = data.items.map((item) => ({
        title: item.title || "",
        description: stripHtml(item.description || item.content || ""),
        pubDate: item.pubDate || item.pubdate || "",
        image: item.thumbnail || (item.enclosure && item.enclosure.link) || extractImageFromHtml(item.description || item.content),
        link: item.link || item.url || ""
      }));
    } else {
      const xmlText = await response.text();
      items = parseRssXml(xmlText);
    }

    if (!items || items.length === 0) throw new Error("No items");

    // FIXED: return every article from the feed
    return items.map((it) => ({
      title: it.title,
      description: it.description,
      source: feed.name,
      lang: feed.lang,
      publishedAt: it.pubDate || new Date().toISOString(),
      image: it.image || null,
      url: it.link || "#"
    }));
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchOneFeed(feed) {
  const attempts = CONFIG.proxies.map((proxy) =>
    fetchViaProxy(feed, proxy).catch(() => null)
  );
  const results = await Promise.all(attempts);
  for (const res of results) {
    if (res && res.length > 0) return res;
  }
  return [];
}

function isAfricaRelated(title) {
  const t = (title || "").toLowerCase();
  const keywords = [
    "africa", "afrique", "أفريقيا", "افريقيا", "kenya", "nigeria", "senegal",
    "cameroon", "cameroun", "sudan", "ethiopia", "ghana", "uganda", "tanzania",
    "mali", "niger", "tchad", "chad", "congo", "rwanda", "zimbabwe", "nairobi",
    "lagos", "dakar", "addis", "khartoum", "african"
  ];
  return keywords.some((k) => t.includes(k));
}

async function fetchLiveCategory(category) {
  const feedList = CONFIG.feeds[category];
  if (!feedList || feedList.length === 0) return null;

  const results = await Promise.allSettled(
    feedList.map((feed) => fetchOneFeed(feed))
  );

  let articles = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value || []);

  if (articles.length === 0) return null;

  // في قسم العالم: استبعد الأخبار التي تبدو أفريقية بحتة
  if (category === "world") {
    articles = articles.filter((a) => !isAfricaRelated(a.title));
  }

  // ترتيب قوي حسب اللغة ثم التاريخ
  articles.sort((a, b) => {
    const aMatch = a.lang === currentLanguage ? 2 : (a.lang === "ar" && currentLanguage === "ar" ? 2 : 0);
    const bMatch = b.lang === currentLanguage ? 2 : (b.lang === "ar" && currentLanguage === "ar" ? 2 : 0);
    if (aMatch !== bMatch) return bMatch - aMatch;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  const unique = [];
  for (const article of articles) {
    if (!article.title) continue;
    const isDup = unique.some(
      (kept) => titleSimilarity(kept.title, article.title) >= CONFIG.similarityThreshold
    );
    if (!isDup) unique.push(article);
  }

  return unique.slice(0, CONFIG.maxArticles);
}

/* ---------- Notifications ---------- */
function isNotificationSupported() {
  return "Notification" in window && "serviceWorker" in navigator;
}

function updateNotifyButtonUI() {
  const text = getCurrentText();
  if (!notifyButtonElement || !notifyButtonTextElement) return;

  if (!isNotificationSupported()) {
    notifyButtonTextElement.textContent = text.notifyUnsupported;
    notifyButtonElement.disabled = true;
    notifyButtonElement.classList.remove("enabled");
    return;
  }

  const permission = Notification.permission;
  if (permission === "granted" && notificationsEnabled) {
    notifyButtonTextElement.textContent = text.notifyEnabled;
    notifyButtonElement.classList.add("enabled");
    notifyButtonElement.disabled = false;
  } else if (permission === "denied") {
    notifyButtonTextElement.textContent = text.notifyDenied;
    notifyButtonElement.classList.remove("enabled");
    notifyButtonElement.disabled = true;
  } else {
    notifyButtonTextElement.textContent = text.notifyEnable;
    notifyButtonElement.classList.remove("enabled");
    notifyButtonElement.disabled = false;
  }
}

async function enableNotifications() {
  if (!isNotificationSupported()) return;

  if (Notification.permission === "granted") {
    notificationsEnabled = true;
    localStorage.setItem("labarkouh_notify", "1");
    updateNotifyButtonUI();
    // Test notification
    showLocalNotification(
      getCurrentText().notifyEnabled,
      currentLanguage === "ar"
        ? "ستصلك إشعارات عند وصول أخبار عاجلة جديدة"
        : currentLanguage === "fr"
          ? "Vous recevrez des alertes pour les actualités urgentes"
          : "You will receive alerts for breaking news"
    );
    return;
  }

  if (Notification.permission === "denied") {
    updateNotifyButtonUI();
    return;
  }

  try {
    const result = await Notification.requestPermission();
    if (result === "granted") {
      notificationsEnabled = true;
      localStorage.setItem("labarkouh_notify", "1");
      showLocalNotification(
        getCurrentText().notifyEnabled,
        currentLanguage === "ar"
          ? "ستصلك إشعارات عند وصول أخبار عاجلة جديدة"
          : currentLanguage === "fr"
            ? "Vous recevrez des alertes pour les actualités urgentes"
            : "You will receive alerts for breaking news"
      );
    } else {
      notificationsEnabled = false;
      localStorage.setItem("labarkouh_notify", "0");
    }
    updateNotifyButtonUI();
  } catch (e) {
    console.warn("Notification permission error", e);
  }
}

function showLocalNotification(title, body, url) {
  if (!isNotificationSupported() || Notification.permission !== "granted" || !notificationsEnabled) {
    return;
  }

  const options = {
    body: body || "",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23dc2626' width='100' height='100' rx='22'/%3E%3Ctext x='50' y='68' font-size='52' text-anchor='middle' fill='white' font-family='system-ui' font-weight='800'%3EL%3C/text%3E%3C/svg%3E",
    badge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23dc2626' width='100' height='100' rx='22'/%3E%3Ctext x='50' y='68' font-size='52' text-anchor='middle' fill='white' font-family='system-ui' font-weight='800'%3EL%3C/text%3E%3C/svg%3E",
    tag: "labarkouh-breaking",
    renotify: true,
    requireInteraction: false,
    data: { url: url || window.location.href }
  };

  // Prefer Service Worker notification (works even if tab is in background)
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification(title, options).catch(() => {
        // fallback
        try { new Notification(title, options); } catch (_) {}
      });
    });
  } else {
    try {
      new Notification(title, options);
    } catch (_) {}
  }
}

function maybeNotifyNewBreaking(articles) {
  if (!articles || articles.length === 0) return;
  if (!notificationsEnabled || Notification.permission !== "granted") return;

  const top = articles[0];
  const title = (top.title || "").trim();
  if (!title || title === lastNotifiedTitle) return;

  // Only notify if this looks newer than what we last saw
  lastNotifiedTitle = title;
  localStorage.setItem("labarkouh_last_notify", title);

  const text = getCurrentText();
  showLocalNotification(
    text.notifyNew + " — Labarkouh",
    title,
    top.url || window.location.href
  );
}

/* ---------- Load ---------- */
async function loadTicker() {
  const cached = getCachedArticles("breaking");
  if (cached && cached.length) {
    tickerArticles = cached;
    renderTicker();
  }
  try {
    const live = await fetchLiveCategory("breaking");
    if (live && live.length) {
      tickerArticles = live;
      setCachedArticles("breaking", live);
      renderTicker();
      maybeNotifyNewBreaking(live);
    }
  } catch (e) {
    console.warn("Ticker load failed", e);
  }
}

async function loadNews(forceRefresh = false) {
  const myToken = ++requestToken;
  const text = getCurrentText();

  if (!forceRefresh) {
    const cached = getCachedArticles(currentCategory);
    if (cached && cached.length > 0) {
      renderNews(cached);
    } else {
      showSkeletons(6);
      setTimeout(() => {
        if (myToken === requestToken && newsContainerElement.querySelector(".skeleton-card")) {
          renderNews(demoNews[currentCategory] || []);
        }
      }, 2000);
    }
  } else {
    showSkeletons(6);
  }

  if (!CONFIG.useLiveFeeds || !CONFIG.feeds[currentCategory]) return;

  isLoading = true;
  refreshButtonElement.disabled = true;

  try {
    const liveArticles = await fetchLiveCategory(currentCategory);
    if (myToken !== requestToken) return;

    if (liveArticles && liveArticles.length > 0) {
      setCachedArticles(currentCategory, liveArticles);
      renderNews(liveArticles);
    } else if (!getCachedArticles(currentCategory)) {
      renderNews(demoNews[currentCategory] || []);
    }
  } catch (error) {
    console.error(error);
    if (myToken === requestToken && !getCachedArticles(currentCategory)) {
      showMessage(text.error);
    }
  } finally {
    isLoading = false;
    refreshButtonElement.disabled = false;
  }
}

function selectCategory(category) {
  if (currentCategory === category) return;
  currentCategory = category;
  categoryButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });
  loadNews(false);
}

/* ---------- Events ---------- */
languageSelectElement.addEventListener("change", (e) => {
  currentLanguage = e.target.value;
  localStorage.setItem("language", currentLanguage);
  updateInterface();
  loadNews(false);
  renderTicker();
});

refreshButtonElement.addEventListener("click", () => {
  if (isLoading) return;
  localStorage.removeItem(getCacheKey(currentCategory));
  loadNews(true);
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => selectCategory(button.dataset.category));
});

if (notifyButtonElement) {
  notifyButtonElement.addEventListener("click", () => {
    if (Notification.permission === "granted" && notificationsEnabled) {
      // Toggle off
      notificationsEnabled = false;
      localStorage.setItem("labarkouh_notify", "0");
      updateNotifyButtonUI();
    } else {
      enableNotifications();
    }
  });
}

/* ---------- Init ---------- */
currentYearElement.textContent = new Date().getFullYear();
updateInterface();
loadNews(false);
loadTicker();
setInterval(loadTicker, 3 * 60 * 1000);

// Restore notification preference if already granted
if (isNotificationSupported() && Notification.permission === "granted" && localStorage.getItem("labarkouh_notify") === "1") {
  notificationsEnabled = true;
}
updateNotifyButtonUI();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then((reg) => {
        // Listen for messages from SW if needed later
        console.log("SW ready", reg.scope);
      })
      .catch(() => {});
  });
}
