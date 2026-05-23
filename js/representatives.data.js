/**
 * Provincial hubs — head office in Kabul plus regional representatives.
 * provinceKey matches ids in js/afghanistan-provinces.data.js (af-kab, af-her, …)
 */
export const MAP_HUBS = [
  {
    id: "kabul",
    provinceKey: "af-kab",
    role: "hq",
    province: { en: "Kabul", fa: "کابل", ps: "کابل" },
    city: { en: "Kabul", fa: "کابل", ps: "کابل" },
    label: { en: "Head Office", fa: "دفتر مرکزی", ps: "مرکزي دفتر" },
    desc: {
      en: "Import & distribution hub · Nijrab Sharif Market",
      fa: "مرکز واردات و توزیع · بازار نیجراب شریف",
      ps: "د وارداتو او توزیع مرکز · نیجراب شریف مارکیټ",
    },
  },
  {
    id: "kandahar",
    provinceKey: "af-kan",
    role: "rep",
    province: { en: "Kandahar", fa: "قندهار", ps: "کندهار" },
    city: { en: "Kandahar", fa: "قندهار", ps: "کندهار" },
    label: { en: "Southern Region", fa: "منطقه جنوبی", ps: "سویلي سیمه" },
    desc: {
      en: "Southern Afghanistan · hospitals & pharmacy chains",
      fa: "جنوب افغانستان · شفاخانه‌ها و زنجیره دواخانه",
      ps: "سویل افغانستان · روغتونونه او درملتونونه",
    },
  },
  {
    id: "herat",
    provinceKey: "af-her",
    role: "rep",
    province: { en: "Herat", fa: "هرات", ps: "هرات" },
    city: { en: "Herat", fa: "هرات", ps: "هرات" },
    label: { en: "Western Region", fa: "منطقه غربی", ps: "لویدیځ سیمه" },
    desc: {
      en: "Pharmacy & hospital supply across western provinces",
      fa: "رسانی به دواخانه‌ها و شفاخانه‌های غرب",
      ps: "په لویدیځ ولایتونو کې درملتونونو ته رسول",
    },
  },
  {
    id: "badakhshan",
    provinceKey: "af-bds",
    role: "rep",
    province: { en: "Badakhshan", fa: "بدخشان", ps: "بدخشان" },
    city: { en: "Faizabad", fa: "فیض‌آباد", ps: "فیض آباد" },
    label: { en: "Northeast Region", fa: "منطقه شمال‌شرقی", ps: "شمال ختیځ سیمه" },
    desc: {
      en: "Northeast Afghanistan · partner pharmacies & clinics",
      fa: "شمال‌شرق افغانستان · دواخانه‌ها و کلینیک‌های همکار",
      ps: "د افغانستان شمال ختیځ · همکار درملتونونه او کلینیکونه",
    },
  },
  {
    id: "ghazni",
    provinceKey: "af-gha",
    role: "rep",
    province: { en: "Ghazni", fa: "غزنی", ps: "غزني" },
    city: { en: "Ghazni", fa: "غزنی", ps: "غزني" },
    label: { en: "Central Highlands", fa: "منطقه مرکزی", ps: "مرکزي سیمه" },
    desc: {
      en: "Central corridor distribution & local partner support",
      fa: "توزیع دهلیز مرکزی و پشتیبانی شریکان محلی",
      ps: "مرکزي لار توزیع او د محلي ملګرو ملاتړ",
    },
  },
];
