(function () {
  const file = location.pathname.split("/").pop() || "index.html";
  const page = file.replace(/\.html$/i, "") || "index";
  document.body.classList.add("fawn-polished", `polish-${page}`);

  const tabs = {
    roadmap: ["Next moves", "Safer money rails", "Student-first build"],
    about: ["Founder-built", "Plain-English money", "FDIC partner rails"],
    perks: ["Student discounts", "Campus savings", "Software perks"],
    "campus-savings": ["Location-aware", "School colors", "Daily deal picks"],
    revenue: ["Transparent model", "Penny economics", "Aligned incentives"],
    founding: ["Early access", "Class A share option", "Roadmap voice"],
    member: ["Member status", "Referral tracking", "Founder updates"],
    login: ["Secure access", "Fast return", "Account dashboard"],
    signup: ["School profile", "Location setup", "Military option"],
    dashboard: ["Balance snapshot", "P2P controls", "Card tools"],
    settings: ["Profile controls", "School updates", "Service status"],
    refer: ["Share code", "Campus growth", "Invite rewards"],
    military: ["Military status", "Veteran support", "Fee-light banking"],
    privacy: ["Data boundaries", "Clear terms", "Account protection"],
    terms: ["Plain terms", "Fair use", "Launch clarity"],
    "founding-terms": ["Refund clarity", "Founder perks", "Share option"],
  };

  const chosen = tabs[page] || ["School profile", "Location-aware", "Military option"];
  const target = document.querySelector("h1, .hero h1, main, .content");
  if (target && !document.querySelector(".fawn-feature-tabs")) {
    const tabWrap = document.createElement("div");
    tabWrap.className = "fawn-feature-tabs";
    tabWrap.setAttribute("aria-label", "Personalized FAWN features");
    tabWrap.innerHTML = chosen.map((item) => `<span class="fawn-feature-tab">${item}</span>`).join("");
    target.insertAdjacentElement(target.matches("h1, .hero h1") ? "afterend" : "afterbegin", tabWrap);
  }

  window.addEventListener("pointermove", (event) => {
    const x = Math.round((event.clientX / Math.max(window.innerWidth, 1)) * 100);
    const y = Math.round((event.clientY / Math.max(window.innerHeight, 1)) * 100);
    document.body.style.setProperty("--mouse-x", `${x}%`);
    document.body.style.setProperty("--mouse-y", `${y}%`);
    document.body.style.setProperty("--drift-x", String((x - 50) / 50));
    document.body.style.setProperty("--drift-y", String((y - 50) / 50));
  }, { passive: true });
})();
