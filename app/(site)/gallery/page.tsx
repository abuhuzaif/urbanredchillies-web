import Image from "next/image";
import styles from "./gallery.module.css";

export const metadata = { title: "Gallery | Urban Red Chillies" };

const TILES = [
  { label: "Boti Afghani", img: "/menu-images/boti-afghani.jpg" },
  { label: "Shinwari Karahi", img: "/menu-images/chicken_karahi_shinwari.jpg" },
  { label: "Mixed BBQ Platter", img: "/menu-images/mixed_bbq_platter.jpg" },
  { label: "Reshmi Rolls", img: "/menu-images/chicken-reshmi-kebab-roll.jpg" },
  { label: "Crown Crust Pizza", img: "/menu-images/crown-crust-pizza.jpg" },
  { label: "Chicken Tacos", img: "/menu-images/chicken-crispy-tacos.jpg" },
  { label: "Falooda Special", img: "/menu-images/falooda_special.jpg" },
  { label: "Zinger Burger", img: "/menu-images/zinger-cheese-burger.jpg" },
  { label: "Halwa Puri Platter", img: "/menu-images/halwa-puri-platter.jpg" },
];

export default function Gallery() {
  return (
    <>
      <section className={`section-tight ${styles.header}`}>
        <span className="eyebrow">A Taste, In Pictures</span>
        <h1 className={styles.h1}>Gallery</h1>
        <p className={styles.lead}>
          Real plates, straight off the grill.
        </p>
      </section>

      <section className="section">
        <div className={styles.grid}>
          {TILES.map((t) => (
            <div key={t.label} className={styles.tile}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: 14,
                }}
              >
                <Image
                  src={t.img}
                  alt={t.label}
                  fill
                  sizes="(max-width: 700px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.caption}>{t.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
