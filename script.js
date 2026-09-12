const CONFIG = {
  useLiveFeeds: true,
  feedTimeoutMs: 8000,
  feeds: {
    // عاجل + تشاد
    breaking: [
      { name: "Tchadinfos", url: "https://tchadinfos.com/feed/" },
      { name: "Alwihda Info", url: "https://www.alwihdainfo.com/xml/syndication.rss" },
      { name: "Journal du Tchad", url: "https://www.journaldutchad.com/feed/" },
      { name: "Africanews", url: "https://www.africanews.com/feed/" }
    ],
    chad: [
      { name: "Tchadinfos", url: "https://tchadinfos.com/feed/" },
      { name: "Alwihda Info", url: "https://www.alwihdainfo.com/xml/syndication.rss" },
      { name: "Journal du Tchad", url: "https://www.journaldutchad.com/feed/" },
      { name: "Africanews", url: "https://www.africanews.com/feed/" }
    ],
    // أفريقيا
    africa: [
      { name: "Africanews", url: "https://www.africanews.com/feed/" },
      { name: "BBC Afrique", url: "https://feeds.bbci.co.uk/afrique/rss.xml" },
      { name: "AllAfrica", url: "https://allafrica.com/tools/headlines/rdf/africa/headlines.rdf" },
      { name: "France 24 Afrique", url: "https://www.france24.com/fr/afrique/rss" },
      { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" }
    ],
    // العالم
    world: [
      { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
      { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
      { name: "France 24", url: "https://www.france24.com/fr/rss" },
      { name: "Reuters", url: "https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best" },
      { name: "BBC News", url: "https://feeds.bbci.co.uk/news/rss.xml" }
    ],
    // الرياضة
    sports: [
      { name: "BBC Sport", url: "https://feeds.bbci.co.uk/sport/rss.xml" },
      { name: "Africanews Sport", url: "https://www.africanews.com/feed/rss?theme=sport" },
      { name: "France 24 Sport", url: "https://www.france24.com/fr/sports/rss" },
      { name: "Al Jazeera Sport", url: "https://www.aljazeera.com/xml/rss/all.xml" },
      { name: "Goal", url: "https://www.goal.com/feeds/en/news" }
    ]
  },
  rss2jsonEndpoint: "https://api.rss2json.com/v1/api.json?rss_url="
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

const appNameElement = document.getElementById("appName");
const appDescriptionElement = document.getElementById("appDescription");
const sectionTitleElement = document.getElementById("sectionTitle");
const languageSelectElement = document.getElementById("languageSelect");
const refreshButtonElement = document.getElementById("refreshButton");
const newsContainerElement = document.getElementById("newsContainer");
const categoryButtons = document.querySelectorAll(".category-button");
const currentYearElement = document.getElementById("currentYear");

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
  return withoutTags.length > 200 ? withoutTags.slice(0, 200) + "…" : withoutTags;
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

function showMessage(message) {
  newsContainerElement.innerHTML = `<div class="status-message">${message}</div>`;
}

function normalizeArticle(article) {
  return {
    title: pickLang(article.title) || "Labarkouh News",
    description: pickLang(article.description),
    source: article.source?.name || article.source || "Labarkouh News",
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
  newsContainerElement.innerHTML = articles.map((rawArticle) => {
    const article = normalizeArticle(rawArticle);
    return `
      <article class="news-card">
        <img class="news-image" src="${escapeHtml(article.image)}" alt="" loading="lazy"
          onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'" />
        <div class="news-content">
          <div class="news-meta">
            <span>${escapeHtml(article.source)}</span>
            <span>${formatDate(article.publishedAt)}</span>
          </div>
          <h3 class="news-title">${escapeHtml(article.title)}</h3>
          <p class="news-description">${escapeHtml(article.description)}</p>
          <a class="read-link" href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">${text.read}</a>
        </div>
      </article>
    `;
  }).join("");
}

async function fetchOneFeed(feed) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.feedTimeoutMs);
  try {
    const apiUrl = CONFIG.rss2jsonEndpoint + encodeURIComponent(feed.url);
    const response = await fetch(apiUrl, { signal: controller.signal });
    if (!response.ok) throw new Error("Feed request failed: " + feed.name);
    const data = await response.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) {
      throw new Error("Feed parse failed: " + feed.name);
    }
    return data.items.map((item) => ({
      title: item.title,
      description: stripHtml(item.description || item.content || ""),
      source: feed.name,
      publishedAt: item.pubDate,
      image: item.thumbnail || item.enclosure?.link || extractImageFromHtml(item.description || item.content),
      url: item.link
    }));
  } catch (err) {
    console.warn("Feed error:", feed.name, err.message);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchLiveCategory(category) {
  const feedList = CONFIG.feeds[category];
  if (!feedList || feedList.length === 0) return null;

  const results = await Promise.allSettled(feedList.map(fetchOneFeed));
  const articles = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

  if (articles.length === 0) return null;

  // إزالة التكرار حسب العنوان
  const seen = new Set();
  const unique = articles.filter((a) => {
    const key = (a.title || "").toLowerCase().trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  unique.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  return unique.slice(0, 30);
}

async function loadNews() {
  const myToken = ++requestToken;
  const text = getCurrentText();

  showMessage(text.loading);
  // عرض بيانات تجريبية فوراً
  renderNews(demoNews[currentCategory] || []);

  if (!CONFIG.useLiveFeeds || !CONFIG.feeds[currentCategory]) return;

  try {
    const liveArticles = await fetchLiveCategory(currentCategory);
    if (myToken !== requestToken) return;
    if (liveArticles && liveArticles.length > 0) {
      renderNews(liveArticles);
    }
  } catch (error) {
    console.error(error);
  }
}

function selectCategory(category) {
  currentCategory = category;
  categoryButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });
  loadNews();
}

languageSelectElement.addEventListener("change", (event) => {
  currentLanguage = event.target.value;
  localStorage.setItem("language", currentLanguage);
  updateInterface();
  loadNews();
});

refreshButtonElement.addEventListener("click", () => loadNews());

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => selectCategory(button.dataset.category));
});

currentYearElement.textContent = new Date().getFullYear();

updateInterface();
loadNews();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.error("SW registration failed:", err));
  });
}
