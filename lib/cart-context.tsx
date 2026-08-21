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
  subtotal: number;
  vat: number;
  total: number;
  itemCount: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const VAT_RATE = 0.15; // ZATCA — 15% VAT

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
    setOpen(true); // auto-open the cart the moment something is added
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

  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;
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
