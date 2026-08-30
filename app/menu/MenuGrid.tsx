"use client";

import { useState } from "react";
import Image from "next/image";
import { LiveSection, LiveItem } from "../../lib/live-menu";
import { useCart } from "../../lib/cart-context";
import styles from "./MenuGrid.module.css";

// Cycled placeholder gradients for items without a photo yet.
const GRADIENTS = [
  "linear-gradient(135deg, #78090f, #3a0a0a)",
  "linear-gradient(135deg, #0a3219, #0a1a10)",
  "linear-gradient(135deg, #8a5a12, #3a2408)",
  "linear-gradient(135deg, #5a1a3a, #2a0a1a)",
  "linear-gradient(135deg, #1a4a5a, #0a1a2a)",
];

function formatPrice(n: number) {
  return Number.isInteger(n) ? `${n}` : n.toFixed(2);
}

export default function MenuGrid({ menu }: { menu: LiveSection[] }) {
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
          section.items.map((item: LiveItem, iIdx) => {
            const gradient = GRADIENTS[(sIdx + iIdx) % GRADIENTS.length];
            const hasVariants = item.variants.length > 0;
            const hasMultipleVariants = item.variants.length > 1;
            const singlePrice = item.offerPrice ?? item.price;
            const showStrike =
              item.isTodayOffer && item.offerPrice != null && item.price != null;

            const displayPrice = hasVariants
              ? hasMultipleVariants
                ? item.variants
                    .map((v) => `${(v.label ?? "").charAt(0)}=${v.price}`)
                    .join(", ")
                : `SAR ${item.variants[0].price}`
              : singlePrice != null
              ? `SAR ${formatPrice(singlePrice)}`
              : "Price TBD";

            const cardKey = item.id;

            return (
              <div key={cardKey} className={styles.card}>
                <div
                  className={styles.imgWrap}
                  style={!item.imageUrl ? { background: gradient } : undefined}
                >
                  <span className={styles.tag}>{section.cat}</span>
                  {item.isTodayOffer && (
                    <span
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "#E63946",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: 6,
                        zIndex: 2,
                      }}
                    >
                      Offer
                    </span>
                  )}
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 25vw"
                      className={styles.photo}
                    />
                  ) : (
                    <span className={styles.emoji}>{section.icon}</span>
                  )}
                </div>

                <div className={styles.info}>
                  <div className={styles.name}>{item.name}</div>
                  {item.nameAr && <div className={styles.ar}>{item.nameAr}</div>}

                  <div className={styles.bottomRow}>
                    <span className={styles.price}>
                      {displayPrice}
                      {showStrike && (
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: 11,
                            color: "rgba(255,255,255,0.35)",
                            textDecoration: "line-through",
                          }}
                        >
                          SAR {formatPrice(item.price as number)}
                        </span>
                      )}
                    </span>

                    {!hasVariants && singlePrice == null ? (
                      <button
                        className={styles.plusBtn}
                        disabled
                        style={{ opacity: 0.35, cursor: "not-allowed" }}
                      >
                        +
                      </button>
                    ) : hasMultipleVariants ? (
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
                            key: hasVariants ? `${item.id}__default` : `${item.id}`,
                            name: item.name,
                            category: section.cat,
                            variant: null,
                            unitPrice: hasVariants
                              ? item.variants[0].price
                              : (singlePrice as number),
                          })
                        }
                      >
                        +
                      </button>
                    )}
                  </div>

                  {hasMultipleVariants && openVariantKey === cardKey && (
                    <div className={styles.variantSheet}>
                      {item.variants.map((v) => (
                        <button
                          key={v.id}
                          className={styles.variantOption}
                          onClick={() => {
                            cart.addItem({
                              key: `${item.id}__${v.label}`,
                              name: item.name,
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
