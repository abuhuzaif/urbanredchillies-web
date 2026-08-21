import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.sizzle} />
      <div className={styles.grid}>
        <div>
          <div className={styles.wordmark}>Urban Red Chillies</div>
          <p className={styles.tag}>House of the Flavour — Canada</p>
        </div>
        <div>
          <div className={styles.heading}>Visit</div>
          <p>Open daily · 11:00 AM – 12:00 AM</p>
        </div>
        <div>
          <div className={styles.heading}>Order</div>
          <p>Dine-in · Pickup · Delivery</p>
        </div>
      </div>
      <div className={styles.bottom}>
        &copy; {new Date().getFullYear()} Urban Red Chillies. All rights reserved.
      </div>
    </footer>
  );
}
