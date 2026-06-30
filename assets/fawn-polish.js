(function () {
  const file = location.pathname.split("/").pop() || "index.html";
  const page = file.replace(/\.html$/i, "") || "index";
  document.body.classList.add("fawn-polished", `polish-${page}`);

  const blurbs = {
    roadmap: ["🗺️ next moves", "🏦 safer money rails", "🎓 student-first build"],
    about: ["🦌 founder-built", "💵 fewer fee traps", "🧠 plain-English money"],
    perks: ["🎁 useful perks", "🍜 campus savings", "⚡ quick wins"],
    "campus-savings": ["🍕 local deals", "📚 student budget", "💚 no bank nonsense"],
    revenue: ["📈 transparent model", "💵 penny economics", "🛡️ aligned incentives"],
    founding: ["🔥 early believer", "🎟️ locked-in perks", "🦌 buck-backed energy"],
    member: ["🏅 member status", "💌 updates", "✨ founder circle"],
    login: ["🔐 secure access", "⚡ fast return", "💚 welcome back"],
    signup: ["🎓 campus-ready", "🛡️ protected start", "💵 fee-light"],
    dashboard: ["📊 money snapshot", "⚡ quick actions", "🦌 calm controls"],
    settings: ["⚙️ tuned controls", "🛡️ privacy first", "💚 your account"],
    refer: ["🤝 bring friends", "🎁 share upside", "📣 campus signal"],
    military: ["🇺🇸 service-aware", "🛡️ respect built in", "💵 less friction"],
    privacy: ["🛡️ clear privacy", "📄 no fog", "🔐 protected data"],
    terms: ["📄 plain terms", "⚖️ clear edges", "💚 fair use"],
    "founding-terms": ["🎟️ founder terms", "🔁 refund clarity", "📄 no surprises"],
  };

  const chosen = blurbs[page] || ["🦌 FAWN energy", "💵 dollar-buck backdrop", "✨ polished page"];
  const target = document.querySelector("h1, .hero h1, main, .content");
  if (target && !document.querySelector(".fawn-word-chip")) {
    const chipWrap = document.createElement("div");
    chipWrap.setAttribute("aria-label", "Page highlights");
    chipWrap.style.margin = "18px 0 22px";
    chipWrap.innerHTML = chosen.map((item) => `<span class="fawn-word-chip">${item}</span>`).join("");
    target.insertAdjacentElement(target.matches("h1, .hero h1") ? "afterend" : "afterbegin", chipWrap);
  }

  const dock = document.createElement("aside");
  dock.className = "fawn-polish-dock";
  dock.innerHTML = `
    <button type="button" aria-expanded="true">
      <span>🦌 Dollar-buck mode</span>
      <span aria-hidden="true">↕</span>
    </button>
    <p>Move your cursor to steer the background light. Tap this panel to remix the buck meter.</p>
    <div class="fawn-buck-meter" aria-hidden="true"><span></span></div>
  `;
  document.body.appendChild(dock);

  const meter = dock.querySelector(".fawn-buck-meter span");
  dock.querySelector("button").addEventListener("click", () => {
    const width = 28 + Math.round(Math.random() * 68);
    meter.style.setProperty("--buck-meter", `${width}%`);
  });

  window.addEventListener("pointermove", (event) => {
    const x = Math.round((event.clientX / Math.max(window.innerWidth, 1)) * 100);
    const y = Math.round((event.clientY / Math.max(window.innerHeight, 1)) * 100);
    document.body.style.setProperty("--mouse-x", `${x}%`);
    document.body.style.setProperty("--mouse-y", `${y}%`);
    document.body.style.setProperty("--drift-x", String((x - 50) / 50));
    document.body.style.setProperty("--drift-y", String((y - 50) / 50));
  }, { passive: true });
})();
