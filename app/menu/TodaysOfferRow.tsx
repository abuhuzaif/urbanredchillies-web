"use client";

import Image from "next/image";
import { LiveItem } from "../../lib/live-menu";
import { useCart } from "../../lib/cart-context";

function formatPrice(n: number) {
  return Number.isInteger(n) ? `${n}` : n.toFixed(2);
}

export default function TodaysOfferRow({
  items,
}: {
  items: (LiveItem & { category: string })[];
}) {
  const cart = useCart();
  if (items.length === 0) return null;

  return (
    <div style={{ padding: "16px 0 4px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 18 }}>🔥</span>
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 800 }}>
          Today&apos;s Offer&apos;s
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          padding: "0 14px 6px",
        }}
      >
        {items.map((item) => {
          const hasVariants = item.variants.length > 0;
          const unitPrice = hasVariants
            ? item.variants[0].price
            : item.offerPrice ?? item.price ?? 0;
          const showStrike =
            item.offerPrice != null && item.price != null;

          return (
            <div
              key={item.id}
              style={{
                minWidth: 150,
                maxWidth: 150,
                background: "#141f16",
                borderRadius: 14,
                border: "1px solid rgba(230,57,70,0.3)",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 0.8",
                  background: "#1a2e1c",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    background: "#E63946",
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "3px 7px",
                    borderRadius: 6,
                    zIndex: 2,
                  }}
                >
                  Offer
                </span>
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="150px"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div style={{ padding: 8 }}>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 6,
                    marginTop: 4,
                  }}
                >
                  <span style={{ color: "#81C784", fontSize: 12, fontWeight: 700 }}>
                    SAR {formatPrice(item.offerPrice ?? item.price ?? 0)}
                  </span>
                  {showStrike && (
                    <span
                      style={{
                        color: "rgba(255,255,255,0.35)",
                        fontSize: 10,
                        textDecoration: "line-through",
                      }}
                    >
                      SAR {formatPrice(item.price as number)}
                    </span>
                  )}
                </div>
                {!hasVariants && (
                  <button
                    onClick={() =>
                      cart.addItem({
                        key: `${item.id}`,
                        name: item.name,
                        category: item.category,
                        variant: null,
                        unitPrice,
                      })
                    }
                    style={{
                      marginTop: 6,
                      width: "100%",
                      background: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "5px 0",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
