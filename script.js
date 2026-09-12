const CONFIG = {
  apiUrl: "",
  apiKey: "",
  useDemoData: true
};

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
    categories: {
      breaking: "عاجل",
      chad: "تشاد",
      africa: "أفريقيا",
      world: "العالم",
      sports: "الرياضة"
    }
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
    categories: {
      breaking: "Urgent",
      chad: "Tchad",
      africa: "Afrique",
      world: "Monde",
      sports: "Sports"
    }
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
    categories: {
      breaking: "Breaking",
      chad: "Chad",
      africa: "Africa",
      world: "World",
      sports: "Sports"
    }
  }
};

const demoNews = {
  breaking: [
    {
      title: "آخر الأخبار العاجلة من تشاد وأفريقيا",
      description: "تابع أهم المستجدات والأخبار العاجلة لحظة بلحظة.",
      source: "Labarkouh News",
      publishedAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
      url: "https://www.google.com/search?q=Chad+latest+news"
    },
    {
      title: "تطورات جديدة في القارة الأفريقية",
      description: "تغطية مستمرة لأبرز الأحداث في أفريقيا والعالم.",
      source: "Africa News",
      publishedAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
      url: "https://www.google.com/search?q=Africa+latest+news"
    }
  ],

  chad: [
    {
      title: "أخبار تشاد اليوم",
      description: "أهم الأخبار السياسية والاقتصادية والاجتماعية من تشاد.",
      source: "Chad News",
      publishedAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada",
      url: "https://www.google.com/search?q=Chad+news"
    },
    {
      title: "مستجدات الأحداث في تشاد",
      description: "آخر التطورات والأحداث المحلية في مختلف مناطق تشاد.",
      source: "Labarkouh News",
      publishedAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e",
      url: "https://www.google.com/search?q=Tchad+actualites"
    }
  ],

  africa: [
    {
      title: "أبرز أخبار أفريقيا",
      description: "تغطية شاملة للأخبار السياسية والاقتصادية في أفريقيا.",
      source: "Africa News",
      publishedAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e",
      url: "https://www.google.com/search?q=Africa+news"
    }
  ],

  world: [
    {
      title: "أهم الأخبار العالمية",
      description: "آخر الأخبار والتطورات من مختلف أنحاء العالم.",
      source: "World News",
      publishedAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
      url: "https://news.google.com"
    }
  ],

  sports: [
    {
      title: "آخر أخبار الرياضة",
      description: "أهم نتائج ومباريات كرة القدم والرياضات العالمية.",
      source: "Sports News",
      publishedAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
      url: "https://www.google.com/search?q=sports+latest+news"
    }
  ]
};

let currentLanguage =
  localStorage.getItem("language") || "ar";

let currentCategory = "breaking";

const appNameElement = document.getElementById("appName");
const appDescriptionElement =
  document.getElementById("appDescription");
const sectionTitleElement =
  document.getElementById("sectionTitle");
const languageSelectElement =
  document.getElementById("languageSelect");
const refreshButtonElement =
  document.getElementById("refreshButton");
const newsContainerElement =
  document.getElementById("newsContainer");
const categoryButtons =
  document.querySelectorAll(".category-button");
const currentYearElement =
  document.getElementById("currentYear");

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
    const category = button.dataset.category;
    button.textContent = text.categories[category];
  });

  languageSelectElement.value = currentLanguage;
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const locale =
    currentLanguage === "ar"
      ? "ar"
      : currentLanguage === "fr"
        ? "fr-FR"
        : "en-US";

  return new Date(dateValue).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function escapeHtml(value) {
  if (!value) {
    return "";
  }

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showLoading() {
  newsContainerElement.innerHTML = `
    <div class="status-message">
      ${getCurrentText().loading}
    </div>
  `;
}

function showMessage(message) {
  newsContainerElement.innerHTML = `
    <div class="status-message">
      ${message}
    </div>
  `;
}

function normalizeArticle(article) {
  return {
    title: article.title || "Labarkouh News",
    description: article.description || "",
    source:
      article.source?.name ||
      article.source ||
      "Labarkouh News",
    publishedAt:
      article.publishedAt ||
      article.published_at ||
      new Date().toISOString(),
    image:
      article.urlToImage ||
      article.image ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    url: article.url || "#"
  };
}

function renderNews(articles) {
  const text = getCurrentText();

  if (!articles || articles.length === 0) {
    showMessage(text.noNews);
    return;
  }

  newsContainerElement.innerHTML = articles
    .map((rawArticle) => {
      const article = normalizeArticle(rawArticle);

      return `
        <article class="news-card">
          <img
            class="news-image"
            src="${escapeHtml(article.image)}"
            alt=""
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c'"
          />

          <div class="news-content">
            <div class="news-meta">
              <span>${escapeHtml(article.source)}</span>
              <span>${formatDate(article.publishedAt)}</span>
            </div>

            <h3 class="news-title">
              ${escapeHtml(article.title)}
            </h3>

            <p class="news-description">
              ${escapeHtml(article.description)}
            </p>

            <a
              class="read-link"
              href="${escapeHtml(article.url)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${text.read}
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

async function fetchNewsFromApi() {
  if (!CONFIG.apiUrl) {
    throw new Error("API URL is not configured");
  }

  const url = new URL(CONFIG.apiUrl);

  url.searchParams.set("category", currentCategory);
  url.searchParams.set("language", currentLanguage);

  if (CONFIG.apiKey) {
    url.searchParams.set("apiKey", CONFIG.apiKey);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to load news");
  }

  const data = await response.json();

  return data.articles || data.results || [];
}

async function loadNews() {
  showLoading();

  try {
    let articles;

    if (CONFIG.useDemoData || !CONFIG.apiUrl) {
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });

      articles = demoNews[currentCategory] || [];
    } else {
      articles = await fetchNewsFromApi();
    }

    renderNews(articles);
  } catch (error) {
    console.error(error);
    showMessage(getCurrentText().error);
  }
}

function selectCategory(category) {
  currentCategory = category;

  categoryButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.category === category
    );
  });

  loadNews();
}

languageSelectElement.addEventListener("change", (event) => {
  currentLanguage = event.target.value;

  localStorage.setItem("language", currentLanguage);

  updateInterface();
  loadNews();
});

refreshButtonElement.addEventListener("click", () => {
  loadNews();
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectCategory(button.dataset.category);
  });
});

currentYearElement.textContent = new Date().getFullYear();

updateInterface();
loadNews();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => {
        console.log("Service Worker registered successfully");
      })
      .catch((error) => {
        console.error(
          "Service Worker registration failed:",
          error
        );
      });
  });
}
