/**
 * Advanced motion, 3D entrances & micro-interactions
 */

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = () => window.matchMedia("(max-width: 960px)").matches;

export function setupScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar || prefersReduced()) return;

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const p = max > 0 ? doc.scrollTop / max : 0;
    bar.style.transform = `scaleX(${p})`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

export function setupAdvancedReveal() {
  const nodes = document.querySelectorAll("[data-reveal]");
  nodes.forEach((el) => {
    const delay = el.getAttribute("data-reveal-delay");
    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);

    const mode = el.getAttribute("data-reveal");
    if (mode === "blur" || mode === "up" || mode === "scale") {
      el.setAttribute("data-reveal", "3d-up");
    }
    if (mode === "left") el.setAttribute("data-reveal", "3d-left");
    if (mode === "right") el.setAttribute("data-reveal", "3d-right");
  });

  if (prefersReduced()) {
    nodes.forEach((el) => el.classList.add("is-visible"));
    document.querySelectorAll("[data-stagger]").forEach((c) => {
      c.classList.add("is-visible");
      c.querySelectorAll(".stagger-item, .product-card").forEach((i) => i.classList.add("is-visible"));
    });
    document.querySelectorAll(".corridor-panel, .hero-visual").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -12% 0px" }
  );

  nodes.forEach((el) => io.observe(el));

  document.querySelectorAll(".corridor-panel").forEach((panel) => io.observe(panel));

  document.querySelectorAll("[data-stagger]").forEach((container) => {
    const children = [...container.children].filter((c) => !c.classList.contains("filter-indicator"));
    const baseDelay = Number(container.getAttribute("data-stagger-ms")) || 90;

    children.forEach((child, i) => {
      child.classList.add("stagger-item");
      child.style.setProperty("--stagger-delay", `${i * baseDelay}ms`);
    });

    const staggerIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll(".stagger-item").forEach((item) => item.classList.add("is-visible"));
          staggerIo.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    staggerIo.observe(container);
  });
}

export function observeProductGrid(grid) {
  if (!grid || prefersReduced()) {
    grid?.querySelectorAll(".product-card").forEach((c) => c.classList.add("is-visible"));
    return;
  }

  const cards = grid.querySelectorAll(".product-card");
  cards.forEach((card, i) => {
    card.classList.add("stagger-item");
    card.style.setProperty("--stagger-delay", `${(i % 8) * 70}ms`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".product-card").forEach((c) => {
          if (!c.classList.contains("is-hidden-card")) c.classList.add("is-visible");
        });
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  io.observe(grid);
}

export function animateProductFilter(cards, filter) {
  cards.forEach((card, i) => {
    const cat = card.dataset.category;
    const show = filter === "all" || cat === filter;
    const hidden = card.classList.contains("is-hidden-card");

    if (show && hidden) {
      card.classList.remove("is-hidden-card", "is-filter-exit");
      card.style.setProperty("--stagger-delay", `${(i % 6) * 55}ms`);
      card.classList.remove("is-visible");
      requestAnimationFrame(() => {
        card.classList.add("is-visible", "is-filter-enter");
        card.addEventListener("animationend", () => card.classList.remove("is-filter-enter"), { once: true });
      });
    } else if (!show && !hidden) {
      card.classList.add("is-filter-exit");
      card.classList.remove("is-visible");
      card.addEventListener(
        "animationend",
        () => {
          card.classList.remove("is-filter-exit", "is-filter-enter");
          card.classList.add("is-hidden-card");
        },
        { once: true }
      );
    }
  });
}

export function setupFilterIndicator() {
  const wrap = document.querySelector(".product-filters");
  if (!wrap || prefersReduced()) return;

  let indicator = wrap.querySelector(".filter-indicator");
  if (!indicator) {
    indicator = document.createElement("span");
    indicator.className = "filter-indicator";
    indicator.setAttribute("aria-hidden", "true");
    wrap.prepend(indicator);
  }

  const move = (btn) => {
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const pr = wrap.getBoundingClientRect();
    indicator.style.width = `${r.width}px`;
    indicator.style.height = `${r.height}px`;
    indicator.style.transform = `translate(${r.left - pr.left}px, ${r.top - pr.top}px)`;
    indicator.style.opacity = "1";
  };

  const active = wrap.querySelector(".filter-btn.active");
  requestAnimationFrame(() => move(active));

  wrap.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => requestAnimationFrame(() => move(btn)));
  });

  window.addEventListener("resize", () => move(wrap.querySelector(".filter-btn.active")));
}

