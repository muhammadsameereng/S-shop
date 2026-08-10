import { createSlice } from "@reduxjs/toolkit";
import { products, promoCodes } from "../../data/catalog";
import { clamp, load, save, STORAGE_KEYS } from "../../lib/utils";

const persist = (state) =>
  save(STORAGE_KEYS.cart, { lines: state.lines, promo: state.promo });

const stored = load(STORAGE_KEYS.cart, { lines: [], promo: null });

const lineKey = (id, size, color) => `${id}::${size || "-"}::${color || "-"}`;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    lines: stored.lines ?? [],
    promo: stored.promo ?? null,
    shipping: "standard",
    drawerOpen: false,
    lastAdded: null,
  },
  reducers: {
    addToCart: {
      reducer(state, action) {
        const { id, quantity, size, color } = action.payload;
        const key = lineKey(id, size, color);
        const existing = state.lines.find((l) => l.key === key);
        if (existing) {
          existing.quantity = clamp(existing.quantity + quantity, 1, 99);
        } else {
          state.lines.push({ key, id, quantity, size, color });
        }
        state.lastAdded = id;
        persist(state);
      },
      prepare(product, { quantity = 1, size = null, color = null } = {}) {
        return { payload: { id: product.id, quantity, size, color } };
      },
    },
    updateQuantity(state, action) {
      const { key, quantity } = action.payload;
      const line = state.lines.find((l) => l.key === key);
      if (!line) return;
      if (quantity <= 0) {
        state.lines = state.lines.filter((l) => l.key !== key);
      } else {
        line.quantity = clamp(quantity, 1, 99);
      }
      persist(state);
    },
    removeFromCart(state, action) {
      state.lines = state.lines.filter((l) => l.key !== action.payload);
      persist(state);
    },
    clearCart(state) {
      state.lines = [];
      state.promo = null;
      persist(state);
    },
    applyPromo(state, action) {
      const code = String(action.payload || "").toUpperCase();
      state.promo = promoCodes[code] ? { code, ...promoCodes[code] } : null;
      persist(state);
    },
    clearPromo(state) {
      state.promo = null;
      persist(state);
    },
    setShipping(state, action) {
      state.shipping = action.payload;
    },
    openCart(state) {
      state.drawerOpen = true;
    },
    closeCart(state) {
      state.drawerOpen = false;
    },
    toggleCart(state) {
      state.drawerOpen = !state.drawerOpen;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyPromo,
  clearPromo,
  setShipping,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions;

/* ----------------------------- selectors ----------------------------- */

const findProduct = (id) => products.find((p) => p.id === id);

export const selectCartItems = (state) =>
  state.cart.lines
    .map((line) => {
      const product = findProduct(line.id);
      return product ? { ...line, product } : null;
    })
    .filter(Boolean);

export const selectCartCount = (state) =>
  state.cart.lines.reduce((n, l) => n + l.quantity, 0);

export const selectCartTotals = (state) => {
  const items = selectCartItems(state);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const savings = items.reduce(
    (sum, i) =>
      sum + (i.product.oldPrice ? (i.product.oldPrice - i.product.price) * i.quantity : 0),
    0
  );
  const promo = state.cart.promo;
  const discount = promo?.type === "percent" ? (subtotal * promo.value) / 100 : 0;

  const expressCost = 14.99;
  let shipping = 0;
  if (state.cart.shipping === "express") shipping = expressCost;
  else if (subtotal > 0 && subtotal < 75) shipping = 6.99;
  if (promo?.type === "shipping") shipping = 0;

  const taxable = Math.max(subtotal - discount, 0);
  const tax = taxable * 0.08;

  return {
    items,
    subtotal,
    savings,
    discount,
    shipping,
    tax,
    total: taxable + shipping + tax,
    freeShippingRemaining: Math.max(75 - subtotal, 0),
  };
};

export default cartSlice.reducer;
