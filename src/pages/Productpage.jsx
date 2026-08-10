import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaCheck } from "react-icons/fa";
import {
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineShieldCheck,
  HiOutlineShare,
} from "react-icons/hi";
import SmartImage from "../components/ui/SmartImage";
import Rating from "../components/ui/Rating";
import ProductCard from "../components/product/ProductCard";
import { Badge, EmptyState, QuantityStepper, SectionHeading } from "../components/ui/Bits";
import { Breadcrumbs, PageShell } from "../components/layout/Layout";
import Contexts from "../context/Context";
import { addToCart, openCart } from "../redux/cart/cartSlices";
import { toggleWishlist } from "../redux/wishlist/wishlistSlices";
import { viewProduct } from "../redux/products/productslices";
import { getProductById, getRelated } from "../data/catalog";
import { currency, cx, relativeDays } from "../lib/utils";

const tabs = [
  { key: "description", label: "Description" },
  { key: "specs", label: "Specifications" },
  { key: "reviews", label: "Reviews" },
];

function Productpage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { toast } = useContext(Contexts);

  const product = useMemo(() => getProductById(id), [id]);
  const wishlisted = useSelector((s) => s.wishlist.ids.includes(id));

  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [tab, setTab] = useState("description");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;
    setActive(0);
    setQuantity(1);
    setTab("description");
    setSize(product.sizes?.[1] ?? product.sizes?.[0] ?? null);
    setColor(product.colors?.[0]?.name ?? null);
    dispatch(viewProduct(product.id));
  }, [product, dispatch]);

  if (!product) {
    return (
      <PageShell>
        <EmptyState
          icon="🧭"
          title="We couldn't find that product"
          copy="It may have sold out or the link is out of date."
          action={
            <Link to="/products" className="btn-primary btn-md">
              Back to shop
            </Link>
          }
        />
      </PageShell>
    );
  }

  const related = getRelated(product, 5);

  const handleAdd = () => {
    dispatch(addToCart(product, { quantity, size, color }));
    dispatch(openCart());
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    toast.success("Added to bag", `${quantity} × ${product.name}`);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: product.name, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.info("Link copied", "Share it wherever you like.");
      }
    } catch {
      /* user dismissed the share sheet */
    }
  };

  return (
    <PageShell>
      <div className="container-x pt-8">
        <Breadcrumbs
          trail={[
            { label: "Shop", to: "/products" },
            { label: product.categoryName, to: `/category/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="container-x mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 self-start sm:flex-row">
          <div className="flex gap-3 sm:flex-col">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cx(
                  "overflow-hidden rounded-xl border-2 transition",
                  active === i
                    ? "border-brand-500"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <SmartImage src={src} alt="" className="h-16 w-16 sm:h-20 sm:w-20" />
              </button>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden rounded-3xl bg-ink-100 dark:bg-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SmartImage
                  src={product.images[active]}
                  alt={product.name}
                  className="aspect-square w-full"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.discount > 0 && <Badge tone="rose">−{product.discount}%</Badge>}
              {product.badge && <Badge tone="dark">{product.badge}</Badge>}
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div className="lg:pt-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-500">
                {product.brand}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <button
              onClick={share}
              aria-label="Share product"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-200 transition hover:border-brand-400 hover:text-brand-500 dark:border-white/15"
            >
              <HiOutlineShare size={18} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} count={product.reviews} />
            <button
              onClick={() => setTab("reviews")}
              className="text-xs font-bold text-brand-500 hover:underline"
            >
              Read reviews
            </button>
            <span
              className={cx(
                "text-xs font-extrabold",
                product.stock > 10
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-accent-500"
              )}
            >
              {product.stock > 10 ? "In stock" : `Only ${product.stock} left`}
            </span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-4xl font-extrabold tracking-tight">
              {currency(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="pb-1 text-base font-semibold text-ink-400 line-through">
                  {currency(product.oldPrice)}
                </span>
                <span className="mb-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  Save {currency(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed muted">{product.description}</p>

          {product.colors?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-extrabold uppercase tracking-wider muted">
                Colour · <span className="text-ink-900 dark:text-white">{color}</span>
              </p>
              <div className="mt-2.5 flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    style={{ background: c.hex }}
                    className={cx(
                      "h-9 w-9 rounded-full ring-offset-2 transition ring-offset-white dark:ring-offset-ink-950",
                      color === c.name
                        ? "ring-2 ring-brand-500"
                        : "ring-1 ring-ink-200 hover:ring-ink-400"
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold uppercase tracking-wider muted">
                  Size
                </p>
                <button className="text-xs font-bold text-brand-500 hover:underline">
                  Size guide
                </button>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cx(
                      "chip px-4 py-2",
                      size === s
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "hover:border-brand-400"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <button
              onClick={handleAdd}
              className={cx(
                "btn-lg flex-1 transition-colors",
                added ? "btn bg-emerald-500 text-white" : "btn-primary"
              )}
            >
              {added ? (
                <>
                  <FaCheck size={15} /> Added to bag
                </>
              ) : (
                <>
                  <HiOutlineShoppingBag size={18} /> Add to bag ·{" "}
                  {currency(product.price * quantity)}
                </>
              )}
            </button>
            <button
              onClick={() => {
                dispatch(toggleWishlist(product.id));
                wishlisted
                  ? toast.info("Removed from wishlist", product.name)
                  : toast.success("Saved to wishlist", product.name);
              }}
              aria-label="Toggle wishlist"
              className={cx(
                "btn-lg grid w-12 place-items-center rounded-full border px-0",
                wishlisted
                  ? "border-rose-300 bg-rose-500/10 text-rose-500"
                  : "border-ink-200 hover:border-rose-300 hover:text-rose-500 dark:border-white/15"
              )}
            >
              {wishlisted ? <FaHeart size={17} /> : <FaRegHeart size={17} />}
            </button>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {[
              [HiOutlineTruck, "Free delivery", "Orders over $75"],
              [HiOutlineRefresh, "30-day returns", "Prepaid label"],
              [HiOutlineShieldCheck, "2-year warranty", "Covered parts"],
            ].map(([Icon, title, copy]) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-ink-100 p-3.5 dark:border-white/10"
              >
                <Icon size={20} className="shrink-0 text-brand-500" />
                <div className="min-w-0">
                  <p className="text-xs font-extrabold leading-tight">{title}</p>
                  <p className="mt-0.5 text-[11px] leading-tight muted">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container-x mt-16">
        <div className="flex gap-1 border-b border-ink-100 dark:border-white/10">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cx(
                "relative px-4 py-3 text-sm font-extrabold transition",
                tab === t.key ? "text-brand-500" : "muted hover:text-ink-900 dark:hover:text-white"
              )}
            >
              {t.label}
              {t.key === "reviews" && (
                <span className="ml-1.5 text-xs muted">({product.reviewList.length})</span>
              )}
              {tab === t.key && (
                <motion.span
                  layoutId="product-tab"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-500"
                />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "description" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <p className="text-sm leading-relaxed muted">{product.description}</p>
              <ul className="space-y-3">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm font-semibold">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <FaCheck size={10} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "specs" && (
            <div className="max-w-2xl overflow-hidden rounded-2xl border border-ink-100 dark:border-white/10">
              {Object.entries(product.specs).map(([k, v], i) => (
                <div
                  key={k}
                  className={cx(
                    "grid grid-cols-3 gap-4 px-5 py-3.5 text-sm",
                    i % 2 === 0 ? "bg-ink-50 dark:bg-white/5" : ""
                  )}
                >
                  <dt className="font-bold muted">{k}</dt>
                  <dd className="col-span-2 font-semibold">{v}</dd>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="card h-fit p-6">
                <p className="text-5xl font-extrabold tracking-tight">
                  {product.rating.toFixed(1)}
                </p>
                <Rating value={product.rating} showValue={false} className="mt-2" />
                <p className="mt-2 text-xs muted">
                  Based on {product.reviews.toLocaleString()} reviews
                </p>
                <div className="mt-5 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct =
                      star === Math.round(product.rating)
                        ? 62
                        : star === Math.round(product.rating) - 1
                        ? 24
                        : star > product.rating
                        ? 9
                        : 3;
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3 font-bold">{star}</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                          <div
                            className="h-full rounded-full bg-accent-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-right muted">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <ul className="space-y-4 lg:col-span-2">
                {product.reviewList.map((r) => (
                  <li key={r.id} className="card p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500/10 text-xs font-extrabold text-brand-500">
                          {r.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                        <div>
                          <p className="text-sm font-extrabold">{r.author}</p>
                          <p className="text-[11px] muted">
                            {relativeDays(r.daysAgo)}
                            {r.verified && (
                              <span className="ml-2 font-bold text-emerald-600 dark:text-emerald-400">
                                Verified purchase
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <Rating value={r.rating} showValue={false} size={11} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed muted">{r.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-x mt-10 pb-20">
          <SectionHeading
            eyebrow="You may also like"
            title={`More from ${product.categoryName}`}
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}

export default Productpage;
