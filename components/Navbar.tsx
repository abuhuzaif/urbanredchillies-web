import Link from "next/link";
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
