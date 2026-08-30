import { getLiveMenu, getAnnouncement } from "../../lib/live-menu";
import { CartProvider } from "../../lib/cart-context";
import MenuHeader from "./MenuHeader";
import AnnouncementBanner from "./AnnouncementBanner";
import TodaysOfferRow from "./TodaysOfferRow";
import MenuGrid from "./MenuGrid";
import CartDrawer from "./CartDrawer";
import styles from "./menu.module.css";

export const metadata = { title: "RedChillies Menu" };

// Always fetch fresh data from Supabase — owner-app changes should show up
// immediately, not from a cached build.
export const revalidate = 0;

export default async function MenuPage() {
  const [menu, announcement] = await Promise.all([
    getLiveMenu(),
    getAnnouncement(),
  ]);

  const offerItems = menu.flatMap((section) =>
    section.items
      .filter((item) => item.isTodayOffer)
      .map((item) => ({ ...item, category: section.cat }))
  );

  return (
    <CartProvider>
      <div className={styles.appShell}>
        <MenuHeader />
        <AnnouncementBanner announcement={announcement} />
        <TodaysOfferRow items={offerItems} />
        <MenuGrid menu={menu} />
        <p className={styles.footNote}>Dine-in menu &middot; Prices in SAR &middot; Table number required at checkout</p>
      </div>
      <CartDrawer />
    </CartProvider>
  );
}
