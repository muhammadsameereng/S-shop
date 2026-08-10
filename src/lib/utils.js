export const cx = (...parts) => parts.filter(Boolean).join(" ");

export const currency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value ?? 0);

export const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the app still works in-memory */
  }
};

export const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    /* no-op */
  }
};

/** Small promise delay so optimistic UI states are visible instead of instant. */
export const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export const relativeDays = (days) => {
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? "a month ago" : `${months} months ago`;
};

export const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

export const STORAGE_KEYS = {
  cart: "sshop.cart",
  wishlist: "sshop.wishlist",
  user: "sshop.user",
  theme: "sshop.theme",
  recent: "sshop.recent",
};
