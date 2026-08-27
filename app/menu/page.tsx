import { MENU } from "../../lib/menu-data";
import { CartProvider } from "../../lib/cart-context";
import MenuHeader from "./MenuHeader";
import MenuGrid from "./MenuGrid";
import CartDrawer from "./CartDrawer";
import styles from "./menu.module.css";

export const metadata = { title: "RedChillies Menu" };

export default function MenuPage() {
  return (
    <CartProvider>
      <div className={styles.appShell}>
        <MenuHeader />
        <MenuGrid menu={MENU} />
        <p className={styles.footNote}>Dine-in menu &middot; Prices in SAR &middot; Table number required at checkout</p>
      </div>
      <CartDrawer />
    </CartProvider>
  );
}
