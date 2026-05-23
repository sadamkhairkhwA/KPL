import { SITE } from "./config.js";

export function initFeatures(getLang, translate) {
  initFaq();
  initProductModal(getLang, translate);
  initContactForm(translate, getLang);
  initWhatsApp();
  initCatalogLink();
  initLazyImages();
}

function initFaq() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((el) => el.classList.remove("is-open"));
      if (!wasOpen) item.classList.add("is-open");
    });
  });
}

function initProductModal(getLang, translate) {
  const modal = document.getElementById("product-modal");
  if (!modal) return;

  const backdrop = modal.querySelector(".product-modal-backdrop");
  const closeBtn = modal.querySelector(".product-modal-close");
  const visual = modal.querySelector(".product-modal-visual");
  const catEl = modal.querySelector(".product-modal-cat");
  const titleEl = modal.querySelector(".product-modal-title");
  const descEl = modal.querySelector(".product-modal-desc");
  const metaEl = modal.querySelector(".product-modal-meta");
  const inquireBtn = modal.querySelector(".product-modal-inquire");

  function openModal(product) {
    const lang = getLang();
    const pick = (obj) => obj?.[lang] || obj?.ps || obj?.fa || obj?.en || "";
    const name = pick(product.name);
    const desc = pick(product.desc);
    const details = pick(product.details);
    const catKey = `cat.${product.category}`;
    const cat = translate(catKey, lang);

    if (visual && window.buildProductBox) {
      visual.innerHTML = window.buildProductBox(product, lang);
    }
    catEl.textContent = cat;
    titleEl.textContent = name;
    descEl.textContent = desc;
    metaEl.textContent = details || translate("modal.availability", lang);
    inquireBtn.href = `#contact`;
    inquireBtn.textContent = translate("modal.inquire", lang);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  closeBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  inquireBtn?.addEventListener("click", () => closeModal());

  document.getElementById("productsGrid")?.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = card.dataset.productId;
    const product = window.PRODUCTS_DATA?.find((p) => p.id === id);
    if (product) openModal(product);
  });
}

function initContactForm(translate, getLang) {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = form.querySelector(".form-status") || document.getElementById("formNote");
    const lang = document.documentElement.lang || "en";
    const okMsg = translate("contact.sent", lang);
    const errMsg = translate("contact.error", lang);

    const fd = new FormData(form);
    if (String(fd.get("_honey") || "").trim()) return;

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 4) {
      if (status) {
        status.textContent = errMsg;
        status.classList.add("is-error");
      }
      return;
    }

    const data = fd;
    const partnerType = String(fd.get("partnerType") || "").trim();
    const productInterest = String(fd.get("productInterest") || "").trim();
    const subject =
      partnerType === "distributor" || partnerType === "pharmacy" || partnerType === "hospital"
        ? translate("contact.subjectPartner", lang)
        : "Website inquiry — Khair Khwa Pharma";
    data.append("_subject", subject);
    if (partnerType) data.append("Partner type", partnerType);
    if (productInterest) data.append("Products of interest", productInterest);
    data.append("_captcha", "false");
    data.append("_template", "table");

    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("submit failed");
      if (status) {
        status.textContent = okMsg;
        status.classList.remove("is-error");
        status.classList.add("is-success");
      }
      form.reset();
    } catch {
      if (status) {
        status.textContent = errMsg;
        status.classList.remove("is-success");
        status.classList.add("is-error");
      }
    }
  });
}

function initWhatsApp() {
  const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hello Khair Khwa Pharma, I would like to inquire about your pharmaceutical products."
  )}`;

  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.href = url;
    if (el.tagName === "A") el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  const mapIframe = document.getElementById("contact-map");
  if (mapIframe) mapIframe.src = SITE.mapEmbed;

  document.querySelectorAll("[data-map-link]").forEach((el) => {
    el.href = SITE.mapLink;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
}

function initCatalogLink() {
  document.querySelectorAll("[data-catalog]").forEach((el) => {
    el.href = SITE.catalogPdf;
    el.setAttribute("download", "World-Medicine-Catalog.pdf");
  });
}

function initLazyImages() {
  document.querySelectorAll("img[loading='lazy']").forEach((img) => {
    if (img.complete) return;
    img.addEventListener("error", () => {
      img.style.display = "none";
    });
  });
}
