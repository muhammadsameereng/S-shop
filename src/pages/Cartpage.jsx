import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineTrash, HiOutlineTag, HiOutlineArrowRight, HiX } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import SmartImage from "../components/ui/SmartImage";
import { EmptyState, QuantityStepper } from "../components/ui/Bits";
import { Breadcrumbs, PageShell } from "../components/layout/Layout";
import Contexts from "../context/Context";
import {
  applyPromo,
  clearPromo,
  removeFromCart,
  selectCartTotals,
  setShipping,
  updateQuantity,
} from "../redux/cart/cartSlices";
import { toggleWishlist } from "../redux/wishlist/wishlistSlices";
import { currency, cx } from "../lib/utils";
import { products } from "../data/catalog";
import ProductCard from "../components/product/ProductCard";

export function OrderSummary({ totals, promoUI = true, children }) {
  const dispatch = useDispatch();
  const { toast } = useContext(Contexts);
  const promo = useSelector((s) => s.cart.promo);
  const shipping = useSelector((s) => s.cart.shipping);
  const [code, setCode] = useState("");

  const submitPromo = (e) => {
    e.preventDefault();
    const upper = code.trim().toUpperCase();
    dispatch(applyPromo(upper));
    // Re-read after dispatch via the known code list keeps this simple.
    if (["SSHOP10", "WELCOME20", "FREESHIP"].includes(upper)) {
      toast.success("Promo applied", `${upper} is now active.`);
      setCode("");
    } else {
      toast.error("That code didn't work", "Try SSHOP10 or FREESHIP.");
    }
  };

  return (
    <div className="card sticky top-32 p-6">
      <h2 className="text-lg font-extrabold">Order summary</h2>

      {promoUI && (
        <div className="mt-5">
          {promo ? (
            <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                <HiOutlineTag size={16} /> {promo.code}
              </div>
              <button
                onClick={() => dispatch(clearPromo())}
                aria-label="Remove promo code"
                className="rounded-full p-1 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400"
              >
                <HiX size={15} />
              </button>
            </div>
          ) : (
            <form onSubmit={submitPromo} className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Promo code"
                aria-label="Promo code"
                className="field h-11 flex-1 rounded-full py-0 uppercase"
              />
              <button type="submit" className="btn-dark btn-md">
                Apply
              </button>
            </form>
          )}
          {!promo && (
            <p className="mt-2 text-[11px] muted">
              Try <span className="font-bold">SSHOP10</span> or{" "}
              <span className="font-bold">FREESHIP</span>
            </p>
          )}
        </div>
      )}

      <div className="mt-5 space-y-2.5 text-sm">
        <Row label={`Subtotal (${totals.items.length} items)`} value={currency(totals.subtotal)} />
        {totals.discount > 0 && (
          <Row
            label={`Discount (${promo?.value}%)`}
            value={`− ${currency(totals.discount)}`}
            tone="emerald"
          />
        )}
        <Row
          label="Delivery"
          value={totals.shipping === 0 ? "Free" : currency(totals.shipping)}
          tone={totals.shipping === 0 ? "emerald" : undefined}
        />
        <Row label="Estimated tax" value={currency(totals.tax)} />
        <div className="border-t border-ink-100 pt-3 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-base font-extrabold">Total</span>
            <span className="text-2xl font-extrabold tracking-tight">
              {currency(totals.total)}
            </span>
          </div>
          {totals.savings > 0 && (
            <p className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              You saved {currency(totals.savings + totals.discount)} on this order
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-extrabold uppercase tracking-wider muted">
          Delivery speed
        </p>
        <div className="mt-2 grid gap-2">
          {[
            ["standard", "Standard", "3–5 business days", totals.subtotal >= 75 ? "Free" : currency(6.99)],
            ["express", "Express", "Next business day", currency(14.99)],
          ].map(([key, label, eta, price]) => (
            <button
              key={key}
              onClick={() => dispatch(setShipping(key))}
              className={cx(
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition",
                shipping === key
                  ? "border-brand-500 bg-brand-500/5"
                  : "border-ink-200 hover:border-brand-300 dark:border-white/10"
              )}
            >
              <span>
                <span className="block text-sm font-extrabold">{label}</span>
                <span className="block text-[11px] muted">{eta}</span>
              </span>
              <span className="text-sm font-extrabold">{price}</span>
            </button>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}

function Row({ label, value, tone }) {
  return (
    <div className="flex items-center justify-between">
      <span className="muted">{label}</span>
      <span
        className={cx(
          "font-bold",
          tone === "emerald" && "text-emerald-600 dark:text-emerald-400"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Cartpage() {
  const dispatch = useDispatch();
  const { toast } = useContext(Contexts);
  const totals = useSelector(selectCartTotals);
  const { items } = totals;

  const recommended = products
    .filter((p) => !items.some((i) => i.id === p.id))
    .slice(0, 4);

  return (
    <PageShell>
      <div className="container-x pt-8">
        <Breadcrumbs trail={[{ label: "Shopping bag" }]} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Shopping bag
        </h1>
        <p className="mt-1.5 text-sm muted">
          {items.length === 0
            ? "Nothing here yet."
            : `${items.length} ${items.length === 1 ? "item" : "items"} ready to go.`}
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon="🛍️"
          title="Your bag is empty"
          copy="Once you add something it'll live here until you're ready to check out."
          action={
            <Link to="/products" className="btn-primary btn-lg">
              Browse products <HiOutlineArrowRight size={17} />
            </Link>
          }
        />
      ) : (
        <div className="container-x mt-8 grid gap-8 pb-20 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul className="card divide-y divide-ink-100 overflow-hidden dark:divide-white/10">
              <AnimatePresence initial={false}>
                {items.map((line) => (
                  <motion.li
                    key={line.key}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-4 p-4 sm:p-5"
                  >
                    <Link to={`/product/${line.product.id}`} className="shrink-0">
                      <SmartImage
                        src={line.product.img}
                        alt={line.product.name}
                        className="h-24 w-24 rounded-xl bg-ink-100 dark:bg-white/5 sm:h-28 sm:w-28"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold uppercase tracking-wider muted">
                              {line.product.brand}
                            </p>
                            <Link
                              to={`/product/${line.product.id}`}
                              className="line-clamp-1 text-sm font-extrabold hover:text-brand-500 sm:text-base"
                            >
                              {line.product.name}
                            </Link>
                            {(line.color || line.size) && (
                              <p className="mt-1 text-xs muted">
                                {[line.color, line.size].filter(Boolean).join(" · ")}
                              </p>
                            )}
                          </div>
                          <span className="text-base font-extrabold">
                            {currency(line.product.price * line.quantity)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <QuantityStepper
                          size="sm"
                          value={line.quantity}
                          onChange={(q) =>
                            dispatch(updateQuantity({ key: line.key, quantity: q }))
                          }
                        />
                        <button
                          onClick={() => {
                            dispatch(toggleWishlist(line.product.id));
                            dispatch(removeFromCart(line.key));
                            toast.info("Moved to wishlist", line.product.name);
                          }}
                          className="btn-ghost btn-sm"
                        >
                          <FaHeart size={12} /> Save for later
                        </button>
                        <button
                          onClick={() => {
                            dispatch(removeFromCart(line.key));
                            toast.info("Removed", line.product.name);
                          }}
                          className="btn-ghost btn-sm text-rose-500 hover:bg-rose-500/10"
                        >
                          <HiOutlineTrash size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="mt-10">
              <h2 className="text-lg font-extrabold">You might also like</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {recommended.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary totals={totals}>
              <Link to="/checkout" className="btn-primary btn-lg mt-5 w-full">
                Proceed to checkout <HiOutlineArrowRight size={17} />
              </Link>
              <Link
                to="/products"
                className="btn-ghost btn-md mt-2 w-full"
              >
                Continue shopping
              </Link>
            </OrderSummary>
          </div>
        </div>
      )}
    </PageShell>
  );
}

export default Cartpage;
