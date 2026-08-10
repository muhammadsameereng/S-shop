import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineShoppingBag, HiOutlineTrash } from "react-icons/hi";
import SmartImage from "../components/ui/SmartImage";
import Rating from "../components/ui/Rating";
import QuickView from "../components/product/QuickView";
import { EmptyState } from "../components/ui/Bits";
import { Breadcrumbs, PageShell } from "../components/layout/Layout";
import Contexts from "../context/Context";
import { addToCart, openCart } from "../redux/cart/cartSlices";
import { clearWishlist, removeFromWishlist, selectWishlist } from "../redux/wishlist/wishlistSlices";
import { currency } from "../lib/utils";

function Wishlistpage() {
  const dispatch = useDispatch();
  const { toast } = useContext(Contexts);
  const items = useSelector(selectWishlist);
  const [quickView, setQuickView] = useState(null);

  const moveAll = () => {
    items.forEach((p) => dispatch(addToCart(p)));
    dispatch(clearWishlist());
    dispatch(openCart());
    toast.success("Moved to bag", `${items.length} items added.`);
  };

  return (
    <PageShell>
      <div className="container-x pt-8">
        <Breadcrumbs trail={[{ label: "Wishlist" }]} />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Wishlist
            </h1>
            <p className="mt-1.5 text-sm muted">
              {items.length === 0
                ? "Nothing saved yet."
                : `${items.length} saved ${items.length === 1 ? "item" : "items"}.`}
            </p>
          </div>
          {items.length > 0 && (
            <div className="flex gap-2">
              <button onClick={moveAll} className="btn-primary btn-md">
                <HiOutlineShoppingBag size={17} /> Move all to bag
              </button>
              <button
                onClick={() => {
                  dispatch(clearWishlist());
                  toast.info("Wishlist cleared");
                }}
                className="btn-outline btn-md"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon="💛"
          title="No saved items yet"
          copy="Tap the heart on any product to keep it here for later."
          action={
            <Link to="/products" className="btn-primary btn-md">
              Find something you like
            </Link>
          }
        />
      ) : (
        <div className="container-x mt-8 grid gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {items.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(i, 8) * 0.03 }}
                className="card flex gap-4 p-4"
              >
                <Link to={`/product/${p.id}`} className="shrink-0">
                  <SmartImage
                    src={p.img}
                    alt={p.name}
                    className="h-28 w-28 rounded-xl bg-ink-100 dark:bg-white/5"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider muted">
                      {p.brand}
                    </p>
                    <Link
                      to={`/product/${p.id}`}
                      className="line-clamp-2 text-sm font-extrabold hover:text-brand-500"
                    >
                      {p.name}
                    </Link>
                    <Rating value={p.rating} showValue={false} className="mt-1.5" />
                    <p className="mt-1.5 text-base font-extrabold">{currency(p.price)}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => {
                        dispatch(addToCart(p));
                        dispatch(removeFromWishlist(p.id));
                        dispatch(openCart());
                        toast.success("Added to bag", p.name);
                      }}
                      className="btn-dark btn-sm flex-1"
                    >
                      <HiOutlineShoppingBag size={15} /> Add to bag
                    </button>
                    <button
                      onClick={() => {
                        dispatch(removeFromWishlist(p.id));
                        toast.info("Removed", p.name);
                      }}
                      aria-label="Remove from wishlist"
                      className="grid h-9 w-9 place-items-center rounded-full border border-ink-200 transition hover:border-rose-300 hover:text-rose-500 dark:border-white/15"
                    >
                      <HiOutlineTrash size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </PageShell>
  );
}

export default Wishlistpage;
