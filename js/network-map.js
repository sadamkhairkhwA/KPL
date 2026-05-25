import { MAP_HUBS } from "./representatives.data.js";
import { AFG_PROVINCES, AFG_VIEWBOX, HUB_TO_PROVINCE } from "./afghanistan-provinces.data.js";
import { PROVINCE_NAMES, LABEL_OFFSETS } from "./afghanistan-province-names.js";

const HQ_ID = "kabul";
const HQ_PROVINCE = HUB_TO_PROVINCE[HQ_ID];

/** hub id by province key */
const PROVINCE_TO_HUB = Object.fromEntries(
  Object.entries(HUB_TO_PROVINCE).map(([hub, prov]) => [prov, hub])
);

export function initNetworkMap(getLang, locField, translate) {
  const canvas = document.getElementById("afgNetworkMap");
  const list = document.getElementById("networkList");
  const detail = document.getElementById("networkDetail");
  if (!canvas || !list) return;
  const wrap = canvas.closest(".network-map-wrap") || canvas;

  const hq = MAP_HUBS.find((h) => h.id === HQ_ID);
  const hqProv = AFG_PROVINCES.find((p) => p.id === HQ_PROVINCE);

  canvas.innerHTML = buildSvg(hq, hqProv, getLang());
  list.innerHTML = MAP_HUBS.map((h) => listItemHtml(h, getLang(), locField, translate)).join("");

  const provinces = canvas.querySelectorAll(".afg-province");
  const hubs = canvas.querySelectorAll(".network-hub");
  const lines = canvas.querySelectorAll(".network-line");

  let activeId = HQ_ID;
  let cycleTimer = null;

  function setActive(id) {
    activeId = id;
    const hub = MAP_HUBS.find((h) => h.id === id);
    const provKey = hub?.provinceKey;

    provinces.forEach((el) => {
      const pid = el.dataset.province;
      const hasHub = Boolean(PROVINCE_TO_HUB[pid]);
      el.classList.remove("is-active", "is-hq-province", "is-rep-province", "afg-province--none");
      if (!hasHub) el.classList.add("afg-province--none");
      if (pid === provKey) {
        el.classList.add("is-active");
        el.classList.add(hub?.role === "hq" ? "is-hq-province" : "is-rep-province");
      }
    });

    list.querySelectorAll(".network-list-item").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.id === id);
    });

    lines.forEach((el) => {
      el.classList.toggle("is-active", el.dataset.to === id);
    });

    hubs.forEach((el) => {
      el.classList.toggle("is-active", el.dataset.id === id);
    });

    canvas.querySelectorAll(".afg-province-label").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.province === provKey);
    });

    if (detail) detail.innerHTML = detailHtml(hub, getLang(), locField, translate);
  }

  provinces.forEach((prov) => {
    const pid = prov.dataset.province;
    const hubId = PROVINCE_TO_HUB[pid];
    const tipKey = hubId
      ? MAP_HUBS.find((h) => h.id === hubId)?.role === "hq"
        ? "network.tooltipHq"
        : "network.tooltipRep"
      : "network.noOffice";
    prov.setAttribute("title", translate(tipKey, getLang()));

    prov.addEventListener("click", () => {
      if (hubId) {
        clearInterval(cycleTimer);
        setActive(hubId);
      }
    });
    prov.addEventListener("mouseenter", () => {
      if (hubId) {
        clearInterval(cycleTimer);
        setActive(hubId);
      }
    });
  });

  document.addEventListener("kkp-lang-change", () => {
    provinces.forEach((prov) => {
      const hubId = PROVINCE_TO_HUB[prov.dataset.province];
      const tipKey = hubId
        ? MAP_HUBS.find((h) => h.id === hubId)?.role === "hq"
          ? "network.tooltipHq"
          : "network.tooltipRep"
        : "network.noOffice";
      prov.setAttribute("title", translate(tipKey, getLang()));
    });
  });

  hubs.forEach((hub) => {
    hub.addEventListener("click", () => {
      clearInterval(cycleTimer);
      setActive(hub.dataset.id);
    });
    hub.addEventListener("mouseenter", () => {
      clearInterval(cycleTimer);
      setActive(hub.dataset.id);
    });
  });

  wrap.addEventListener("mouseleave", startCycle);

  function startCycle() {
    clearInterval(cycleTimer);
    const order = MAP_HUBS.map((h) => h.id);
    let i = order.indexOf(activeId);
    cycleTimer = setInterval(() => {
      i = (i + 1) % order.length;
      setActive(order[i]);
    }, 3800);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        wrap.classList.add("is-animated");
        canvas.classList.add("is-animated");
        setActive(HQ_ID);
        startCycle();
        io.disconnect();
      });
    },
    { threshold: 0.2 }
  );
  io.observe(wrap);

  function bindListEvents() {
    list.querySelectorAll(".network-list-item").forEach((item) => {
      item.addEventListener("click", () => {
        clearInterval(cycleTimer);
        setActive(item.dataset.id);
      });
      item.addEventListener("mouseenter", () => {
        clearInterval(cycleTimer);
        setActive(item.dataset.id);
      });
    });
  }

  bindListEvents();

  document.addEventListener("kkp-lang-change", () => {
    const lang = getLang();
    list.innerHTML = MAP_HUBS.map((h) => listItemHtml(h, lang, locField, translate)).join("");
    bindListEvents();
    updateProvinceLabels(canvas, lang);
    if (detail) detail.innerHTML = detailHtml(MAP_HUBS.find((h) => h.id === activeId), lang, locField, translate);
  });
}

