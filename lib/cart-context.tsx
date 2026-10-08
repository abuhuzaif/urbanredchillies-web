"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartLine = {
  key: string; // name + variant, unique per line
  name: string;
  category: string;
  variant: string | null;
  unitPrice: number;
  quantity: number;
};

type CartContextType = {
  lines: CartLine[];
  addItem: (line: Omit<CartLine, "quantity">) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  subtotal: number; // amount excluding VAT
  vat: number; // VAT portion already included in the menu prices
  total: number; // what the customer pays = sum of menu prices
  itemCount: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const VAT_RATE = 0.15; // ZATCA — 15% VAT

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  function addItem(line: Omit<CartLine, "quantity">) {
    setLines((prev) => {
      const existing = prev.find((l) => l.key === line.key);
      if (existing) {
        return prev.map((l) =>
          l.key === line.key ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { ...line, quantity: 1 }];
    });
    // Never auto-open the cart — the person keeps browsing/adding dishes,
    // and only sees the cart when they deliberately tap the cart button
    // to review their order and check out.
  }

  function updateQty(key: string, qty: number) {
    if (qty <= 0) {
      removeItem(key);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, quantity: qty } : l))
    );
  }

  function removeItem(key: string) {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }

  function clearCart() {
    setLines([]);
  }

  // Menu prices already INCLUDE 15% VAT, so VAT is never added on top.
  // total = sum of menu prices; VAT is extracted from it (total * 15 / 115);
  // subtotal = total - VAT. e.g. 25.00 -> VAT 3.26, subtotal 21.74.
  const total = round2(lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0));
  const vat = round2((total * VAT_RATE) / (1 + VAT_RATE));
  const subtotal = round2(total - vat);
  const itemCount = lines.reduce((s, l) => s + l.quantity, 0);

  return (
    <CartContext.Provider
      value={{ lines, addItem, updateQty, removeItem, clearCart, subtotal, vat, total, itemCount, isOpen, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
