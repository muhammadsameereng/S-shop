import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineShieldCheck,
  HiOutlineChat,
  HiOutlineArrowRight,
} from "react-icons/hi";
import SmartImage from "../ui/SmartImage";
import ProductCard from "../product/ProductCard";
import { Reveal, SectionHeading, Badge } from "../ui/Bits";
import { categories, products, testimonials, valueProps } from "../../data/catalog";
import { currency, cx } from "../../lib/utils";

const icons = {
  truck: HiOutlineTruck,
  return: HiOutlineRefresh,
  shield: HiOutlineShieldCheck,
  support: HiOutlineChat,
};

export function ValueProps() {
  return (
    <section className="container-x mt-14">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {valueProps.map((v, i) => {
          const Icon = icons[v.icon];
          return (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="card flex h-full items-start gap-3.5 p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                  <Icon size={21} />
                </span>
                <div>
                  <p className="text-sm font-extrabold">{v.title}</p>
                  <p className="mt-0.5 text-xs muted">{v.copy}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function CategoryGrid() {
  return (
    <section className="container-x mt-20">
      <SectionHeading
        eyebrow="Browse"
        title="Shop by category"
        copy="Six departments, every one of them curated rather than crammed."
        action={
          <Link to="/products" className="btn-outline btn-md">
            All products <HiOutlineArrowRight size={16} />
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                to={`/category/${c.slug}`}
                className={cx(
                  "group relative block overflow-hidden rounded-2xl",
                  i === 0 ? "lg:col-span-1" : ""
                )}
              >
                <SmartImage
                  src={c.image}
                  alt={c.name}
                  className="aspect-[16/10] w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
                <div
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: c.color }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.icon}</span>
                    <h3 className="text-xl font-extrabold tracking-tight">{c.name}</h3>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{c.tagline}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider">
                    <span>{count} products</span>
                    <HiOutlineArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

const tabs = [
  { key: "trending", label: "Trending" },
  { key: "new", label: "New in" },
  { key: "top", label: "Top rated" },
];

export function FeaturedProducts({ onQuickView }) {
  const [tab, setTab] = useState("trending");

  const list = useMemo(() => {
    const copy = [...products];
    if (tab === "new") copy.sort((a, b) => a.addedDaysAgo - b.addedDaysAgo);
    else if (tab === "top") copy.sort((a, b) => b.rating - a.rating);
    else copy.sort((a, b) => b.popularity - a.popularity);
    return copy.slice(0, 10);
  }, [tab]);

  return (
    <section className="container-x mt-20">
      <SectionHeading
        eyebrow="Handpicked"
        title="Products people keep coming back to"
        copy="Ranked by what actually sells, not by what we paid to promote."
        action={
          <div className="inline-flex rounded-full bg-ink-100 p-1 dark:bg-white/10">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cx(
                  "relative rounded-full px-4 py-2 text-xs font-extrabold transition",
                  tab === t.key ? "text-white" : "muted hover:text-ink-900 dark:hover:text-white"
                )}
              >
                {tab === t.key && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-brand-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} onQuickView={onQuickView} />
        ))}
      </div>
    </section>
  );
}

/* A live countdown gives the deal strip a reason to exist. */
function useCountdown(hours = 8) {
  const [target] = useState(() => Date.now() + hours * 3600 * 1000);
  const [left, setLeft] = useState(target - Date.now());

  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(target - Date.now(), 0)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const total = Math.floor(left / 1000);
  return {
    h: String(Math.floor(total / 3600)).padStart(2, "0"),
    m: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
    s: String(total % 60).padStart(2, "0"),
  };
}

export function DealStrip() {
  const { h, m, s } = useCountdown(8);
  const deals = products.filter((p) => p.discount >= 15).slice(0, 4);

  return (
    <section className="container-x mt-20">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 p-7 text-white sm:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <Badge tone="amber">Limited time</Badge>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance">
              Flash deals end in
            </h2>
            <div className="mt-5 flex gap-2">
              {[
                [h, "hrs"],
                [m, "min"],
                [s, "sec"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="w-[68px] rounded-2xl bg-white/15 py-3 text-center backdrop-blur"
                >
                  <p className="text-2xl font-extrabold tabular-nums">{v}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                    {l}
                  </p>
                </div>
              ))}
            </div>
            <Link to="/deals" className="btn-dark btn-md mt-6 bg-white text-brand-600 hover:bg-white/90">
              Shop all deals <HiOutlineArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:col-span-8 lg:grid-cols-4">
            {deals.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group rounded-2xl bg-white/10 p-3 backdrop-blur transition hover:bg-white/20"
              >
                <SmartImage
                  src={p.img}
                  alt={p.name}
                  className="aspect-square w-full rounded-xl"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <p className="mt-3 line-clamp-1 text-xs font-bold">{p.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-extrabold">{currency(p.price)}</span>
                  <span className="text-[11px] text-white/60 line-through">
                    {currency(p.oldPrice)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="container-x mt-20">
      <SectionHeading
        eyebrow="Reviews"
        title="What shoppers say"
        copy="Collected from verified orders across the last six months."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.07}>
            <figure className="card flex h-full flex-col justify-between p-6">
              <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4 dark:border-white/10">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500/10 text-sm font-extrabold text-brand-500">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-sm font-extrabold">{t.name}</span>
                  <span className="block text-xs muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BrandMarquee() {
  const brands = [...new Set(products.map((p) => p.brand))];
  const row = [...brands, ...brands];
  return (
    <section className="mt-20 border-y border-ink-100 bg-white py-8 dark:border-white/10 dark:bg-ink-900/40">
      <p className="container-x text-center text-[11px] font-extrabold uppercase tracking-[0.2em] muted">
        Brands we stock
      </p>
      <div className="mt-6 overflow-hidden mask-fade-r">
        <div className="flex w-max animate-marquee gap-14 px-6">
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="whitespace-nowrap text-xl font-extrabold tracking-tight text-ink-300 transition dark:text-white/25"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