function provinceLabel(provinceId, lang) {
  const n = PROVINCE_NAMES[provinceId];
  if (!n) return provinceId;
  return n[lang] || n.ps || n.fa || n.en || provinceId;
}

function updateProvinceLabels(canvas, lang) {
  canvas.querySelectorAll(".afg-province-label").forEach((el) => {
    el.textContent = provinceLabel(el.dataset.province, lang);
  });
}

function buildProvinceLabels(lang) {
  return AFG_PROVINCES.map((p) => {
    const x = (p.cx / 100) * 1000;
    const y = (p.cy / 100) * 700;
    const off = LABEL_OFFSETS[p.id] || { dx: 0, dy: 0 };
    const name = provinceLabel(p.id, lang);
    const len = name.length;
    const size = len > 10 ? 7.5 : len > 7 ? 8.5 : 9.5;
    const hub = PROVINCE_TO_HUB[p.id];
    const weight = p.id === HQ_PROVINCE || hub ? 700 : 600;
    return `<text class="afg-province-label ${hub ? "afg-province-label--hub" : ""}"
      data-province="${p.id}" x="${x + off.dx}" y="${y + off.dy}"
      text-anchor="middle" dominant-baseline="middle"
      font-size="${size}" font-weight="${weight}">${escapeXml(name)}</text>`;
  }).join("");
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildSvg(hq, hqProv, lang) {
  const repHubs = MAP_HUBS.filter((h) => h.role !== "hq");

  const provincePaths = AFG_PROVINCES.map((p) => {
    const hubId = PROVINCE_TO_HUB[p.id];
    const role = hubId ? MAP_HUBS.find((h) => h.id === hubId)?.role : "";
    const dim = hubId ? "" : " afg-province--none";
    return `<path class="afg-province${dim} ${role ? `afg-province--${role}` : ""}" data-province="${p.id}"
      d="${p.path}" fill="${p.color}" stroke="#fff" stroke-width="1.2"
      aria-label="${p.name}" />`;
  }).join("");

  const lines = repHubs
    .map((rep) => {
      const to = AFG_PROVINCES.find((p) => p.id === rep.provinceKey);
      if (!hqProv || !to) return "";
      const d = linePath(hqProv.cx, hqProv.cy, to.cx, to.cy);
      return `<path class="network-line" data-to="${rep.id}" d="${d}" pathLength="1" />`;
    })
    .join("");

  const markers = MAP_HUBS.map((h) => {
    const prov = AFG_PROVINCES.find((p) => p.id === h.provinceKey);
    if (!prov) return "";
    const isHq = h.role === "hq";
    const x = (prov.cx / 100) * 1000;
    const y = (prov.cy / 100) * 700;
    return `
      <g class="network-hub ${isHq ? "network-hub--hq" : ""}" data-id="${h.id}" tabindex="0" role="button"
         transform="translate(${x}, ${y})">
        ${isHq ? '<polygon class="network-hub-star" points="0,-5 1.5,-1.5 5,0 1.5,1.5 0,5 -1.5,1.5 -5,0 -1.5,-1.5" />' : ""}
        <circle class="network-hub-ring network-hub-ring--2" r="${isHq ? 18 : 14}" />
        <circle class="network-hub-ring network-hub-ring--1" r="${isHq ? 12 : 10}" />
        <circle class="network-hub-dot" r="${isHq ? 6.5 : 5.5}" />
      </g>`;
  }).join("");

  return `
    <svg class="network-svg" viewBox="${AFG_VIEWBOX}" preserveAspectRatio="xMidYMid meet" role="img">
      <defs>
        <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f8fbfe"/>
          <stop offset="100%" stop-color="#eef4fa"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="700" fill="url(#mapBg)" rx="8"/>
      <g class="afg-provinces">${provincePaths}</g>
      <g class="afg-labels" aria-hidden="true">${buildProvinceLabels(lang)}</g>
      <g class="network-lines">${lines}</g>
      <g class="network-hubs" filter="url(#mapGlow)">${markers}</g>
    </svg>`;
}

/** Curved line between province centroids (viewBox coords) */
function linePath(x1p, y1p, x2p, y2p) {
  const x1 = (x1p / 100) * 1000;
  const y1 = (y1p / 100) * 700;
  const x2 = (x2p / 100) * 1000;
  const y2 = (y2p / 100) * 700;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 30;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

function listItemHtml(h, lang, locField, translate) {
  const badgeText =
    h.role === "hq" ? translate("network.hqBadge", lang) : translate("network.repBadge", lang);
  const badge =
    h.role === "hq"
      ? `<span class="network-badge network-badge--hq">${badgeText}</span>`
      : `<span class="network-badge">${badgeText}</span>`;
  return `
    <li class="network-list-item" data-id="${h.id}">
      <button type="button" class="network-list-btn">
        ${badge}
        <span class="network-list-city">${locField(h.city, lang)}</span>
        <span class="network-list-province">${locField(h.province, lang)}</span>
      </button>
    </li>`;
}

function detailHtml(h, lang, locField, translate) {
  if (!h) return "";
  const roleKey = h.role === "hq" ? "network.hqLabel" : "network.repLabel";
  const contactLabel = translate("network.contactRegion", lang);
  return `
    <p class="network-detail-role">${translate(roleKey, lang)}</p>
    <h3 class="network-detail-city">${locField(h.city, lang)}</h3>
    <p class="network-detail-province">${locField(h.province, lang)} · ${locField(h.label, lang)}</p>
    <p class="network-detail-desc">${locField(h.desc, lang)}</p>
    <a href="#contact" class="network-detail-contact">${contactLabel}</a>`;
}
