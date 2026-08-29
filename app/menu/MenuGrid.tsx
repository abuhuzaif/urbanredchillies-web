"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "../../lib/menu-data";
import { parseVariants } from "../../lib/parse-variants";
import { useCart } from "../../lib/cart-context";
import styles from "./MenuGrid.module.css";

// Real dish photos, keyed by the item's base name (name with any
// "(Small/Medium/Large)" etc. suffix stripped). Add new entries here as
// more photos come in — anything without an entry falls back to a
// placeholder tile.
const IMAGES: Record<string, string> = {
  "Chilli Chicken": "/menu-images/chilli_chicken.jpg",
  "Chicken 65": "/menu-images/chicken_65.jpg",
  "Chicken Majestic": "/menu-images/food_majestic.jpg",
  "Chapli Kabab": "/menu-images/chapli_kabab.jpg",
  "Green Chicken Tikka Breast": "/menu-images/green_chicken_tikka_breast.jpg",
  "Chicken Chatkhara Roll": "/menu-images/chicken_chatkhara_roll.jpg",
  "Boti Shangrila": "/menu-images/kebab_shboti1.jpg",
  "Mixed BBQ Platter": "/menu-images/mixed_bbq_platter.jpg",
  "Malai Boti Platter": "/menu-images/food_mb.jpg",
  "Chicken Boti Kabab": "/menu-images/chicken_boti_kabab.jpg",
  "Chicken Reshmi Kebab": "/menu-images/food_rs.jpg",
  "Mutton Karahi Shinwari": "/menu-images/mutton_karahi_shinwari.jpg",
  "Chicken Karahi Shinwari": "/menu-images/chicken_karahi_shinwari.jpg",
  "Chicken Masala": "/menu-images/chicken_masala.jpg",
  "Mutton Masala": "/menu-images/mutton_masala.jpg",
  "Paneer Butter Masala": "/menu-images/paneer_butter_masala.jpg",
  "Dum Biryani": "/menu-images/dum_biryani.jpg",
  "Hyderabadi Chicken Dum Biryani": "/menu-images/hyderabadi_chicken_dum_biryani.jpg",
  "Chicken Tikka Biryani": "/menu-images/chicken_tikka_biryani.jpg",
  "Bun Kabab": "/menu-images/bun_kabab.jpg",
  "Chicken Burger": "/menu-images/chicken_burger.jpg",
  "Chicken Juicy Lucy Cheese Burger": "/menu-images/chicken_juicy_lucy_cheese_burger.jpg",
  "Grilled Chicken Sandwich": "/menu-images/sandwich_chckn_sandwih.jpg",
  "BBQ Malai Sandwich": "/menu-images/bbq_malai_sandwich.jpg",
  "BBQ Reshmi Sandwich": "/menu-images/bbq_reshmi_sandwich.jpg",
  "BBQ Bihari Sandwich": "/menu-images/bbq_bihari_sandwich.jpg",
  "Chapli Sandwich": "/menu-images/sandwich_chapli_sandwich.jpg",
  "Malai Boti Sandwich": "/menu-images/sandwich_malaiboti_sandwch.jpg",
  "Rumali Roti": "/menu-images/rumali_roti.jpg",
  "Water": "/menu-images/water.jpg",
  "Soft Drinks": "/menu-images/drink.jpg",
  "Lemon Fresh": "/menu-images/lemon_fresh.jpg",
  "Falooda Special": "/menu-images/falooda_special.jpg",
  "Falooda Kulfi": "/menu-images/falooda_kulfi.jpg",
  "Lemonade Mint": "/menu-images/lemonade_mint.jpg",
  "Orange Juice": "/menu-images/orange_juice.jpg",
  "Pakola": "/menu-images/food_pkla.jpg",
  "Fries Mayonnaise Garlic Spicy": "/menu-images/fries_mayonnaise_garlic_spicy.jpg",
  "Vegetarian Pizza": "/menu-images/vegetarian_pizza.jpg",
  "Cheesy Pizza": "/menu-images/cheese_pizza.jpg",
  "Kebab Bihari Chicken Pizza": "/menu-images/kebab_bihari_chicken_pizza.jpg",
  "Kebab Seekh Beef Pizza": "/menu-images/kebab_seekh_beef_pizza.jpg",
  "Boti Bihari Beef Pizza": "/menu-images/boti_bihari_beef_pizza.jpg",
  "Cheese Crust Pizza": "/menu-images/cheese_crust_pizza.jpg",
  "Chicken Tikka Leg": "/menu-images/chicken-tikka-leg.jpg",
  "Chicken Tikka Breast": "/menu-images/chicken-tikka-breast.jpg",
  "Chicken Tawa Malai Breast": "/menu-images/chicken-tawa-malai-breast.jpg",
  "Chicken Tawa Malai Leg": "/menu-images/chicken-tawa-malai-leg.jpg",
  "Green Chicken Tikka Leg": "/menu-images/green-chicken-tikka-leg.jpg",
  "Chicken Boti Boneless Tikka": "/menu-images/chicken-boti-boneless-tikka.jpg",
  "Chicken Boti Boneless Malai": "/menu-images/chicken-boti-boneless-malai.jpg",
  "Chicken Boti Bihari": "/menu-images/chicken-boti-bihari.jpg",
  "Beef Boti Bihari": "/menu-images/beef-boti-bihari.jpg",
  "Beef Seekh Kebab": "/menu-images/beef-seekh-kebab.jpg",
  "Green Boti with Bone": "/menu-images/green-boti-with-bone.jpg",
  "Boti Afghani": "/menu-images/boti-afghani.jpg",
  "Boti Namken": "/menu-images/boti-namken.jpg",
  "Chicken Karahi Koyla": "/menu-images/chicken-karahi-koyla.jpg",
  "Mutton Karahi Koyla": "/menu-images/mutton-karahi-koyla.jpg",
  "Nihari Sada": "/menu-images/nihari-sada.jpg",
  "Chicken Tikka Chutney Roll": "/menu-images/chicken-tikka-chutney-roll.jpg",
  "Chicken Garlic Mayo Roll": "/menu-images/chicken-garlic-mayo-roll.jpg",
  "Chicken Tikka BBQ Sauce Roll": "/menu-images/chicken-tikka-bbq-sauce-roll.jpg",
  "Chicken Spicy Juicy Roll": "/menu-images/chicken-spicy-juicy-roll.jpg",
  "Chicken Bihari Roll": "/menu-images/chicken-bihari-roll.jpg",
  "Beef Bihari Roll": "/menu-images/beef-bihari-roll.jpg",
  "Zinger Roll": "/menu-images/zinger-roll.jpg",
  "Beef Seekh Kebab Roll": "/menu-images/beef-seekh-kebab-roll.jpg",
  "Chicken Malai Boti Roll": "/menu-images/chicken-malai-boti-roll.jpg",
  "Chicken Reshmi Kebab Roll": "/menu-images/chicken-reshmi-kebab-roll.jpg",
  "Special Roll": "/menu-images/special-roll.jpg",
  "Zinger Cheese Burger": "/menu-images/zinger-cheese-burger.jpg",
  "Original Club Sandwich": "/menu-images/original-club-sandwich.jpg",
  "Chicken Tikka Club Sandwich": "/menu-images/chicken-tikka-club-sandwich.jpg",
  "Half Chicken Broast + Bun & Fries": "/menu-images/half-chicken-broast-bun-and-fries.jpg",
  "Spicy Half Chicken Broast + Bun & Fries": "/menu-images/spicy-half-chicken-broast-bun-and-fries.jpg",
  "Grill Onion Burger": "/menu-images/grill-onion-burger.jpg",
  "BBQ Reshmi Burger": "/menu-images/bbq-reshmi-burger.jpg",
  "BBQ Malai Burger": "/menu-images/bbq-malai-burger.jpg",
  "BBQ Chicken Burger": "/menu-images/bbq-chicken-burger.jpg",
  "BBQ Bihari Burger": "/menu-images/bbq-bihari-burger.jpg",
  "Egg and Cheese Sandwich": "/menu-images/egg-and-cheese-sandwich.jpg",
  "BBQ Chicken Sandwich": "/menu-images/bbq-chicken-sandwich.jpg",
  "Halwa Puri Platter": "/menu-images/halwa-puri-platter.jpg",
  "3 Puri, Aloo, Channa, Halwa & Achar": "/menu-images/3-puri-aloo-channa-halwa-and-achar.jpg",
  "Desi Omelet + Lacha Paratha & Halwa": "/menu-images/desi-omelet-lacha-paratha-and-halwa.jpg",
  "Sada Nihari + 2 Naan & Halwa": "/menu-images/sada-nihari-2-naan-and-halwa.jpg",
  "Anda Chana": "/menu-images/anda-chana.jpg",
  "Paya": "/menu-images/paya.jpg",
  "Sada Lacha Paratha": "/menu-images/sada-lacha-paratha.jpg",
  "Omelette": "/menu-images/omelette.jpg",
  "Half Fry": "/menu-images/half-fry.jpg",
  "Tea": "/menu-images/tea.jpg",
  "Lacha Paratha": "/menu-images/lacha-paratha.jpg",
  "Puri Paratha": "/menu-images/puri-paratha.jpg",
  "Limca Red Chilies": "/menu-images/limca-red-chilies.jpg",
  "Lassi Plain": "/menu-images/lassi-plain.jpg",
  "Lassi Salty": "/menu-images/lassi-salty.jpg",
  "Lassi Mango": "/menu-images/lassi-mango.jpg",
  "Shake Kit Kat": "/menu-images/shake-kit-kat.jpg",
  "Shake Oreo": "/menu-images/shake-oreo.jpg",
  "Shake Snickers": "/menu-images/shake-snickers.jpg",
  "Shake Vanilla": "/menu-images/shake-vanilla.jpg",
  "Chicken Fajita Tacos": "/menu-images/chicken-fajita-tacos.jpg",
  "Chicken Tikka Tacos": "/menu-images/chicken-tikka-tacos.jpg",
  "Chicken Crispy Tacos": "/menu-images/chicken-crispy-tacos.jpg",
  "Tikka Chicken Pizza": "/menu-images/tikka-chicken.jpg",
  "Fajita Chicken Pizza": "/menu-images/fajita-chicken.jpg",
  "Malai Chicken Pizza": "/menu-images/malai-chicken.jpg",
  "Kebab Reshmi Chicken Pizza": "/menu-images/kebab-reshmi-chicken.jpg",
  "Kabab Crust Pizza": "/menu-images/kabab-crust-pizza.jpg",
  "Crown Crust Pizza": "/menu-images/crown-crust-pizza.jpg",
  "Fries Pizza": "/menu-images/fries-pizza.jpg",
  "Fries Spicy": "/menu-images/fries-spicy.jpg",
  "Fries Plain": "/menu-images/fries-plain.jpg",
  "Fries BBQ Spicy": "/menu-images/fries-bbq-spicy.jpg",
  "Fries Mayonnaise Garlic Plain": "/menu-images/fries-mayonnaise-garlic-plain.jpg",
  "Fries BBQ Plain": "/menu-images/fries-bbq-plain.jpg",
};

