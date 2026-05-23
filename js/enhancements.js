import { SITE } from "./config.js";

/** Sticky CTA, analytics hook, partner form prefill */
export function initEnhancements(translate, getLang) {
  initStickyPartnerCta();
  initAnalytics();
  initPartnerFormPrefill(translate, getLang);
  initDocLinks();
}

function initStickyPartnerCta() {
  const cta = document.getElementById("stickyPartnerCta");
  if (!cta) return;

  const showAfter = 480;
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const contact = document.getElementById("contact");
    const contactTop = contact ? contact.offsetTop : Infinity;
    const nearContact = y > contactTop - window.innerHeight * 0.5;
    cta.classList.toggle("is-visible", y > showAfter && !nearContact);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initAnalytics() {
  const id = SITE.analyticsId?.trim();
  if (!id || typeof window.gtag === "function") return;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
}

function initPartnerFormPrefill(translate, getLang) {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  if (params.get("partner") === "1" || params.get("partner") === "true") {
    const type = form.querySelector('[name="partnerType"]');
    if (type) type.value = "distributor";
    const msg = form.querySelector('[name="message"]');
    if (msg && !msg.value.trim()) {
      const lang = getLang();
      msg.value = translate("contact.subjectPartner", lang);
    }
    const contact = document.getElementById("contact");
    if (contact) {
      setTimeout(() => {
        contact.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }
}

function initDocLinks() {
  const map = {
    "data-doc-profile": SITE.docs?.companyProfile,
    "data-doc-import": SITE.docs?.importSample,
    "data-doc-partner": SITE.docs?.partnerAuth,
  };
  Object.entries(map).forEach(([attr, href]) => {
    if (!href) return;
    document.querySelectorAll(`[${attr}]`).forEach((el) => {
      el.href = href;
      if (el.tagName === "A") el.setAttribute("target", "_blank");
    });
  });
}
