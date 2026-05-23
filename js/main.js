/**
 * Khair Khwa Pharma — site interactions (ES module)
 */

import { products } from "./products.data.js";
import { buildProductBox } from "./product-box.js";
import {
  initAnimations,
  onPageReady,
  observeProductGrid,
  animateProductFilter,
} from "./animations.js";
import { extendTranslations } from "./i18n-extensions.js";
import { initFeatures } from "./features.js";
import { initNetworkMap } from "./network-map.js";
import { initEnhancements } from "./enhancements.js";

const LANG_KEY = "kkp-lang";

const translations = {
  en: {
    "loader.text": "Khair Khwa Pharma",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.partner": "World Medicine",
    "nav.products": "Products",
    "nav.quality": "Quality",
    "nav.contact": "Contact",
    "nav.cta": "Partner With Us",
    "trust.licensed": "Licensed Pharmaceutical Importer",
    "trust.partner": "World Medicine · Turkey",
    "trust.distribution": "Nationwide Distribution · Afghanistan",
    "trust.quality": "Documented Supply Chain",
    "hero.badge": "Pharmaceutical Import & Distribution",
    "hero.title1": "Health is a",
    "hero.title2": "Treasure",
    "hero.title3": "We Share",
    "hero.subtitle":
      "A Kabul-based pharmaceutical company importing registered medicines through World Medicine (Turkey) and supplying healthcare partners across Afghanistan with full documentation and reliable logistics.",
    "hero.cta1": "View Product Portfolio",
    "hero.cta2": "Request Information",
    "hero.stat1": "Healthcare Community",
    "hero.stat2": "Product Lines",
    "hero.stat3": "Business Hours",
    "hero.cardTag": "World Medicine Partner",
    "hero.cardTitle": "Trusted Imports from Turkey",
    "hero.routeTag": "Supply chain",
    "hero.routeTitle": "Turkey to Afghanistan corridor",
    "hero.routeTurkey": "Turkey",
    "hero.routePartner": "World Medicine",
    "hero.routeAfghanistan": "Afghanistan",
    "hero.routeKabul": "Kabul · Nationwide",
    "hero.pillImport": "Import",
    "hero.pillDistribute": "Distribute",
    "about.tag": "Who We Are",
    "about.title": "Trusted Pharmaceutical Importer in Afghanistan",
    "about.lead":
      "Khair Khwa Pharma (خیرخواه فارما) is a Kabul-based pharmaceutical importer and distributor — not a manufacturer today.",
    "about.p1":
      "We import trusted medicines from Turkey through World Medicine and distribute them responsibly to pharmacies, clinics, and communities across Afghanistan.",
    "about.partnerLabel": "Import partner",
    "about.partnerName": "World Medicine · Turkey",
    "about.partnerRoute": "→ Afghanistan",
    "wm.tag": "Import Partner",
    "wm.title": "World Medicine",
    "wm.tagline": "Sağlık Birlikte Paylaştığımız Hazinedir — “Health is a treasure we share together.”",
    "wm.lead":
      "World Medicine is an international pharmaceutical group headquartered in Turkey, supplying medicines and healthcare products to more than 65 countries — including Afghanistan.",
    "wm.p1":
      "Khair Khwa Pharma imports through World Medicine to deliver GMP-certified products from audited manufacturing sites to pharmacies, hospitals, and clinics across Afghanistan, with batch documentation and responsible logistics.",
    "wm.p2":
      "Their mission reflects our own: improving quality of life through accessible, effective medicines — produced under international standards and supported by integrated quality and supply-chain management.",
    "wm.h1": "GMP-standard production at internationally certified facilities",
    "wm.h2": "Portfolio spanning medicines, medical devices, and food supplements",
    "wm.h3": "WMarge R&D, analytics, and controlled supply-chain policies",
    "wm.h4": "Afghanistan among World Medicine’s listed global markets",
    "wm.website": "Visit worldmedicine.com.tr",
    "wm.stat1": "Countries worldwide",
    "wm.stat2": "Products in portfolio",
    "wm.stat3": "GMP production centers",
    "wm.stat4": "Skilled employees",
    "wm.note":
      "Figures published on the World Medicine corporate website. Khair Khwa Pharma is an independent importer and distributor in Afghanistan.",
    "about.f1title": "Import from Turkey",
    "about.f1desc": "Medicines supplied by World Medicine with full documentation",
    "about.f2title": "Nationwide Distribution",
    "about.f2desc": "Reliable supply to partners across Afghanistan",
    "about.f3title": "Documented Supply Chain",
    "about.f3desc": "Batch traceability and import paperwork for every shipment",
    "about.quote": "“Health is a treasure, we share.”",
    "products.tag": "Imported Portfolio",
    "products.title": "Medicines We Import & Distribute",
    "products.desc":
      "World Medicine (Turkey) portfolio — imported and distributed by Khair Khwa Pharma across Afghanistan.",
    "products.sampleNote": "Imported via World Medicine · Turkey",
    "products.filterAll": "All",
    "products.filterAb": "Antibiotics",
    "products.filterVit": "Vitamins",
    "products.filterPain": "Pain Relief",
    "products.filterCns": "CNS / Psychiatry",
    "products.filterResp": "Respiratory",
    "products.filterGastro": "Gastro",
    "cat.antibiotics": "Antibiotics",
    "cat.vitamins": "Vitamins",
    "cat.pain": "Pain Relief",
    "cat.cardio": "Cardiovascular",
    "cat.cns": "CNS / Psychiatry",
    "cat.respiratory": "Respiratory",
    "cat.gastro": "Gastrointestinal",
    "quality.tag": "Our Process",
    "quality.title": "From Turkey to Your Pharmacy",
    "quality.desc":
      "Every shipment is handled with care: verified sourcing from World Medicine, proper documentation, and dependable distribution inside Afghanistan.",
    "quality.s1title": "Import",
    "quality.s1desc": "Medicines sourced from World Medicine, Turkey",
    "quality.s2title": "Assurance",
    "quality.s2desc": "Batch records and registration support",
    "quality.s3title": "Distribution",
    "quality.s3desc": "Storage, logistics & partner support across Afghanistan",
    "quality.badge": "Import Excellence",
    "contact.tag": "Get in Touch",
    "contact.title": "Visit Our Office",
    "contact.desc": "We welcome pharmacies, hospitals, and healthcare partners — reach out anytime.",
    "contact.addressLabel": "Address",
    "contact.address": "Nijrab Sharif Market, Qala-e Najarha Road, Kabul, Afghanistan",
    "contact.phoneLabel": "Phone",
    "contact.emailLabel": "Email",
    "contact.facebook": "Follow on Facebook",
    "contact.name": "Full Name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.message": "Message",
    "contact.submit": "Send Message",
    "contact.note": "We typically respond within 24 hours.",
    "contact.sent": "Thank you — your message has been recorded. We'll get back to you shortly.",
    "contact.error": "Please check the highlighted fields and try again.",
    "footer.tagline": "Health is a treasure, we share.",
    "footer.desc": "Licensed importer and distributor of pharmaceutical products in Afghanistan.",
    "footer.linksTitle": "Company",
    "footer.supply": "Supply Chain",
    "footer.contactTitle": "Contact",
    "footer.rights": "All rights reserved.",
    "corridor.tag": "Supply Chain",
    "corridor.title": "Import Corridor",
    "corridor.desc": "From World Medicine in Turkey to pharmacies across Afghanistan.",
    "corridor.s1title": "Manufacture",
    "corridor.s1desc": "World Medicine · Turkey",
    "corridor.s2title": "Import",
    "corridor.s2desc": "Documentation & logistics",
    "corridor.s3title": "Warehouse",
    "corridor.s3desc": "Kabul storage & handling",
    "corridor.s4title": "Distribute",
    "corridor.s4desc": "Nationwide partner delivery",
    "services.tag": "Therapeutic Areas",
    "services.title": "What We Import & Distribute",
    "services.s1title": "Antibiotics",
    "services.s1desc": "Essential anti-infective therapies",
    "services.s2title": "Vitamins & Supplements",
    "services.s2desc": "Nutritional support lines",
    "services.s3title": "Pain & Inflammation",
    "services.s3desc": "Analgesics and anti-inflammatory",
    "services.s4title": "Cardiovascular",
    "services.s4desc": "Heart and blood pressure care",
    "services.s5title": "Respiratory",
    "services.s5desc": "Inhalers and respiratory care",
    "services.s6title": "Gastrointestinal",
    "services.s6desc": "Digestive health products",
    "certs.tag": "Compliance",
    "certs.title": "Quality & Certifications",
    "certs.c1": "Import Documentation",
    "certs.c3": "Partner Quality Standards",
    "certs.c4": "World Medicine Supply",
    "team.tag": "Our People",
    "team.title": "Leadership Team",
    "team.desc": "Dedicated professionals serving healthcare partners across Afghanistan.",
    "team.m1name": "Khair Khwa Leadership",
    "team.m1role": "Management · Kabul",
    "team.m2name": "Import Operations",
    "team.m2role": "Turkey corridor & logistics",
    "team.m3name": "Distribution",
    "team.m3role": "Nationwide partner support",
  },
  fa: {
    "loader.text": "خیرخواه فارما",
    "nav.home": "خانه",
    "nav.about": "درباره ما",
    "nav.partner": "World Medicine",
    "nav.products": "محصولات",
    "nav.quality": "کیفیت",
    "nav.contact": "تماس",
    "nav.cta": "همکاری با ما",
    "trust.licensed": "واردکننده مجاز دارویی",
    "trust.partner": "World Medicine · ترکیه",
    "trust.distribution": "توزیع سراسری · افغانستان",
    "trust.quality": "زنجیره تأمین مستند",
    "hero.badge": "واردات و توزیع دارویی",
    "hero.title1": "صحت یک",
    "hero.title2": "گنج است",
    "hero.title3": "ما شریک می‌کنیم",
    "hero.subtitle":
      "خیرخواه فارما داروهای باکیفیت را از ترکیه از طریق World Medicine وارد کرده و در سراسر افغانستان توزیع می‌کند.",
    "hero.cta1": "مشاهده محصولات",
    "hero.cta2": "درخواست اطلاعات",
    "hero.stat1": "جامعه صحی",
    "hero.stat2": "خطوط وارداتی",
    "hero.stat3": "همیشه آماده خدمت",
    "hero.cardTag": "ترکیه ← افغانستان",
    "hero.cardTitle": "شریک واردات World Medicine",
    "hero.routeTag": "مسیر واردات",
    "hero.routeTitle": "زنجیره تأمین World Medicine",
    "hero.routeTurkey": "ترکیه",
    "hero.routePartner": "World Medicine",
    "hero.routeAfghanistan": "افغانستان",
    "hero.routeKabul": "کابل · سراسری",
    "hero.pillImport": "واردات",
    "hero.pillDistribute": "توزیع",
    "about.tag": "ما کیستیم",
    "about.title": "واردکننده معتبر دارو در افغانستان",
    "about.lead":
      "خیرخواه فارما (Khair Khwa Pharma) واردکننده و توزیع‌کننده دارو در کابل است — در حال حاضر دارو تولید نمی‌کنیم.",
    "about.p1":
      "ما داروهای معتبر را از ترکیه از طریق شریک World Medicine وارد کرده و به دواخانه‌ها، کلینیک‌ها و جوامع در سراسر افغانستان توزیع می‌کنیم.",
    "about.partnerLabel": "شریک واردات",
    "about.partnerName": "World Medicine · ترکیه",
    "about.partnerRoute": "→ افغانستان",
    "wm.tag": "شریک واردات",
    "wm.title": "World Medicine",
    "wm.tagline": "Sağlık Birlikte Paylaştığımız Hazinedir — «صحت گنجی است که با هم شریک می‌کنیم.»",
    "wm.lead":
      "World Medicine یک گروه بین‌المللی داروسازی با مرکزیت ترکیه است که دارو و محصولات صحی را به بیش از ۶۵ کشور — از جمله افغانستان — عرضه می‌کند.",
    "wm.p1":
      "خیرخواه فارما از طریق World Medicine محصولات دارای گواهی GMP را از مراکز تولید تحت بازرسی به دواخانه‌ها، شفاخانه‌ها و کلینیک‌ها در افغانستان با اسناد بچ و لجستیک مسئولانه می‌رساند.",
    "wm.p2":
      "مأموریت آن‌ها با مأموریت ما هم‌راستا است: بهبود کیفیت زندگی از طریق داروهای مؤثر و در دسترس — تولید تحت معیارهای بین‌المللی و زنجیره تأمین یکپارچه.",
    "wm.h1": "تولید تحت استاندارد GMP در تأسیسات بین‌المللی",
    "wm.h2": "سبد شامل دارو، تجهیزات طبی و مکمل‌های غذایی",
    "wm.h3": "تحقیق WMarge، تحلیل و سیاست‌های زنجیره تأمین",
    "wm.h4": "افغانستان در فهرست بازارهای جهانی World Medicine",
    "wm.website": "مشاهده worldmedicine.com.tr",
    "wm.stat1": "کشور در جهان",
    "wm.stat2": "محصول در سبد",
    "wm.stat3": "مرکز تولید GMP",
    "wm.stat4": "کارمند متخصص",
    "wm.note":
      "ارقام از وب‌سایت رسمی World Medicine. خیرخواه فارما واردکننده و توزیع‌کننده مستقل در افغانستان است.",
    "about.f1title": "واردات از ترکیه",
    "about.f1desc": "تأمین از World Medicine با اسناد کامل",
    "about.f2title": "توزیع سراسری",
    "about.f2desc": "رسانی مطمئن به دواخانه‌ها و کلینیک‌ها در افغانستان",
    "about.f3title": "زنجیره تأمین مستند",
    "about.f3desc": "ردیابی بچ و اسناد واردات برای هر محموله",
    "about.quote": "«صحت یک گنج است، ما شریک می‌کنیم.»",
    "products.tag": "سبد وارداتی",
    "products.title": "داروهایی که وارد و توزیع می‌کنیم",
    "products.desc": "سبد محصولات World Medicine (ترکیه) — واردات و توزیع توسط خیرخواه فارما در افغانستان.",
    "products.sampleNote": "واردات از World Medicine · ترکیه",
    "products.filterAll": "همه",
    "products.filterAb": "آنتی‌بیوتیک",
    "products.filterVit": "ویتامین",
    "products.filterPain": "مسکن",
    "products.filterCns": "اعصاب مرکزی",
    "products.filterResp": "تنفسی",
    "products.filterGastro": "گوارشی",
    "cat.antibiotics": "آنتی‌بیوتیک",
    "cat.vitamins": "ویتامین",
    "cat.pain": "مسکن",
    "cat.cardio": "قلب و عروق",
    "cat.cns": "اعصاب مرکزی",
    "cat.respiratory": "تنفسی",
    "cat.gastro": "گوارشی",
    "quality.tag": "روش کار ما",
    "quality.title": "از ترکیه تا دواخانه شما",
    "quality.desc":
      "ما واردکننده و توزیع‌کننده هستیم — نه تولیدکننده. هر محموله از World Medicine با ردیابی، نگهداری درست و رسانی مسئولانه در افغانستان مدیریت می‌شود.",
    "quality.s1title": "واردات",
    "quality.s1desc": "از World Medicine ترکیه — محصولات ثبت‌شده با اسناد بچ",
    "quality.s2title": "کنترل کیفیت",
    "quality.s2desc": "استانداردهای انبار و آزادسازی قبل از توزیع",
    "quality.s3title": "توزیع",
    "quality.s3desc": "رسانی به‌موقع به دواخانه‌ها، شفاخانه‌ها و شریکان",
    "quality.badge": "کیفیت واردات",
    "contact.tag": "تماس با ما",
    "contact.title": "دفتر ما را ببینید",
    "contact.desc": "ما از دواخانه‌ها، شفاخانه‌ها و شریکان صحی استقبال می‌کنیم — هر زمان پیام بفرستید.",
    "contact.addressLabel": "آدرس",
    "contact.address": "بازار نیجراب شریف، سرک قلعه نجاره‌ها، کابل، افغانستان",
    "contact.phoneLabel": "تلیفون",
    "contact.emailLabel": "ایمیل",
    "contact.facebook": "در فیسبوک دنبال کنید",
    "contact.name": "نام کامل",
    "contact.email": "ایمیل",
    "contact.phone": "تلیفون",
    "contact.message": "پیام",
    "contact.submit": "ارسال پیام",
    "contact.note": "معمولاً ظرف ۲۴ ساعت پاسخ می‌دهیم.",
    "contact.sent": "سپاس — پیام شما ثبت شد. به زودی با شما تماس می‌گیریم.",
    "contact.error": "لطفاً فیلدها را بررسی کرده دوباره کوشش کنید.",
    "footer.tagline": "صحت یک گنج است، ما شریک می‌کنیم.",
    "footer.desc": "واردکننده و توزیع‌کننده مجاز محصولات دارویی در افغانستان.",
    "footer.linksTitle": "شرکت",
    "footer.supply": "زنجیره تأمین",
    "footer.contactTitle": "تماس",
    "footer.rights": "تمام حقوق محفوظ است.",
    "corridor.tag": "زنجیره تأمین",
    "corridor.title": "مسیر واردات",
    "corridor.desc": "از World Medicine در ترکیه تا دواخانه‌ها در سراسر افغانستان.",
    "corridor.s1title": "تولید",
    "corridor.s1desc": "World Medicine · ترکیه",
    "corridor.s2title": "واردات",
    "corridor.s2desc": "اسناد و لجستیک",
    "corridor.s3title": "انبار",
    "corridor.s3desc": "ذخیره و نگهداری در کابل",
    "corridor.s4title": "توزیع",
    "corridor.s4desc": "رسانی به شریکان در سراسر کشور",
    "services.tag": "حوزه‌های درمانی",
    "services.title": "آنچه وارد و توزیع می‌کنیم",
    "services.s1title": "آنتی‌بیوتیک",
    "services.s1desc": "درمان‌های ضد عفونت",
    "services.s2title": "ویتامین و مکمل",
    "services.s2desc": "خطوط تغذیه و تقویت",
    "services.s3title": "درد و التهاب",
    "services.s3desc": "مسکن و ضد التهاب",
    "services.s4title": "قلب و عروق",
    "services.s4desc": "مراقبت قلب و فشار خون",
    "services.s5title": "تنفسی",
    "services.s5desc": "اسپری و مراقبت تنفسی",
    "services.s6title": "گوارشی",
    "services.s6desc": "محصولات سلامت گوارش",
    "certs.tag": "انطباق",
    "certs.title": "کیفیت و گواهینامه‌ها",
    "certs.c1": "اسناد واردات",
    "certs.c3": "استانداردهای شریک",
    "certs.c4": "تأمین World Medicine",
    "team.tag": "تیم ما",
    "team.title": "رهبری",
    "team.desc": "متخصصان خدمت‌رسان به شریکان صحی در افغانستان.",
    "team.m1name": "رهبری خیرخواه",
    "team.m1role": "مدیریت · کابل",
    "team.m2name": "عملیات واردات",
    "team.m2role": "مسیر ترکیه و لجستیک",
    "team.m3name": "توزیع",
    "team.m3role": "پشتیبانی شریکان سراسری",
  },
};

