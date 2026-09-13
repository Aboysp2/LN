const CONFIG = {
  useLiveFeeds: true,
  feedTimeoutMs: 3500,
  maxArticles: 24,
  cacheTTL: 8 * 60 * 1000,
  similarityThreshold: 0.55,
  feeds: {
    breaking: [
      { name: "BBC Arabic", url: "https://feeds.bbci.co.uk/arabic/rss.xml", lang: "ar" },
      { name: "Tchadinfos", url: "https://tchadinfos.com/feed/", lang: "fr" },
      { name: "Alwihda Info", url: "https://www.alwihdainfo.com/xml/syndication.rss", lang: "fr" },
      { name: "Journal du Tchad", url: "https://www.journaldutchad.com/feed/", lang: "fr" }
    ],
    chad: [
      { name: "Tchadinfos", url: "https://tchadinfos.com/feed/", lang: "fr" },
      { name: "Alwihda Info", url: "https://www.alwihdainfo.com/xml/syndication.rss", lang: "fr" },
      { name: "Journal du Tchad", url: "https://www.journaldutchad.com/feed/", lang: "fr" },
      { name: "RFI Afrique", url: "https://www.rfi.fr/fr/afrique/rss", lang: "fr" },
      { name: "Tchadone", url: "https://tchadone.com/post/author/tchadone/feed/", lang: "fr" }
    ],
    africa: [
      { name: "BBC Arabic", url: "https://feeds.bbci.co.uk/arabic/rss.xml", lang: "ar" },
      { name: "BBC Africa", url: "https://feeds.bbci.co.uk/news/world/africa/rss.xml", lang: "en" },
      { name: "Africanews", url: "https://www.africanews.com/feed/", lang: "en" },
      { name: "BBC Afrique", url: "https://feeds.bbci.co.uk/afrique/rss.xml", lang: "fr" },
      { name: "RFI Afrique", url: "https://www.rfi.fr/fr/afrique/rss", lang: "fr" },
      { name: "France 24 Afrique", url: "https://www.france24.com/fr/afrique/rss", lang: "fr" },
      { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", lang: "en" }
    ],
    world: [
      { name: "BBC Arabic", url: "https://feeds.bbci.co.uk/arabic/rss.xml", lang: "ar" },
      { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", lang: "en" },
      { name: "BBC News", url: "https://feeds.bbci.co.uk/news/rss.xml", lang: "en" },
      { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", lang: "en" },
      { name: "France 24", url: "https://www.france24.com/fr/rss", lang: "fr" }
    ],
    sports: [
      { name: "BBC Sport", url: "https://feeds.bbci.co.uk/sport/rss.xml", lang: "en" },
      { name: "France 24 Sport", url: "https://www.france24.com/fr/sports/rss", lang: "fr" },
      { name: "Africanews", url: "https://www.africanews.com/feed/", lang: "en" }
    ]
  },
  proxies: [
    { type: "rss2json", url: "https://api.rss2json.com/v1/api.json?rss_url=" },
    { type: "allorigins", url: "https://api.allorigins.win/raw?url=" }
  ]
};

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220'%3E%3Crect width='100%25' height='100%25' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%2364748b' text-anchor='middle' dy='.3em'%3ELabarkouh News%3C/text%3E%3C/svg%3E";

const translations = {
  ar: {
    direction: "rtl", name: "لاباركوه نيوز",
    description: "أخبار تشاد وأفريقيا والعالم والرياضة",
    latest: "آخر الأخبار", loading: "جاري تحميل الأخبار...",
    noNews: "لا توجد أخبار متاحة حاليًا.", error: "حدث خطأ أثناء تحميل الأخبار.",
    refresh: "تحديث", read: "اقرأ الخبر",
    categories: { breaking: "عاجل", chad: "تشاد", africa: "أفريقيا", world: "العالم", sports: "الرياضة" }
  },
  fr: {
    direction: "ltr", name: "Labarkouh News",
    description: "Actualités du Tchad, d'Afrique, du monde et du sport",
    latest: "Dernières nouvelles", loading: "Chargement des nouvelles...",
    noNews: "Aucune nouvelle disponible.", error: "Une erreur est survenue.",
    refresh: "Actualiser", read: "Lire l'article",
    categories: { breaking: "Urgent", chad: "Tchad", africa: "Afrique", world: "Monde", sports: "Sports" }
  },
  en: {
    direction: "ltr", name: "Labarkouh News",
    description: "News from Chad, Africa, the world and sports",
    latest: "Latest News", loading: "Loading news...",
    noNews: "No news available at the moment.", error: "An error occurred while loading news.",
    refresh: "Refresh", read: "Read article",
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
let currentCategory = "breaking";
let requestToken = 0;
let tickerArticles = [];

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

function getCacheKey(category) {
  return `labarkouh_${category}`;
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
  } catch (e) {}
}

function getCurrentText() {
  return translations[currentLanguage];
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
}

function formatDate(dateValue) {
  if (!dateValue) return "";
  const locale = currentLanguage === "ar" ? "ar" : currentLanguage === "fr" ? "fr-FR" : "en-US";
  const parsed = new Date(dateValue);
  if (isNaN(parsed)) return "";
  return parsed.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

function escapeHtml(value) {
  if (!value) return "";
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
  return withoutTags.length > 180 ? withoutTags.slice(0, 180) + "…" : withoutTags;
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
  return /^https?:\/\//i.test(url) ? url : "#";
}

// ---------- كشف الأخبار المتشابهة (مو بس التطابق الحرفي) ----------

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
  newsContainerElement.innerHTML = `<div class="status-message">${message}</div>`;
}

function normalizeArticle(article) {
  return {
    title: pickLang(article.title) || "Labarkouh News",
    description: pickLang(article.description),
    source: article.source?.name || article.source || "Labarkouh News",
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
  const fragment = document.createDocumentFragment();
  const temp = document.createElement("div");

  temp.innerHTML = articles.map((rawArticle) => {
    const article = normalizeArticle(rawArticle);
    const langBadge = article.lang ? `<span class="lang-badge">${article.lang.toUpperCase()}</span>` : "";
    return `
      <article class="news-card">
        <img class="news-image" src="${escapeHtml(article.image)}" alt="" loading="lazy"
          onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'" />
        <div class="news-content">
          <div class="news-meta">
            <span class="news-meta-source">${escapeHtml(article.source)}${langBadge}</span>
            <span>${formatDate(article.publishedAt)}</span>
          </div>
          <h3 class="news-title">${escapeHtml(article.title)}</h3>
          <p class="news-description">${escapeHtml(article.description)}</p>
          <a class="read-link" href="${escapeHtml(safeUrl(article.url))}" target="_blank" rel="noopener noreferrer">${text.read}</a>
        </div>
      </article>
    `;
  }).join("");

  while (temp.firstChild) {
    fragment.appendChild(temp.firstChild);
  }
  newsContainerElement.innerHTML = "";
  newsContainerElement.appendChild(fragment);
}

// ---------- الشريط المتحرك ----------

function renderTicker() {
  if (!tickerArticles || tickerArticles.length === 0) {
    tickerWrapElement.style.display = "none";
    return;
  }
  tickerWrapElement.style.display = "flex";
  const itemsHtml = tickerArticles.map((rawArticle) => {
    const article = normalizeArticle(rawArticle);
    return `<a class="ticker-item" href="${escapeHtml(safeUrl(article.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(article.title)}</a>`;
  }).join(`<span class="ticker-sep">•</span>`);

  tickerTrackElement.innerHTML = itemsHtml + `<span class="ticker-sep">•</span>` + itemsHtml;

  requestAnimationFrame(() => {
    const width = tickerTrackElement.scrollWidth / 2;
    const speed = 60; // px/ثانية تقريباً
    const duration = Math.max(15, width / speed);
    tickerTrackElement.style.animationDuration = duration + "s";
  });
}

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
    }
  } catch (e) {
    console.warn("Ticker load failed", e);
  }
}

// ---------- محرك تحليل RSS/Atom XML (لخط allorigins) ----------

function localName(el) {
  return el.localName || el.tagName;
}

function findFirstTag(node, names) {
  const all = node.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    if (names.includes(localName(all[i]))) return all[i];
  }
  return null;
}

function findAllTags(node, name) {
  const all = node.getElementsByTagName("*");
  const out = [];
  for (let i = 0; i < all.length; i++) {
    if (localName(all[i]) === name) out.push(all[i]);
  }
  return out;
}

function parseRssXml(xmlText) {
  try {
    const doc = new DOMParser().parseFromString(xmlText, "text/xml");
    if (doc.querySelector("parsererror")) return [];

    const entryNodes = Array.from(doc.getElementsByTagName("*")).filter(
      (el) => localName(el) === "item" || localName(el) === "entry"
    );

    return entryNodes.map((node) => {
      const titleEl = findFirstTag(node, ["title"]);
      const title = titleEl ? titleEl.textContent.trim() : "";

      let link = "";
      for (const el of findAllTags(node, "link")) {
        const href = el.getAttribute("href");
        if (href) { link = href; break; }
        if (el.textContent && el.textContent.trim()) { link = el.textContent.trim(); break; }
      }

      const descEl = findFirstTag(node, ["encoded", "description", "summary", "content"]);
      const descriptionRaw = descEl ? descEl.textContent : "";

      const dateEl = findFirstTag(node, ["pubDate", "published", "updated", "date"]);
      const pubDate = dateEl ? dateEl.textContent.trim() : "";

      let image = extractImageFromHtml(descriptionRaw);
      if (!image) {
        const thumbEl = findFirstTag(node, ["thumbnail"]);
        if (thumbEl) image = thumbEl.getAttribute("url");
      }
      if (!image) {
        const enclosure = findAllTags(node, "enclosure")
          .find((el) => (el.getAttribute("type") || "").startsWith("image"));
        if (enclosure) image = enclosure.getAttribute("url");
      }

      return {
        title,
        description: stripHtml(descriptionRaw),
        pubDate,
        image,
        link
      };
    });
  } catch (e) {
    return [];
  }
}

// ---------- جلب الأخبار ----------

async function fetchViaProxy(feed, proxy) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.feedTimeoutMs);
  try {
    const apiUrl = proxy.url + encodeURIComponent(feed.url);
    const response = await fetch(apiUrl, { signal: controller.signal });
    if (!response.ok) throw new Error("HTTP " + response.status);

    let items = [];
    if (proxy.type === "rss2json") {
      const data = await response.json();
      if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("Parse failed");
      items = data.items.map((item) => ({
        title: item.title,
        description: stripHtml(item.description || item.content || ""),
        pubDate: item.pubDate,
        image: item.thumbnail || item.enclosure?.link || extractImageFromHtml(item.description || item.content),
        link: item.link
      }));
    } else if (proxy.type === "allorigins") {
      const xmlText = await response.text();
      items = parseRssXml(xmlText);
    }

    if (!items || items.length === 0) throw new Error("No items");

    const latest = items[0];
    return [{
      title: latest.title,
      description: latest.description,
      source: feed.name,
      lang: feed.lang,
      publishedAt: latest.pubDate,
      image: latest.image,
      url: latest.link
    }];
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchOneFeed(feed) {
  try {
    return await Promise.any(CONFIG.proxies.map((proxy) => fetchViaProxy(feed, proxy)));
  } catch (err) {
    console.warn("Feed skip:", feed.name);
    return [];
  }
}

async function fetchLiveCategory(category) {
  const feedList = CONFIG.feeds[category];
  if (!feedList || feedList.length === 0) return null;

  const results = await Promise.allSettled(
    feedList.map(feed => fetchOneFeed(feed))
  );

  const articles = results
    .filter(r => r.status === "fulfilled")
    .flatMap(r => r.value);

  if (articles.length === 0) return null;

  // الأولوية: نفس لغة الواجهة أولاً، ثم الأحدث
  articles.sort((a, b) => {
    const aMatch = a.lang === currentLanguage ? 1 : 0;
    const bMatch = b.lang === currentLanguage ? 1 : 0;
    if (aMatch !== bMatch) return bMatch - aMatch;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  // إزالة الأخبار المتشابهة القادمة من مصادر مختلفة (نفس الحدث)
  const unique = [];
  for (const article of articles) {
    const isDuplicate = unique.some(
      (kept) => titleSimilarity(kept.title, article.title) >= CONFIG.similarityThreshold
    );
    if (!isDuplicate) unique.push(article);
  }

  return unique.slice(0, CONFIG.maxArticles);
}

async function loadNews(forceRefresh = false) {
  const myToken = ++requestToken;
  const text = getCurrentText();

  if (!forceRefresh) {
    const cached = getCachedArticles(currentCategory);
    if (cached && cached.length > 0) {
      renderNews(cached);
    } else {
      showMessage(text.loading);
      renderNews(demoNews[currentCategory] || []);
    }
  } else {
    showMessage(text.loading);
  }

  if (!CONFIG.useLiveFeeds || !CONFIG.feeds[currentCategory]) return;

  try {
    const liveArticles = await fetchLiveCategory(currentCategory);
    if (myToken !== requestToken) return;

    if (liveArticles && liveArticles.length > 0) {
      setCachedArticles(currentCategory, liveArticles);
      renderNews(liveArticles);
    }
  } catch (error) {
    console.error(error);
  }
}

function selectCategory(category) {
  if (currentCategory === category) return;
  currentCategory = category;
  categoryButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });
  loadNews(false);
}

languageSelectElement.addEventListener("change", (event) => {
  currentLanguage = event.target.value;
  localStorage.setItem("language", currentLanguage);
  updateInterface();
  loadNews(false);
  renderTicker();
});

refreshButtonElement.addEventListener("click", () => {
  localStorage.removeItem(getCacheKey(currentCategory));
  loadNews(true);
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => selectCategory(button.dataset.category));
});

currentYearElement.textContent = new Date().getFullYear();

updateInterface();
loadNews(false);
loadTicker();
setInterval(loadTicker, CONFIG.cacheTTL);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("SW ready"))
      .catch((err) => console.error("SW failed:", err));
  });
}
