import Link from "next/link";
import Image from "next/image";
import HeroBanner from "../../components/HeroBanner";
import { getLiveMenu } from "../../lib/live-menu";
import styles from "./page.module.css";

export const revalidate = 0;

const STATS = [
  { n: "118+", l: "Menu Dishes" },
  { n: "100%", l: "Halal & Flame-Grilled" },
  { n: "Live", l: "Order Tracking" },
  { n: "7", l: "Days a Week" },
];

const TRUST_BADGES = [
  { icon: "✅", title: "100% Halal", sub: "Certified Food" },
  { icon: "🌿", title: "Fresh Ingredients", sub: "Premium Quality" },
  { icon: "📱", title: "Easy Ordering", sub: "Scan & Order" },
];

const WHY_CHOOSE = [
  { icon: "🌿", title: "Fresh Ingredients", sub: "We use only the freshest ingredients." },
  { icon: "✅", title: "Halal Certified", sub: "All our food is 100% Halal." },
  { icon: "👨‍🍳", title: "Hygienic Kitchen", sub: "Clean, safe, and hygienic preparation." },
  { icon: "🔥", title: "Best Taste", sub: "Unmatched taste in every bite." },
  { icon: "💰", title: "Affordable Prices", sub: "Great taste at the best price." },
  { icon: "📲", title: "Easy Online Ordering", sub: "Order in seconds via our digital menu." },
];

const GALLERY_PREVIEW = [
  { file: "boti-afghani.jpg", label: "Boti Afghani" },
  { file: "zinger-cheese-burger.jpg", label: "Zinger Cheese Burger" },
  { file: "tikka-chicken.jpg", label: "Tikka Chicken Pizza" },
  { file: "chicken-crispy-tacos.jpg", label: "Chicken Crispy Tacos" },
  { file: "mixed_bbq_platter.jpg", label: "Mixed BBQ Platter" },
];

function formatPrice(n: number) {
  return Number.isInteger(n) ? `${n}` : n.toFixed(2);
}

export default async function Home() {
  const menu = await getLiveMenu();

  const bestSellers = menu.flatMap((s) =>
    s.items.filter((i) => i.isBestSeller).map((i) => ({ ...i, category: s.cat, tag: "best" as const }))
  );
  const offers = menu.flatMap((s) =>
    s.items.filter((i) => i.isTodayOffer).map((i) => ({ ...i, category: s.cat, tag: "offer" as const }))
  );
  const featured = [...bestSellers, ...offers.filter((o) => !bestSellers.some((b) => b.id === o.id))].slice(0, 4);

  const categories = menu.map((s) => ({ cat: s.cat, icon: s.icon }));

  return (
    <>
      <HeroBanner />

      <section className={`section-tight ${styles.trustRow}`}>
        {TRUST_BADGES.map((b) => (
          <div key={b.title} className={styles.trustBadge}>
            <span className={styles.trustIcon}>{b.icon}</span>
            <div>
              <div className={styles.trustTitle}>{b.title}</div>
              <div className={styles.trustSub}>{b.sub}</div>
            </div>
          </div>
        ))}
      </section>

      <div className={styles.heroActions}>
        <Link href="/menu" className="btn btn-primary">Order Online</Link>
        <Link href="/menu" className="btn btn-outline">View Digital Menu</Link>
      </div>

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
          {categories.map((c) => (
            <Link href="/menu" key={c.cat} className={styles.catChip}>
              <span className={styles.catIcon}>{c.icon}</span>
              <span>{c.cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className={`section ${styles.bestSection}`}>
          <span className="eyebrow">Crowd Favourites</span>
          <div className={styles.sectionHeadRow}>
            <h2 className={styles.h2}>Bestsellers off the grill</h2>
            <Link href="/menu" className={styles.viewAll}>View full menu →</Link>
          </div>

          <div className={styles.bestGrid}>
            {featured.map((item) => (
              <div key={item.id} className={styles.bestCard}>
                <div className={styles.bestImg}>
                  <span
                    className={`badge ${item.tag === "best" ? "badge-new" : "badge-hot"} ${styles.bestBadge}`}
                  >
                    {item.tag === "best" ? "⭐ Best Seller" : "🔥 Offer"}
                  </span>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 900px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <span className={styles.bestEmoji}>🍽️</span>
                  )}
                </div>
                <div className={styles.bestBody}>
                  <div className={styles.bestTop}>
                    <h3>{item.name}</h3>
                  </div>
                  <div className={styles.bestBottom}>
                    <span className={styles.bestPrice}>
                      SAR {formatPrice(item.offerPrice ?? item.price ?? 0)}
                    </span>
                    <Link href="/menu" className={styles.bestBtn}>View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={`section ${styles.whySection}`}>
        <span className="eyebrow">Why RedChillies</span>
        <h2 className={styles.h2}>Why Choose RedChillies?</h2>
        <div className={styles.whyGrid}>
          {WHY_CHOOSE.map((w) => (
            <div key={w.title} className={styles.whyCard}>
              <span className={styles.whyIcon}>{w.icon}</span>
              <div>
                <div className={styles.whyTitle}>{w.title}</div>
                <div className={styles.whySub}>{w.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.whyCta}>
          <p>Have a question or want to place an order directly?</p>
          <Link href="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>

      <section className={`section ${styles.gallerySection}`}>
        <div className={styles.sectionHeadRow}>
          <div>
            <span className="eyebrow">A Taste, In Pictures</span>
            <h2 className={styles.h2}>Gallery</h2>
          </div>
          <Link href="/gallery" className={styles.viewAll}>View more photos →</Link>
        </div>
        <div className={styles.galleryStrip}>
          {GALLERY_PREVIEW.map((g) => (
            <div key={g.file} className={styles.galleryTile}>
              <Image
                src={`/menu-images/${g.file}`}
                alt={g.label}
                fill
                sizes="(max-width: 700px) 50vw, 20vw"
                style={{ objectFit: "cover" }}
              />
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
