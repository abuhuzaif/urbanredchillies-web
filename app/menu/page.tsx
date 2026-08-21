import { MENU } from "../../lib/menu-data";
import { CartProvider } from "../../lib/cart-context";
import MenuClient from "./MenuClient";
import CartDrawer from "./CartDrawer";
import HeroBanner from "../../components/HeroBanner";
import styles from "./menu.module.css";

export const metadata = { title: "Menu | Urban Red Chillies" };

export default function MenuPage() {
  return (
    <CartProvider>
      <HeroBanner />

      <section className={styles.header}>
        <span className="eyebrow">The Full Spread</span>
        <h1 className={styles.h1}>Menu</h1>
        <p className={styles.lead}>Dine-in menu &middot; Add items, then place your order &middot; Prices in SAR</p>
      </section>

      <MenuClient menu={MENU} />
      <CartDrawer />
    </CartProvider>
  );
}