extendTranslations(translations);

function getLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "fa" || saved === "en" || saved === "ps") return saved;
  return "en";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" || lang === "ps" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-fa", lang === "fa");
  document.body.classList.toggle("lang-ps", lang === "ps");
}

function translate(key, lang) {
  const table = translations[lang];
  return table?.[key] ?? translations.en[key] ?? key;
}

function applyI18n(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = translate(key, lang);
  });
  document.dispatchEvent(new CustomEvent("kkp-lang-change", { detail: { lang } }));
}

function setupParticles(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let pts = [];
  let w = 0;
  let h = 0;
  let raf = 0;

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(85, Math.floor((w * h) / 18000));
    pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.2 + 0.6,
      a: Math.random() * 0.5 + 0.15,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    const linkDist = 110;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < linkDist) {
          ctx.strokeStyle = `rgba(26, 95, 180, ${0.12 * (1 - d / linkDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = "rgba(26, 95, 180, 0.45)";
    pts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.globalAlpha = p.a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    raf = requestAnimationFrame(step);
  }

  resize();
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    raf = requestAnimationFrame(step);
  }

  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    resize();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(step);
    }
  });
}

function animateCount(el, target, duration = 1600) {
  const start = performance.now();
  const from = 0;
  const ease = (x) => 1 - (1 - x) ** 3;

  function frame(now) {
    const p = Math.min(1, (now - start) / duration);
    const val = Math.round(from + (target - from) * ease(p));
    el.textContent = String(val);
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = String(target);
  }
  requestAnimationFrame(frame);
}

function setupCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-count]");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    statNumbers.forEach((el) => {
      const n = Number(el.getAttribute("data-count"));
      if (!Number.isNaN(n)) el.textContent = String(n);
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.getAttribute("data-count"));
        if (!Number.isNaN(target)) animateCount(el, target);
        obs.unobserve(el);
      });
    },
    { threshold: 0.35 }
  );

  statNumbers.forEach((el) => io.observe(el));
}

let currentFilter = "all";
let currentLang = "en";

function categoryLabel(cat, lang) {
  return translate(`cat.${cat}`, lang);
}

/** Localized product field with fa/en fallback */
function locField(obj, lang) {
  if (!obj) return "";
  return obj[lang] || obj.ps || obj.fa || obj.en || "";
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  const frag = document.createDocumentFragment();

  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productId = p.id;
    card.dataset.category = p.category;
    if (currentFilter !== "all" && p.category !== currentFilter) {
      card.classList.add("is-hidden-card");
    }
    const formText = locField(p.form, currentLang);
    const formLine = formText ? `<p class="product-form">${formText}</p>` : "";
    card.innerHTML = `
      <div class="product-glow" aria-hidden="true"></div>
      <div class="product-box-wrap">${buildProductBox(p, currentLang)}</div>
      <div class="product-card-inner">
        <span class="product-cat">${categoryLabel(p.category, currentLang)}</span>
        <h3 class="product-name">${locField(p.name, currentLang)}</h3>
        ${formLine}
        <p class="product-desc">${locField(p.desc, currentLang)}</p>
      </div>
    `;
    frag.appendChild(card);
  });
  grid.appendChild(frag);
  observeProductGrid(grid);
}

function applyProductFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  const cards = document.querySelectorAll(".product-card");
  animateProductFilter(cards, filter);
}

function buildShowcase() {
  const track = document.getElementById("showcaseTrack");
  if (!track) return;
  const lang = currentLang;
  const pills = products
    .map(
      (p) =>
        `<div class="showcase-pill" role="presentation"><span aria-hidden="true">${p.icon}</span>${locField(p.name, lang)}</div>`
    )
    .join("");
  track.innerHTML = pills + pills;
}

function setupFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyProductFilter(btn.dataset.filter || "all"));
  });
}

function setupLangToggle() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;
  btn.querySelectorAll(".lang-opt").forEach((opt) => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      const lang = opt.getAttribute("data-lang");
      if (!lang || lang === currentLang) return;
      currentLang = lang;
      setLang(currentLang);
      applyI18n(currentLang);
      renderProducts();
      buildShowcase();
      btn.querySelectorAll(".lang-opt").forEach((o) => {
        o.classList.toggle("is-active", o.getAttribute("data-lang") === lang);
      });
    });
  });
  btn.querySelector(`.lang-opt[data-lang="${currentLang}"]`)?.classList.add("is-active");
}

function setupNav() {
  const header = document.getElementById("header");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  function onScroll() {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = links?.classList.toggle("is-open");
    toggle.classList.toggle("is-open", !!open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

function setupSmoothScroll() {
  const offset = () =>
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - offset() + 4;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

function setupActiveNav() {
  const ids = ["home", "about", "partner", "network", "process", "products", "faq", "contact"];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const navAnchors = document.querySelectorAll(".nav-link");
  const hdr =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: `-${hdr + 8}px 0px -55% 0px`, threshold: 0 }
  );

  sections.forEach((sec) => io.observe(sec));
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  const done = () => {
    loader.classList.add("is-hidden");
    loader.setAttribute("aria-hidden", "true");
    loader.removeAttribute("aria-busy");
  };
  const start = performance.now();
  window.addEventListener("load", () => {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, 900 - elapsed);
    setTimeout(() => {
      done();
      onPageReady();
    }, wait);
  });
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

initAnimations();
hideLoader();
setYear();
currentLang = getLang();
setLang(currentLang);
applyI18n(currentLang);
setupParticles(document.getElementById("heroCanvas"));
setupCounters();
renderProducts();
buildShowcase();
setupFilters();
setupLangToggle();
setupNav();
setupSmoothScroll();
setupActiveNav();
window.PRODUCTS_DATA = products;
window.buildProductBox = buildProductBox;
initFeatures(getLang, (key, lang) => translate(key, lang ?? getLang()));
initNetworkMap(getLang, locField, (key, lang) => translate(key, lang ?? getLang()));
initEnhancements((key, lang) => translate(key, lang ?? getLang()), getLang);
