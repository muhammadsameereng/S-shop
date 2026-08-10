import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/product/ProductCard";
import QuickView from "../components/product/QuickView";
import { Badge, EmptyState, SectionHeading } from "../components/ui/Bits";
import { Breadcrumbs, PageShell } from "../components/layout/Layout";
import { products } from "../data/catalog";
import { currency, cx } from "../lib/utils";

function useCountdown(hours) {
  const [target] = useState(() => Date.now() + hours * 3600 * 1000);
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(target - Date.now(), 0)), 1000);
    return () => clearInterval(t);
  }, [target]);
  const total = Math.floor(left / 1000);
  return [
    [String(Math.floor(total / 3600)).padStart(2, "0"), "hrs"],
    [String(Math.floor((total % 3600) / 60)).padStart(2, "0"), "min"],
    [String(total % 60).padStart(2, "0"), "sec"],
  ];
}

function Dealspage() {
  const clock = useCountdown(8);
  const [quickView, setQuickView] = useState(null);
  const [minDiscount, setMinDiscount] = useState(0);

  const deals = useMemo(
    () =>
      products
        .filter((p) => p.discount >= Math.max(minDiscount, 1))
        .sort((a, b) => b.discount - a.discount),
    [minDiscount]
  );

  const biggest = deals[0];
  const totalSaving = deals.reduce((s, p) => s + (p.oldPrice - p.price), 0);

  return (
    <PageShell>
      <div className="container-x pt-8">
        <Breadcrumbs trail={[{ label: "Deals" }]} />

        <div className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-brand-600 to-brand-800 p-8 text-white sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge tone="amber">Flash sale</Badge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                Up to {biggest ? biggest.discount : 30}% off, today only
              </h1>
              <p className="mt-3 max-w-md text-sm text-white/75">
                {deals.length} products marked down across every department.
                Combined savings of {currency(totalSaving)} on the current lineup.
              </p>
              <div className="mt-6 flex gap-2">
                {clock.map(([v, l]) => (
                  <div
                    key={l}
                    className="w-[72px] rounded-2xl bg-white/15 py-3 text-center backdrop-blur"
                  >
                    <p className="text-2xl font-extrabold tabular-nums">{v}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {biggest && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-auto w-full max-w-sm rounded-3xl bg-white/10 p-5 backdrop-blur ring-1 ring-white/20"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/60">
                  Biggest discount
                </p>
                <Link
                  to={`/product/${biggest.id}`}
                  className="mt-2 block text-xl font-extrabold hover:underline"
                >
                  {biggest.name}
                </Link>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold">
                    {currency(biggest.price)}
                  </span>
                  <span className="text-sm text-white/60 line-through">
                    {currency(biggest.oldPrice)}
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-rose-600">
                    −{biggest.discount}%
                  </span>
                </div>
                <Link
                  to={`/product/${biggest.id}`}
                  className="btn btn-md mt-5 w-full bg-white text-ink-900 hover:bg-white/90"
                >
                  Grab the deal
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="container-x mt-10 pb-20">
        <SectionHeading
          eyebrow="On sale"
          title="Every discounted product"
          action={
            <div className="flex flex-wrap gap-2">
              {[0, 15, 20, 25].map((d) => (
                <button
                  key={d}
                  onClick={() => setMinDiscount(d)}
                  className={cx(
                    "chip",
                    minDiscount === d
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "hover:border-brand-400"
                  )}
                >
                  {d === 0 ? "All deals" : `${d}%+`}
                </button>
              ))}
            </div>
          }
        />

        {deals.length === 0 ? (
          <EmptyState
            icon="🏷️"
            title="No deals at that level right now"
            copy="Try a lower discount threshold."
            action={
              <button onClick={() => setMinDiscount(0)} className="btn-primary btn-md">
                Show all deals
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {deals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickView} />
            ))}
          </div>
        )}
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </PageShell>
  );
}

export default Dealspage;
