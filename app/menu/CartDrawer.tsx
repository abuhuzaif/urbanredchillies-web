"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { useCart } from "../../lib/cart-context";
import { supabase } from "../../lib/supabase";
import { buildZatcaTlvBase64, SELLER_NAME, SELLER_VAT_NUMBER } from "../../lib/zatca";
import styles from "./CartDrawer.module.css";

type ConfirmedInvoice = {
  orderId: string;
  timestamp: string;
  subtotal: number;
  vat: number;
  total: number;
  qrDataUrl: string;
  tableNumber: string;
  lines: { name: string; variant: string | null; quantity: number; unitPrice: number }[];
};

export default function CartDrawer() {
  const cart = useCart();
  const [tableNumber, setTableNumber] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<ConfirmedInvoice | null>(null);

  if (cart.itemCount === 0 && !cart.isOpen) return null;

  async function placeOrder() {
    if (!tableNumber.trim()) {
      setError("Please enter your table number.");
      return;
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

    const { data, error: dbError } = await supabase
      .from("orders")
      .insert({
        customer_name: name.trim() || `Table ${tableNumber.trim()}`,
        customer_phone: phone.trim() || null,
        order_type: "dine_in",
        order_source: "qr_menu",
        table_number: tableNumber.trim(),
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
    setTableNumber("");
    setName("");
    setPhone("");
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
                  <p className={styles.tableTag}>Table {invoice.tableNumber}</p>
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

                    <div className={styles.form}>
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
