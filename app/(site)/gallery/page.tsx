import styles from "./gallery.module.css";

export const metadata = { title: "Gallery | Urban Red Chillies" };

// Placeholder tiles — replace each `img` path with a real photo in
// /public/gallery/ (e.g. "/gallery/boti-afghani.jpg") once available.
const TILES = [
  { label: "Boti Afghani", img: null },
  { label: "Shinwari Karahi", img: null },
  { label: "Mixed BBQ Platter", img: null },
  { label: "Reshmi Rolls", img: null },
  { label: "Fusion Pizza", img: null },
  { label: "Chicken Tacos", img: null },
  { label: "Falooda Special", img: null },
  { label: "Zinger Burger", img: null },
  { label: "Mixed Thali", img: null },
];

export default function Gallery() {
  return (
    <>
      <section className={`section-tight ${styles.header}`}>
        <span className="eyebrow">A Taste, In Pictures</span>
        <h1 className={styles.h1}>Gallery</h1>
        <p className={styles.lead}>
          Real plates, straight off the grill. Photos coming soon — this
          section is ready for your food photography.
        </p>
      </section>

      <section className="section">
        <div className={styles.grid}>
          {TILES.map((t) => (
            <div key={t.label} className={styles.tile}>
              {t.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.img} alt={t.label} />
              ) : (
                <div className={styles.placeholder}>
                  <span>🌶️</span>
                </div>
              )}
              <div className={styles.caption}>{t.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
