import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { HiX, HiOutlineShoppingBag } from "react-icons/hi";
import SmartImage from "../ui/SmartImage";
import Rating from "../ui/Rating";
import { Badge, QuantityStepper } from "../ui/Bits";
import Contexts from "../../context/Context";
import { addToCart, openCart } from "../../redux/cart/cartSlices";
import { currency, cx } from "../../lib/utils";

function QuickView({ product, onClose }) {
  const dispatch = useDispatch();
  const { toast } = useContext(Contexts);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setQuantity(1);
    setActive(0);
    setSize(product?.sizes?.[1] ?? product?.sizes?.[0] ?? null);
    setColor(product?.colors?.[0]?.name ?? null);
  }, [product]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  const add = () => {
    dispatch(addToCart(product, { quantity, size, color }));
    dispatch(openCart());
    toast.success("Added to bag", `${quantity} × ${product.name}`);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[90] grid place-items-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-lift dark:bg-ink-900 md:flex-row"
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-soft transition hover:bg-ink-100 dark:bg-ink-950/80 dark:hover:bg-white/10"
            >
              <HiX size={16} />
            </button>

            <div className="flex shrink-0 flex-col gap-3 bg-ink-50 p-4 dark:bg-white/5 md:w-[45%] md:p-6">
              <SmartImage
                src={product.images[active]}
                alt={product.name}
                className="aspect-square w-full rounded-2xl"
              />
              <div className="flex gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActive(i)}
                    className={cx(
                      "overflow-hidden rounded-xl border-2 transition",
                      active === i
                        ? "border-brand-500"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <SmartImage src={src} alt="" className="h-14 w-14" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="soft">{product.categoryName}</Badge>
                {product.discount > 0 && <Badge tone="rose">−{product.discount}%</Badge>}
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
                {product.name}
              </h2>
              <Rating value={product.rating} count={product.reviews} className="mt-2" />

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold tracking-tight">
                  {currency(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm font-semibold text-ink-400 line-through">
                    {currency(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed muted">{product.description}</p>

              {product.colors?.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wider muted">
                    Colour · <span className="text-ink-700 dark:text-ink-200">{color}</span>
                  </p>
                  <div className="mt-2 flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setColor(c.name)}
                        aria-label={c.name}
                        style={{ background: c.hex }}
                        className={cx(
                          "h-8 w-8 rounded-full ring-offset-2 transition ring-offset-white dark:ring-offset-ink-900",
                          color === c.name ? "ring-2 ring-brand-500" : "ring-1 ring-ink-200"
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wider muted">Size</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={cx(
                          "chip",
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

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <QuantityStepper value={quantity} onChange={setQuantity} />
                <button onClick={add} className="btn-primary btn-md flex-1">
                  <HiOutlineShoppingBag size={17} /> Add to bag ·{" "}
                  {currency(product.price * quantity)}
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="mt-4 inline-block text-sm font-bold text-brand-500 link-underline"
              >
                View full details →
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default QuickView;