export function setupParallax() {
  if (prefersReduced() || isMobile()) return;

  const heroContent = document.querySelector(".hero-parallax");
  const heroVisual = document.querySelector(".hero-visual");
  const orbs = document.querySelectorAll(".hero-orb");
  const orbital = document.querySelector(".hero-orbital");

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const heroH = document.querySelector(".hero")?.offsetHeight || 800;
      if (y < heroH) {
        const p = y / heroH;
        if (heroContent) {
          heroContent.style.transform = `perspective(1200px) translate3d(0, ${y * 0.06}px, ${-y * 0.02}px) rotateX(${p * 2}deg)`;
        }
        if (heroVisual && document.body.classList.contains("hero-ready")) {
          heroVisual.style.transform = `perspective(1200px) translate3d(0, ${y * 0.1}px, 0) rotateY(${p * -3}deg)`;
        }
        orbs.forEach((orb, i) => {
          orb.style.transform = `translate3d(0, ${y * (0.03 + i * 0.015)}px, 0)`;
        });
        if (orbital) {
          orbital.style.transform = `translateY(-50%) rotateZ(${y * 0.04}deg)`;
        }
      }
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

export function setupTiltCards() {
  if (prefersReduced() || isMobile()) return;

  const tilt = (el, e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.classList.add("is-tilted");
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px) translateZ(20px)`;
  };

  const reset = (el) => {
    el.classList.remove("is-tilted");
    el.style.transform = "";
  };

  document.querySelectorAll("[data-tilt], .hero-route-card, .about-card, .wm-stat-card").forEach((el) => {
    el.addEventListener("mousemove", (e) => tilt(el, e));
    el.addEventListener("mouseleave", () => reset(el));
  });
}

export function setupHeroEntrance() {
  document.body.classList.add("page-ready", "page-enter");

  if (prefersReduced()) {
    document.body.classList.add("hero-ready");
    document.querySelectorAll(".hero-anim, .hero-title-word, .hero-visual").forEach((el) => {
      el.style.opacity = "1";
    });
    document.querySelector(".hero-visual")?.classList.add("is-visible");
    return;
  }

  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.add("hero-ready");
      document.querySelector(".hero-visual")?.classList.add("is-visible");

      setTimeout(() => {
        document.querySelectorAll(".hero [data-stagger]").forEach((container) => {
          container.classList.add("is-visible");
        });
      }, 1600);
    }, 80);
  });
}

export function setupSectionDecor() {
  document.querySelectorAll(".section").forEach((sec) => {
    if (sec.querySelector(".section-deco")) return;
    const deco = document.createElement("div");
    deco.className = "section-deco";
    deco.setAttribute("aria-hidden", "true");
    sec.appendChild(deco);
  });
}

export function setupButtonRipple() {
  if (prefersReduced()) return;

  document.querySelectorAll(".btn-primary, .btn-outline, .filter-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

export function setupContactFieldAnim() {
  document.querySelectorAll(".form-group input, .form-group textarea").forEach((field) => {
    const update = () => field.classList.toggle("has-value", field.value.trim().length > 0);
    field.addEventListener("input", update);
    field.addEventListener("blur", update);
    update();
  });
}

export function initCursor() {
  document.body.classList.add("is-touch");
}

export function setupHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

export function initAnimations() {
  document.body.classList.add("is-loading", "motion-rich");
  initCursor();
  setupScrollProgress();
  setupAdvancedReveal();
  setupFilterIndicator();
  setupParallax();
  setupTiltCards();
  setupSectionDecor();
  setupButtonRipple();
  setupContactFieldAnim();
  setupHeaderScroll();
}

export function onPageReady() {
  document.body.classList.remove("is-loading");
  setupHeroEntrance();
}
