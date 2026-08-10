import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import SmartImage from "../ui/SmartImage";
import Rating from "../ui/Rating";
import { heroSlides, products } from "../../data/catalog";
import { currency, cx } from "../../lib/utils";

const DURATION = 6500;

function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      DURATION
    );
    return () => clearTimeout(t);
  }, [index, paused]);

  const slide = heroSlides[index];
  const product = products.find((p) => p.id === slide.productId);

  const go = (dir) =>
    setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);

  return (
    <section
      className="container-x pt-6 sm:pt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-ink-900 text-white dark:bg-ink-900">
        {/* Ambient accent that shifts per slide */}
        <motion.div
          key={`glow-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.1 }}
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ background: slide.accent }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.08),transparent_45%)]" />

        <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em]"
                  style={{ background: `${slide.accent}22`, color: slide.accent }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: slide.accent }} />
                  {slide.eyebrow}
                </span>
                <h1 className="mt-5 text-3xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                  {slide.copy}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to={slide.to} className="btn-primary btn-lg">
                    {slide.cta} <HiOutlineArrowRight size={18} />
                  </Link>
                  <Link
                    to="/products"
                    className="btn btn-lg border border-white/20 text-white hover:bg-white/10"
                  >
                    Browse everything
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-8 border-t border-white/10 pt-6">
              {[
                ["40+", "Curated products"],
                ["4.8★", "Average rating"],
                ["24h", "Dispatch time"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-xl font-extrabold sm:text-2xl">{value}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured product card */}
          <div className="relative hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.productId}
                initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="ml-auto w-full max-w-sm"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block overflow-hidden rounded-3xl bg-white/10 p-3 backdrop-blur-md ring-1 ring-white/15 transition hover:ring-white/30"
                >
                  <SmartImage
                    src={product.img}
                    alt={product.name}
                    className="aspect-[4/3] w-full rounded-2xl"
                  />
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold">{product.name}</p>
                      <Rating
                        value={product.rating}
                        showValue={false}
                        className="mt-1"
                      />
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-ink-900">
                      {currency(product.price)}
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
            <div className="animate-floaty pointer-events-none absolute -left-4 bottom-6 rounded-2xl bg-white px-4 py-3 text-ink-900 shadow-lift">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                In stock
              </p>
              <p className="text-xs font-bold">Ships within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="relative flex items-center justify-between gap-4 px-7 pb-7 sm:px-10 sm:pb-8 lg:px-14">
          <div className="flex flex-1 gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group h-1 flex-1 overflow-hidden rounded-full bg-white/20"
              >
                <motion.span
                  key={`${s.id}-${index}-${paused}`}
                  className="block h-full rounded-full bg-white"
                  initial={{ width: i < index ? "100%" : "0%" }}
                  animate={{ width: i === index ? "100%" : i < index ? "100%" : "0%" }}
                  transition={{
                    duration: i === index && !paused ? DURATION / 1000 : 0.3,
                    ease: "linear",
                  }}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {[[-1, HiOutlineChevronLeft], [1, HiOutlineChevronRight]].map(
              ([dir, Icon]) => (
                <button
                  key={dir}
                  onClick={() => go(dir)}
                  aria-label={dir === -1 ? "Previous slide" : "Next slide"}
                  className={cx(
                    "grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:bg-white hover:text-ink-900"
                  )}
                >
                  <Icon size={17} />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
