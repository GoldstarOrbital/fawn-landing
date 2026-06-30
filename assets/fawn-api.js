(function () {
  const PROD_API = "https://web-production-13d5b.up.railway.app";
  const LOCAL_API = "http://127.0.0.1:8000";
  const isLocalPage = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
  const override = new URLSearchParams(window.location.search).get("api");

  window.FAWN_API_BASE = override || (isLocalPage ? PROD_API : PROD_API);
  window.FAWN_FRONTEND_URL = window.FAWN_FRONTEND_URL || "https://goldstarorbital.github.io/fawn-frontend/";
  window.FAWN_FRONTEND_NEWS_URL = window.FAWN_FRONTEND_NEWS_URL || "https://goldstarorbital.github.io/fawn-frontend/?tab=news";
  window.FAWN_API_STATUS = async function fawnApiStatus() {
    try {
      const response = await fetch(window.FAWN_API_BASE + "/health", { cache: "no-store" });
      return { ok: response.ok, status: response.status };
    } catch (error) {
      return { ok: false, status: 0, error: error && error.message ? error.message : "Network error" };
    }
  };
})();
