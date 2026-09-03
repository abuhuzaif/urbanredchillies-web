import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/urc-logo.png"
          alt="Urban Red Chillies"
          width={214}
          height={100}
          priority
          className={styles.logoImg}
        />
      </Link>

      <nav className={styles.links}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
      <Link href="/menu" className={styles.cta}>
        Order Now
      </Link>
    </header>
  );
}