// Cycled placeholder gradients for items without a photo yet.
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
            const photo = IMAGES[baseName];
            const gradient = GRADIENTS[(sIdx + iIdx) % GRADIENTS.length];
            const cardKey = `${section.cat}__${baseName}`;
            const hasVariants = variants.length > 0;
            const hasMultipleVariants = variants.length > 1;
            const displayPrice = !hasVariants
              ? "Price TBD"
              : hasMultipleVariants
              ? variants.map((v) => `${(v.label ?? "").charAt(0)}=${v.price}`).join(", ")
              : `SAR ${variants[0].price}`;

            return (
              <div key={cardKey} className={styles.card}>
                <div className={styles.imgWrap} style={!photo ? { background: gradient } : undefined}>
                  <span className={styles.tag}>{section.cat}</span>
                  {photo ? (
                    <Image
                      src={photo}
                      alt={baseName}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 25vw"
                      className={styles.photo}
                    />
                  ) : (
                    <span className={styles.emoji}>{section.icon}</span>
                  )}
                </div>

                <div className={styles.info}>
                  <div className={styles.name}>{baseName}</div>
                  <div className={styles.ar}>{ar}</div>

                  <div className={styles.bottomRow}>
                    <span className={styles.price}>{displayPrice}</span>

                    {!hasVariants ? (
                      <button className={styles.plusBtn} disabled style={{ opacity: 0.35, cursor: "not-allowed" }}>
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
