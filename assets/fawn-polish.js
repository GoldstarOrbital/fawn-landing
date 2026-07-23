(function () {
  const file = location.pathname.split("/").pop() || "index.html";
  const page = file.replace(/\.html$/i, "") || "index";
  document.documentElement.classList.add("fawn-money-bg");
  document.body.classList.add("fawn-polished", `polish-${page}`);

  const featureSets = {
    index: [
      ["LOC", "Location-aware banking", "FAWN can shape the experience around where a student actually lives: campus deals, nearby savings, and local money habits instead of generic bank copy."],
      ["SCH", "School profile", "Students can anchor the product around their school, with campus savings, school-color signals, and onboarding that understands college life."],
      ["MIL", "Military status", "A simple service-status path can support military, veteran, ROTC, and no-military users without making the whole app feel like paperwork."],
      ["APP", "Open account path", "Signup and login are now visible from the landing page, with the deployed web app acting as the bridge toward iOS."],
    ],
    signup: [
      ["SCH", "Pick your school", "Use school identity to personalize campus savings, messaging, and student-friendly onboarding."],
      ["LOC", "Set your location", "Location can power nearby deal cards and smarter default suggestions."],
      ["MIL", "Service option", "Military or no military should be a clean toggle, not a confusing profile field."],
      ["SEC", "Protected start", "Keep the account-opening flow focused, clear, and secure."],
    ],
    "campus-savings": [
      ["LOC", "Local prices", "Savings are organized around real places near campus."],
      ["SCH", "School signal", "Each school gets color, initials, and deal context."],
      ["DAY", "Daily picks", "Rotating picks keep the page useful after the first visit."],
      ["SUB", "Submit deals", "Students can suggest better prices for review."],
    ],
    military: [
      ["MIL", "Service-aware", "Military, veteran, ROTC, and no-military paths can be handled cleanly."],
      ["BEN", "Benefit lens", "Surface relevant support without overcomplicating the banking flow."],
      ["LOC", "Base or campus", "Location logic can adapt around school, home, or service context."],
      ["SEC", "Respectful defaults", "No assumptions, just clear options."],
    ],
  };

  const fallback = [
    ["LOC", "Location-aware", "Shape savings and content around where the user actually is."],
    ["SCH", "School profile", "Personalize the product around a student's campus and schedule."],
    ["MIL", "Military option", "Support service status as an optional, respectful profile signal."],
    ["APP", "Account access", "Signup and login stay easy to find across the product."],
  ];

  const features = featureSets[page] || fallback;
  const target = document.querySelector("h1, .hero h1, main, .content");
  if (target && !document.querySelector(".fawn-feature-panel")) {
    const panel = document.createElement("section");
    panel.className = "fawn-feature-panel";
    panel.setAttribute("aria-label", "Personalized FAWN features");
    panel.innerHTML = `
      <div class="fawn-feature-tabs" role="tablist">
        ${features.map((item, index) => `<button class="fawn-feature-tab${index === 0 ? " active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-feature-index="${index}">${item[1]}</button>`).join("")}
      </div>
      <div class="fawn-feature-output" role="tabpanel">
        <div class="fawn-feature-mark">${features[0][0]}</div>
        <div><h3>${features[0][1]}</h3><p>${features[0][2]}</p></div>
      </div>`;
    target.insertAdjacentElement(target.matches("h1, .hero h1") ? "afterend" : "afterbegin", panel);
    const output = panel.querySelector(".fawn-feature-output");
    panel.querySelectorAll(".fawn-feature-tab").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.featureIndex || 0);
        const item = features[index] || features[0];
        panel.querySelectorAll(".fawn-feature-tab").forEach((tab, tabIndex) => {
          tab.classList.toggle("active", tabIndex === index);
          tab.setAttribute("aria-selected", String(tabIndex === index));
        });
        output.innerHTML = `<div class="fawn-feature-mark">${item[0]}</div><div><h3>${item[1]}</h3><p>${item[2]}</p></div>`;
      });
    });
  }

  window.addEventListener("pointermove", (event) => {
    const x = Math.round((event.clientX / Math.max(window.innerWidth, 1)) * 100);
    const y = Math.round((event.clientY / Math.max(window.innerHeight, 1)) * 100);
    document.body.style.setProperty("--mouse-x", `${x}%`);
    document.body.style.setProperty("--mouse-y", `${y}%`);
    document.body.style.setProperty("--drift-x", String((x - 50) / 50));
    document.body.style.setProperty("--drift-y", String((y - 50) / 50));
  }, { passive: true });

  document.querySelectorAll("[data-fawn-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = card.getBoundingClientRect();
      const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
      const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
      card.style.transform = `perspective(680px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
})();
