/**
 * Product visual — real catalog photo cropped from the World Medicine cover.
 * Each image lives at /assets/products/{id}.png.
 */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pickLang(field, lang, fallback = "") {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return field[lang] || field.en || field.ps || field.fa || fallback;
}

export function buildProductBox(product, lang = "en") {
  const id = product.id || "medicine";
  const enName = (pickLang(product.name, "en", "MED") || "MED").toUpperCase();
  const localName = pickLang(product.name, lang, enName);

  return `
    <figure class="product-photo">
      <img
        class="product-photo__img"
        src="assets/products/${encodeURIComponent(id)}.png"
        alt="${escapeHtml(localName)} — World Medicine"
        loading="lazy"
        decoding="async"
      />
    </figure>
  `;
}
