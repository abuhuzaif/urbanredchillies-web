import Image from "next/image";
import styles from "./HeroBanner.module.css";

export default function HeroBanner() {
  return (
    <div className={styles.banner}>
      <Image
        src="/menu-hero-banner.jpg"
        alt="Urban Red Chillies — House of Flavour Canada — Authentic Flavours, Unforgettable Experience"
        width={1542}
        height={453}
        priority
        unoptimized
        sizes="(max-width: 1400px) 100vw, 1400px"
        className={styles.bannerImg}
      />
    </div>
  );
}
