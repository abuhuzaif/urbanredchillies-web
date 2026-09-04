"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { useCart } from "../../lib/cart-context";
import { supabase } from "../../lib/supabase";
import { buildZatcaTlvBase64, SELLER_NAME, SELLER_VAT_NUMBER } from "../../lib/zatca";
import styles from "./CartDrawer.module.css";

type OrderType = "dine_in" | "takeaway" | "cod";

const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  dine_in: "Dine-In",
  takeaway: "Takeaway",
  cod: "Cash on Delivery",
};

type ConfirmedInvoice = {
  orderId: string;
  timestamp: string;
  subtotal: number;
  vat: number;
  total: number;
  qrDataUrl: string;
  orderType: OrderType;
  tableNumber: string;
  lines: { name: string; variant: string | null; quantity: number; unitPrice: number }[];
};

export default function CartDrawer() {
  const cart = useCart();
  const [orderType, setOrderType] = useState<OrderType>("dine_in");
  const [tableNumber, setTableNumber] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryLat, setDeliveryLat] = useState<number | null>(null);
  const [deliveryLng, setDeliveryLng] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<ConfirmedInvoice | null>(null);

  if (cart.itemCount === 0 && !cart.isOpen) return null;

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationError("Location isn't supported on this device. Please type your address.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setDeliveryLat(latitude);
        setDeliveryLng(longitude);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { Accept: "application/json" } }
          );
          const data = await res.json();
          if (data?.display_name) {
            setAddress(data.display_name);
          } else {
            setLocationError("Got your location, but couldn't find an address — please add details below.");
          }
        } catch {
          setLocationError("Got your location, but couldn't look up the address — please add details below.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError("Location permission denied. Please type your address instead.");
        } else {
          setLocationError("Couldn't get your location. Please type your address instead.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function changeOrderType(type: OrderType) {
    setOrderType(type);
    setError(null);
  }

  async function placeOrder() {
    // Validate based on the selected order type.
    if (orderType === "dine_in" && !tableNumber.trim()) {
      setError("Please enter your table number.");
      return;
    }
    if (orderType === "takeaway") {
      if (!name.trim()) {
        setError("Please enter your name for pickup.");
        return;
      }
      if (!phone.trim()) {
        setError("Please enter your phone number so we can call you when it's ready.");
        return;
      }
    }
    if (orderType === "cod") {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }
      if (!phone.trim()) {
        setError("Please enter your phone number for delivery.");
        return;
      }
      if (!address.trim()) {
        setError("Please enter your delivery address.");
        return;
      }
    }
    setError(null);
    setPlacing(true);

    const items = cart.lines.map((l) => ({
      name: l.name,
      category: l.category,
      variant: l.variant,
      quantity: l.quantity,
      unit_price: l.unitPrice,
    }));

    const subtotal = Number(cart.subtotal.toFixed(2));
    const vatAmount = Number(cart.vat.toFixed(2));
    const totalAmount = Number(cart.total.toFixed(2));

    const fallbackName =
      orderType === "dine_in" ? `Table ${tableNumber.trim()}` : ORDER_TYPE_LABELS[orderType];

    const { data, error: dbError } = await supabase
      .from("orders")
      .insert({
        customer_name: name.trim() || fallbackName,
        customer_phone: phone.trim() || null,
        customer_address: orderType === "cod" ? address.trim() : null,
        delivery_lat: orderType === "cod" ? deliveryLat : null,
        delivery_lng: orderType === "cod" ? deliveryLng : null,
        order_type: orderType,
        order_source: "qr_menu",
        table_number: orderType === "dine_in" ? tableNumber.trim() : null,
        items,
        subtotal,
        vat_amount: vatAmount,
        total_amount: totalAmount,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      setPlacing(false);
      setError("Something went wrong placing your order. Please try again or tell your server.");
      return;
    }

    const timestamp = new Date().toISOString();
    const tlvBase64 = buildZatcaTlvBase64({
      timestamp,
      totalWithVat: totalAmount,
      vatAmount,
    });
    const qrDataUrl = await QRCode.toDataURL(tlvBase64, {
      margin: 1,
      width: 180,
      color: { dark: "#1a0d05", light: "#f0b429" },
    });

    setInvoice({
      orderId: data.id,
      timestamp,
      subtotal,
      vat: vatAmount,
      total: totalAmount,
      qrDataUrl,
      orderType,
      tableNumber: tableNumber.trim(),
      lines: cart.lines.map((l) => ({
        name: l.name,
        variant: l.variant,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
      })),
    });
    setPlacing(false);
    cart.clearCart();
  }

  function closeAndReset() {
    setInvoice(null);
    setOrderType("dine_in");
    setTableNumber("");
    setName("");
    setPhone("");
    setAddress("");
    setDeliveryLat(null);
    setDeliveryLng(null);
    setLocationError(null);
    cart.setOpen(false);
  }

  return (
    <>
      {!cart.isOpen && (
        <button className={styles.fab} onClick={() => cart.setOpen(true)}>
          🛒 <span>{cart.itemCount}</span>
        </button>
      )}

      {cart.isOpen && (
        <div className={styles.drawer}>
          {invoice ? (
              <div className={styles.invoice}>
                <div className={styles.invoiceHead}>
                  <div className={styles.checkIcon}>✅</div>
                  <h3>Order sent to the kitchen!</h3>
                  <p className={styles.tableTag}>
                    {invoice.orderType === "dine_in"
                      ? `Table ${invoice.tableNumber}`
                      : ORDER_TYPE_LABELS[invoice.orderType]}
                  </p>
                </div>

                <div className={styles.receipt}>
                  <div className={styles.receiptBrand}>{SELLER_NAME}</div>
                  <div className={styles.receiptMeta}>
                    Order #{invoice.orderId.slice(0, 8).toUpperCase()}
                    <br />
                    {new Date(invoice.timestamp).toLocaleString()}
                  </div>

                  <div className={styles.receiptDash} />

                  <div className={styles.receiptLines}>
                    {invoice.lines.map((l, i) => (
                      <div key={i} className={styles.receiptLine}>
                        <span>
                          {l.quantity}× {l.name}
                          {l.variant ? ` (${l.variant})` : ""}
                        </span>
                        <span>{(l.unitPrice * l.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.receiptDash} />

                  <div className={styles.receiptTotals}>
                    <div><span>Subtotal</span><span>{invoice.subtotal.toFixed(2)} SAR</span></div>
                    <div><span>VAT (15%)</span><span>{invoice.vat.toFixed(2)} SAR</span></div>
                    <div className={styles.receiptGrand}><span>Total</span><span>{invoice.total.toFixed(2)} SAR</span></div>
                  </div>

                  <div className={styles.receiptDash} />

                  <div className={styles.qrBlock}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={invoice.qrDataUrl} alt="ZATCA simplified tax invoice QR" />
                    <p>Simplified Tax Invoice &middot; VAT {SELLER_VAT_NUMBER}</p>
                  </div>

                  <div className={styles.receiptDash} />

                  <div className={styles.thankYou}>
                    <p className={styles.thankYouMain}>Enjoy Your Food &amp; Please Visit Again</p>
                    <p className={styles.thankYouUrdu}>براے مہربانی نعمت کی قدر کیجیے</p>
                  </div>
                </div>

                <button className={styles.doneBtn} onClick={closeAndReset}>Done</button>
              </div>
            ) : (
              <>
                <div className={styles.header}>
                  <h3>Your Order</h3>
                  <button className={styles.close} onClick={() => cart.setOpen(false)}>✕</button>
                </div>

                {cart.lines.length === 0 ? (
                  <p className={styles.empty}>Your cart is empty. Add something delicious!</p>
                ) : (
                  <>
                    <div className={styles.lines}>
                      {cart.lines.map((l) => (
                        <div key={l.key} className={styles.line}>
                          <div className={styles.lineInfo}>
                            <div className={styles.lineName}>
                              {l.name}
                              {l.variant ? <span className={styles.variant}> ({l.variant})</span> : null}
                            </div>
                            <div className={styles.linePrice}>{l.unitPrice.toFixed(2)} SAR each</div>
                          </div>
                          <div className={styles.qtyControls}>
                            <button onClick={() => cart.updateQty(l.key, l.quantity - 1)}>−</button>
                            <span>{l.quantity}</span>
                            <button onClick={() => cart.updateQty(l.key, l.quantity + 1)}>+</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.totals}>
                      <div><span>Subtotal</span><span>{cart.subtotal.toFixed(2)} SAR</span></div>
                      <div><span>VAT (15%)</span><span>{cart.vat.toFixed(2)} SAR</span></div>
                      <div className={styles.grandTotal}><span>Total</span><span>{cart.total.toFixed(2)} SAR</span></div>
                    </div>

                    <div className={styles.orderTypeTabs}>
                      {(Object.keys(ORDER_TYPE_LABELS) as OrderType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`${styles.orderTypeTab} ${orderType === type ? styles.orderTypeTabActive : ""}`}
                          onClick={() => changeOrderType(type)}
                        >
                          {ORDER_TYPE_LABELS[type]}
                        </button>
                      ))}
                    </div>

                    <div className={styles.form}>
                      {orderType === "dine_in" && (
                        <>
                          <label>
                            Table Number *
                            <input
                              value={tableNumber}
                              onChange={(e) => setTableNumber(e.target.value)}
                              placeholder="e.g. 5"
                            />
                          </label>
                          <label>
                            Name (optional)
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                          </label>
                          <label>
                            Phone (optional)
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="For order updates" />
                          </label>
                        </>
                      )}

                      {orderType === "takeaway" && (
                        <>
                          <label>
                            Name *
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                          </label>
                          <label>
                            Phone *
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="We'll call you when it's ready" />
                          </label>
                        </>
                      )}

                      {orderType === "cod" && (
                        <>
                          <label>
                            Name *
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                          </label>
                          <label>
                            Phone *
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="For delivery updates" />
                          </label>
                          <label>
                            Delivery Address *
                            <div className={styles.addressRow}>
                              <button
                                type="button"
                                className={styles.locateBtn}
                                onClick={useMyLocation}
                                disabled={locating}
                              >
                                {locating ? "Locating…" : "📍 Use My Location"}
                              </button>
                              {locationError && <span className={styles.locateError}>{locationError}</span>}
                            </div>
                            <textarea
                              className={styles.addressInput}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Building, street, area, city — or tap 'Use My Location' above"
                              rows={3}
                            />
                          </label>
                        </>
                      )}
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <button className={styles.placeBtn} onClick={placeOrder} disabled={placing}>
                      {placing ? "Placing Order…" : `Place Order — ${cart.total.toFixed(2)} SAR`}
                    </button>
                  </>
                )}
              </>
            )}
        </div>
      )}
    </>
  );
}
