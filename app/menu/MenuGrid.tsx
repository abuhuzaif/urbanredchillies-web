"use client";

import { useState } from "react";
import { Section } from "../../lib/menu-data";
import { parseVariants } from "../../lib/parse-variants";
import { useCart } from "../../lib/cart-context";
import styles from "./MenuGrid.module.css";

// Cycled placeholder gradients until real dish photos are wired in from Supabase.
const GRADIENTS = [
  "linear-gradient(135deg, #78090f, #3a0a0a)",
  "linear-gradient(135deg, #0a3219, #0a1a10)",
  "linear-gradient(135deg, #8a5a12, #3a2408)",
  "linear-gradient(135deg, #5a1a3a, #2a0a1a)",
  "linear-gradient(135deg, #1a4a5a, #0a1a2a)",
];

export default function MenuGrid({ menu }: { menu: Section[] }) {
  const cart = useCart();
  const [active, setActive] = useState<string>("All");
  const [openVariantKey, setOpenVariantKey] = useState<string | null>(null);

  const visibleSections =
    active === "All" ? menu : menu.filter((s) => s.cat === active);

  return (
    <>
      <div className={styles.pillRow}>
        <button
          className={`${styles.pill} ${active === "All" ? styles.pillActive : ""}`}
          onClick={() => setActive("All")}
        >
          All
        </button>
        {menu.map((s) => (
          <button
            key={s.cat}
            className={`${styles.pill} ${active === s.cat ? styles.pillActive : ""}`}
            onClick={() => setActive(s.cat)}
          >
            <span>{s.icon}</span> {s.cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visibleSections.map((section, sIdx) =>
          section.items.map(([en, ar, price, cal], iIdx) => {
            const { baseName, variants } = parseVariants(en, price);
            if (variants.length === 0) return null;

            const gradient = GRADIENTS[(sIdx + iIdx) % GRADIENTS.length];
            const cardKey = `${section.cat}__${baseName}`;
            const hasMultipleVariants = variants.length > 1;
            const displayPrice = hasMultipleVariants
              ? `SAR ${Math.min(...variants.map((v) => v.price))}–${Math.max(...variants.map((v) => v.price))}`
              : `SAR ${variants[0].price}`;

            return (
              <div key={cardKey} className={styles.card}>
                <div className={styles.imgWrap} style={{ background: gradient }}>
                  <span className={styles.tag}>{section.cat}</span>
                  <span className={styles.emoji}>{section.icon}</span>
                </div>

                <div className={styles.info}>
                  <div className={styles.name}>{baseName}</div>
                  <div className={styles.ar}>{ar}</div>

                  <div className={styles.bottomRow}>
                    <span className={styles.price}>{displayPrice}</span>

                    {hasMultipleVariants ? (
                      <button
                        className={styles.plusBtn}
                        onClick={() =>
                          setOpenVariantKey(openVariantKey === cardKey ? null : cardKey)
                        }
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className={styles.plusBtn}
                        onClick={() =>
                          cart.addItem({
                            key: `${baseName}__default`,
                            name: baseName,
                            category: section.cat,
                            variant: null,
                            unitPrice: variants[0].price,
                          })
                        }
                      >
                        +
                      </button>
                    )}
                  </div>

                  {hasMultipleVariants && openVariantKey === cardKey && (
                    <div className={styles.variantSheet}>
                      {variants.map((v) => (
                        <button
                          key={v.label}
                          className={styles.variantOption}
                          onClick={() => {
                            cart.addItem({
                              key: `${baseName}__${v.label}`,
                              name: baseName,
                              category: section.cat,
                              variant: v.label,
                              unitPrice: v.price,
                            });
                            setOpenVariantKey(null);
                          }}
                        >
                          <span>{v.label}</span>
                          <span>SAR {v.price}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
