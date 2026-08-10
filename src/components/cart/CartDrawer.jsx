import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { HiX, HiOutlineTrash, HiOutlineShoppingBag } from "react-icons/hi";
import SmartImage from "../ui/SmartImage";
import { EmptyState, QuantityStepper } from "../ui/Bits";
import {
  closeCart,
  removeFromCart,
  selectCartTotals,
  updateQuantity,
} from "../../redux/cart/cartSlices";
import { currency, clamp } from "../../lib/utils";

function CartDrawer() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.cart.drawerOpen);
  const { items, subtotal, freeShippingRemaining, savings } =
    useSelector(selectCartTotals);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && dispatch(closeCart());
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const progress = clamp(((75 - freeShippingRemaining) / 75) * 100, 0, 100);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[85]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-lift dark:bg-ink-950"
            role="dialog"
            aria-label="Shopping bag"
          >
            <header className="flex items-center justify-between border-b border-ink-100 px-5 py-4 dark:border-white/10">
              <div>
                <h2 className="text-base font-extrabold">Your bag</h2>
                <p className="text-xs muted">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => dispatch(closeCart())}
                aria-label="Close bag"
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-ink-100 dark:hover:bg-white/10"
              >
                <HiX size={18} />
              </button>
            </header>

            {items.length > 0 && (
              <div className="border-b border-ink-100 px-5 py-3.5 dark:border-white/10">
                {freeShippingRemaining > 0 ? (
                  <p className="text-xs font-semibold">
                    You&apos;re{" "}
                    <span className="text-brand-500">
                      {currency(freeShippingRemaining)}
                    </span>{" "}
                    away from free delivery
                  </p>
                ) : (
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    🎉 Free delivery unlocked
                  </p>
                )}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <EmptyState
                  icon="🛍️"
                  title="Your bag is empty"
                  copy="Browse the catalogue and add something you like — it'll show up right here."
                  action={
                    <Link
                      to="/products"
                      onClick={() => dispatch(closeCart())}
                      className="btn-primary btn-md"
                    >
                      Start shopping
                    </Link>
                  }
                />
              ) : (
                <ul className="divide-y divide-ink-100 dark:divide-white/10">
                  <AnimatePresence initial={false}>
                    {items.map((line) => (
                      <motion.li
                        key={line.key}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-3 py-4"
                      >
                        <Link
                          to={`/product/${line.product.id}`}
                          onClick={() => dispatch(closeCart())}
                          className="shrink-0"
                        >
                          <SmartImage
                            src={line.product.img}
                            alt={line.product.name}
                            className="h-20 w-20 rounded-xl bg-ink-100 dark:bg-white/5"
                          />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                to={`/product/${line.product.id}`}
                                onClick={() => dispatch(closeCart())}
                                className="line-clamp-2 text-sm font-bold hover:text-brand-500"
                              >
                                {line.product.name}
                              </Link>
                              <button
                                onClick={() => dispatch(removeFromCart(line.key))}
                                aria-label="Remove item"
                                className="rounded-lg p-1.5 muted transition hover:bg-rose-500/10 hover:text-rose-500"
                              >
                                <HiOutlineTrash size={16} />
                              </button>
                            </div>
                            {(line.size || line.color) && (
                              <p className="mt-0.5 text-xs muted">
                                {[line.color, line.size].filter(Boolean).join(" · ")}
                              </p>
                            )}
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <QuantityStepper
                              size="sm"
                              value={line.quantity}
                              onChange={(q) =>
                                dispatch(
                                  updateQuantity({ key: line.key, quantity: q })
                                )
                              }
                            />
                            <span className="text-sm font-extrabold">
                              {currency(line.product.price * line.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-ink-100 p-5 dark:border-white/10">
                {savings > 0 && (
                  <p className="mb-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    You&apos;re saving {currency(savings)} on this order
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold muted">Subtotal</span>
                  <span className="text-xl font-extrabold tracking-tight">
                    {currency(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-xs muted">
                  Taxes and delivery calculated at checkout.
                </p>
                <div className="mt-4 grid gap-2">
                  <Link
                    to="/checkout"
                    onClick={() => dispatch(closeCart())}
                    className="btn-primary btn-lg w-full"
                  >
                    <HiOutlineShoppingBag size={18} /> Checkout
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => dispatch(closeCart())}
                    className="btn-ghost btn-md w-full"
                  >
                    View full bag
                  </Link>
                </div>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
