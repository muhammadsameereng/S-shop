import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineEye, HiOutlineShoppingBag } from "react-icons/hi";
import SmartImage from "../ui/SmartImage";
import Rating from "../ui/Rating";
import { Badge } from "../ui/Bits";
import Contexts from "../../context/Context";
import { addToCart, openCart } from "../../redux/cart/cartSlices";
import { toggleWishlist } from "../../redux/wishlist/wishlistSlices";
import { currency, cx } from "../../lib/utils";

const badgeTone = (badge) =>
  badge === "Deal"
    ? "rose"
    : badge === "New"
    ? "emerald"
    : badge === "Low stock"
    ? "amber"
    : "dark";

function ProductCard({ product, index = 0, onQuickView, view = "grid" }) {
  const dispatch = useDispatch();
  const { toast } = useContext(Contexts);
  const wishlisted = useSelector((s) => s.wishlist.ids.includes(product.id));
  const [hovered, setHovered] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(openCart());
    toast.success("Added to bag", `${product.name} · ${currency(product.price)}`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
    wishlisted
      ? toast.info("Removed from wishlist", product.name)
      : toast.success("Saved to wishlist", product.name);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const priceBlock = (
    <div className="flex items-baseline gap-2">
      <span className="text-base font-extrabold tracking-tight">
        {currency(product.price)}
      </span>
      {product.oldPrice && (
        <span className="text-xs font-semibold text-ink-400 line-through">
          {currency(product.oldPrice)}
        </span>
      )}
    </div>
  );

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.03 }}
        className="card group flex gap-4 overflow-hidden p-3 transition hover:shadow-lift sm:gap-5 sm:p-4"
      >
        <Link
          to={`/product/${product.id}`}
          className="shrink-0 overflow-hidden rounded-xl bg-ink-100 dark:bg-white/5"
        >
          <SmartImage
            src={product.img}
            alt={product.name}
            className="h-28 w-28 sm:h-36 sm:w-36"
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider muted">
                  {product.brand}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="line-clamp-1 text-sm font-extrabold hover:text-brand-500 sm:text-base"
                >
                  {product.name}
                </Link>
              </div>
              <button
                onClick={handleWishlist}
                aria-label="Toggle wishlist"
                className="rounded-full p-2 transition hover:bg-ink-100 dark:hover:bg-white/10"
              >
                {wishlisted ? (
                  <FaHeart className="text-rose-500" size={15} />
                ) : (
                  <FaRegHeart size={15} />
                )}
              </button>
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs muted">{product.description}</p>
            <Rating value={product.rating} count={product.reviews} className="mt-2" />
          </div>
          <div className="flex items-center justify-between gap-3">
            {priceBlock}
            <button onClick={handleAdd} className="btn-dark btn-sm">
              <HiOutlineShoppingBag size={16} /> Add to bag
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 10) * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-ink-100 dark:bg-white/5"
      >
        <SmartImage
          src={hovered ? product.images[1] : product.img}
          alt={product.name}
          className="h-full w-full"
          imgClassName="transition-transform duration-700 group-hover:scale-[1.07]"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.discount > 0 && <Badge tone="rose">−{product.discount}%</Badge>}
          {product.badge && <Badge tone={badgeTone(product.badge)}>{product.badge}</Badge>}
        </div>

        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className={cx(
            "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-all duration-300",
            wishlisted
              ? "bg-white text-rose-500 shadow-soft dark:bg-ink-900"
              : "bg-white/85 text-ink-700 opacity-0 shadow-soft group-hover:opacity-100 dark:bg-ink-900/80 dark:text-ink-100"
          )}
        >
          {wishlisted ? <FaHeart size={14} className="animate-pop" /> : <FaRegHeart size={14} />}
        </button>

        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button onClick={handleAdd} className="btn-primary btn-sm flex-1">
            <HiOutlineShoppingBag size={16} /> Add
          </button>
          {onQuickView && (
            <button
              onClick={handleQuickView}
              aria-label="Quick view"
              className="btn grid h-9 w-9 place-items-center rounded-full bg-white text-ink-900 shadow-soft hover:bg-ink-100"
            >
              <HiOutlineEye size={17} />
            </button>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider muted">
            {product.brand}
          </p>
          {product.stock <= 10 && (
            <span className="text-[11px] font-bold text-amber-600 dark:text-accent-500">
              Only {product.stock} left
            </span>
          )}
        </div>
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-sm font-extrabold leading-snug transition-colors hover:text-brand-500"
        >
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviews} showValue={false} />
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          {priceBlock}
          {product.freeShipping && (
            <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              Free ship
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
