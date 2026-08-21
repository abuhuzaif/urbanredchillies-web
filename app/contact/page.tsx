import styles from "./contact.module.css";

export const metadata = { title: "Contact | Urban Red Chillies" };

export default function Contact() {
  return (
    <>
      <section className={`section-tight ${styles.header}`}>
        <span className="eyebrow">Get In Touch</span>
        <h1 className={styles.h1}>Find Us</h1>
      </section>

      <section className="section">
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>📍</div>
            <h3>Address</h3>
            <p>Add restaurant address here</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>⏰</div>
            <h3>Hours</h3>
            <p>Daily: 11:00 AM – 12:00 AM</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>📞</div>
            <h3>Phone / WhatsApp</h3>
            <p>Add phone number here</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>✉️</div>
            <h3>Email</h3>
            <p>Add contact email here</p>
          </div>
        </div>

        <div className={styles.mapPlaceholder}>
          Map embed goes here (Google Maps location link)
        </div>
      </section>
    </>
  );
}
