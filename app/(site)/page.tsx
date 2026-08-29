import Link from "next/link";
import HeroBanner from "../../components/HeroBanner";
import styles from "./page.module.css";

const CATEGORIES = [
  { icon: "🔥", label: "BBQ" },
  { icon: "🌯", label: "Rolls" },
  { icon: "🍕", label: "Pizza" },
  { icon: "🌮", label: "Tacos" },
  { icon: "🍔", label: "Burgers" },
  { icon: "🥤", label: "Drinks" },
];

const BESTSELLERS = [
  { emoji: "🍢", name: "Boti Afghani", price: "$17", badge: "hot", rating: "4.9" },
  { emoji: "🍲", name: "Shinwari Karahi", price: "$18", badge: "spicy", rating: "4.8" },
  { emoji: "🌯", name: "Bihari Beef Roll", price: "$13", badge: "new", rating: "4.7" },
  { emoji: "🍕", name: "Fajita Chicken Pizza", price: "$22", badge: "hot", rating: "4.9" },
];

const STATS = [
  { n: "15+", l: "Signature Dishes" },
  { n: "4.8★", l: "Average Rating" },
  { n: "100%", l: "Halal & Flame-Grilled" },
  { n: "7", l: "Days a Week" },
];

const badgeClass: Record<string, string> = {
  hot: "badge-hot",
  new: "badge-new",
  spicy: "badge-spicy",
};
const badgeLabel: Record<string, string> = {
  hot: "🔥 Hot",
  new: "✨ New",
  spicy: "🌶️ Spicy",
};

export default function Home() {
  return (
    <>
      <HeroBanner />

      <div className={styles.statsBar}>
        {STATS.map((s) => (
          <div key={s.l} className={styles.stat}>
            <div className={styles.statN}>{s.n}</div>
            <div className={styles.statL}>{s.l}</div>
          </div>
        ))}
      </div>

      <section className="section">
        <div className={styles.catRow}>
          {CATEGORIES.map((c) => (
            <Link href="/menu" key={c.label} className={styles.catChip}>
              <span className={styles.catIcon}>{c.icon}</span>
              <span>{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={`section ${styles.bestSection}`}>
        <span className="eyebrow">Crowd Favourites</span>
        <div className={styles.sectionHeadRow}>
          <h2 className={styles.h2}>Bestsellers off the grill</h2>
          <Link href="/menu" className={styles.viewAll}>View full menu →</Link>
        </div>

        <div className={styles.bestGrid}>
          {BESTSELLERS.map((b) => (
            <div key={b.name} className={styles.bestCard}>
              <div className={styles.bestImg}>
                <span className={`badge ${badgeClass[b.badge]} ${styles.bestBadge}`}>
                  {badgeLabel[b.badge]}
                </span>
                <span className={styles.bestEmoji}>{b.emoji}</span>
              </div>
              <div className={styles.bestBody}>
                <div className={styles.bestTop}>
                  <h3>{b.name}</h3>
                  <span className={styles.bestRating}>★ {b.rating}</span>
                </div>
                <div className={styles.bestBottom}>
                  <span className={styles.bestPrice}>{b.price}</span>
                  <Link href="/menu" className={styles.bestBtn}>View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <h2 className={styles.ctaH2}>Hungry? The grill&apos;s already going.</h2>
        <p className={styles.ctaSub}>
          Dine in, pick up, or scan the table QR to browse the full menu.
        </p>
        <Link href="/menu" className="btn btn-primary">Explore Full Menu</Link>
      </section>
    </>
  );
}
