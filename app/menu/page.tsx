import { MENU } from "../../lib/menu-data";
import styles from "./menu.module.css";

export const metadata = { title: "Menu | Urban Red Chillies" };

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function MenuPage() {
  return (
    <>
      <section className={`section-tight ${styles.header}`}>
        <span className="eyebrow">The Full Spread</span>
        <h1 className={styles.h1}>Menu</h1>
        <p className={styles.lead}>Prices in CAD. Scan the table QR for the live, always-current menu.</p>
      </section>

      <nav className={styles.catnav}>
        {MENU.map((s) => (
          <a key={s.cat} href={`#${slug(s.cat)}`}>{s.cat}</a>
        ))}
      </nav>

      <section className="section">
        {MENU.map((section) => (
          <div key={section.cat} id={slug(section.cat)} className={styles.block}>
            <div className={styles.blockHead}>
              <span className={styles.icon}>{section.icon}</span>
              <h2>{section.cat}</h2>
              <div className={styles.rule} />
            </div>
            {section.items.map(([en, ar, price, cal]) => (
              <div key={en} className={styles.item}>
                <div>
                  <div className={styles.en}>{en}</div>
                  <div className={styles.ar}>{ar}</div>
                </div>
                <div className={styles.meta}>
                  {price !== null && <div className={styles.price}>{price}</div>}
                  {cal ? <div className={styles.cal}>{cal} kcal</div> : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
