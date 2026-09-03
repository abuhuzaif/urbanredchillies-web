"use client";

import Image from "next/image";
import { useCart } from "../../lib/cart-context";
import styles from "./MenuHeader.module.css";

export default function MenuHeader() {
  const cart = useCart();

  return (
    <div className={styles.header}>
      <div className={styles.brandRow}>
        <div className={styles.bannerFrame}>
          <Image
            src="/menu-header-banner.jpg"
            alt="Urban Red Chillies — House of Flavour Canada"
            fill
            priority
            unoptimized
            sizes="(max-width: 900px) 100vw, 900px"
            className={styles.bannerImg}
          />
        </div>

        <button className={styles.cartBtn} onClick={() => cart.setOpen(true)}>
          🛒
          <span className={styles.badge}>{cart.itemCount}</span>
        </button>
      </div>
    </div>
  );
}
