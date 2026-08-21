import styles from "./about.module.css";

export const metadata = { title: "About | Urban Red Chillies" };

const VALUES = [
  { n: "Fire", d: "Everything that can be grilled, is — over open flame, not shortcuts." },
  { n: "Fusion", d: "Desi spice meets Tex-Mex and pizza, built for a Canadian table." },
  { n: "Family", d: "Recipes carried from home kitchens, scaled up without losing the soul." },
];

export default function About() {
  return (
    <>
      <section className={`section-tight ${styles.header}`}>
        <span className="eyebrow">Our Story</span>
        <h1 className={styles.h1}>House of the Flavour, Canada</h1>
        <p className={styles.lead}>
          Urban Red Chillies started with one idea: bring the heat, char, and
          craft of desi barbeque to a Canadian street-food table — and never
          water it down.
        </p>
      </section>

      <div className="sizzle" />

      <section className="section">
        <div className={styles.storyGrid}>
          <div>
            <span className="eyebrow">How it started</span>
            <h2 className={styles.h2}>From tandoor to table</h2>
            <p className={styles.body}>
              What began as family recipes — Shinwari karahi, seekh kebabs,
              slow-simmered nihari — grew into a full kitchen built around one
              rule: cook it the way it&apos;s meant to be cooked, no matter how
              much longer it takes.
            </p>
            <p className={styles.body}>
              Today that same fire sits behind everything on the menu, from
              classic BBQ boti to rolls, burgers, tacos, and our own take on
              fusion pizza — all made to order, all finished on the grill.
            </p>
          </div>
          <div className={styles.valuesCol}>
            {VALUES.map((v) => (
              <div key={v.n} className={styles.valueCard}>
                <div className={styles.valueN}>{v.n}</div>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
