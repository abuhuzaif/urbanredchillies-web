"use client";

import { Section } from "../../lib/menu-data";
import { parseVariants } from "../../lib/parse-variants";
import { useCart } from "../../lib/cart-context";
import styles from "./menu.module.css";

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function MenuClient({ menu }: { menu: Section[] }) {
  const cart = useCart();

  return (
    <>
      <nav className={styles.catnav}>
        {menu.map((s) => (
          <a key={s.cat} href={`#${slug(s.cat)}`}>{s.cat}</a>
        ))}
      </nav>

      <section className="section">
        {menu.map((section) => (
          <div key={section.cat} id={slug(section.cat)} className={styles.block}>
            <div className={styles.blockHead}>
              <span className={styles.icon}>{section.icon}</span>
              <h2>{section.cat}</h2>
              <div className={styles.rule} />
            </div>

            {section.items.map(([en, ar, price, cal]) => {
              const { baseName, variants } = parseVariants(en, price);

              return (
                <div key={en} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <div className={styles.en}>{baseName}</div>
                    <div className={styles.ar}>{ar}</div>
                    {cal ? <div className={styles.cal}>{cal} kcal</div> : null}
                  </div>

                  <div className={styles.actions}>
                    {variants.length === 0 && (
                      <span className={styles.unavailable}>—</span>
                    )}
                    {variants.map((v) => {
                      const key = `${baseName}__${v.label ?? "default"}`;
                      return (
                        <button
                          key={key}
                          className={styles.addBtn}
                          onClick={() =>
                            cart.addItem({
                              key,
                              name: baseName,
                              category: section.cat,
                              variant: v.label,
                              unitPrice: v.price,
                            })
                          }
                        >
                          {v.label ? <span className={styles.vLabel}>{v.label}</span> : null}
                          <span>{v.price} SAR</span>
                          <span className={styles.plus}>+</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </section>
    </>
  );
}
