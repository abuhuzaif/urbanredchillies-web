// Parses items like:
//   name: "Chicken Karahi Shinwari (Half/Full)"  price: "112/175"
// into a base name + orderable variants: [{label:"Half",price:112}, {label:"Full",price:175}]
//
// Plain items like name:"Tea" price:3 become a single unnamed variant.
// Items with price:null are shown but not orderable (e.g. combo descriptions).

export type Variant = { label: string | null; price: number };

export function parseVariants(
  name: string,
  price: number | string | null
): { baseName: string; variants: Variant[] } {
  if (price === null) return { baseName: name, variants: [] };

  if (typeof price === "string" && price.includes("/")) {
    const prices = price.split("/").map((p) => parseFloat(p.trim()));
    const match = name.match(/\(([^)]+)\)\s*$/);
    if (match) {
      const labels = match[1].split("/").map((s) => s.trim());
      const baseName = name.replace(/\s*\([^)]+\)\s*$/, "").trim();
      if (labels.length === prices.length) {
        return {
          baseName,
          variants: labels.map((label, i) => ({ label, price: prices[i] })),
        };
      }
    }
    return {
      baseName: name,
      variants: prices.map((p, i) => ({
        label: i === 0 ? "Regular" : "Large",
        price: p,
      })),
    };
  }

  const num = typeof price === "number" ? price : parseFloat(price);
  if (Number.isNaN(num)) return { baseName: name, variants: [] };
  return { baseName: name, variants: [{ label: null, price: num }] };
}
