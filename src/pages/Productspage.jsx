import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineAdjustments,
  HiOutlineSearch,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiX,
} from "react-icons/hi";
import ProductCard from "../components/product/ProductCard";
import QuickView from "../components/product/QuickView";
import Filters, { ActiveChips } from "../components/product/Filters";
import { EmptyState, ProductCardSkeleton } from "../components/ui/Bits";
import { Breadcrumbs, PageShell } from "../components/layout/Layout";
import { priceBounds, products } from "../data/catalog";
import { cx } from "../lib/utils";

const sorts = [
  { key: "featured", label: "Featured" },
  { key: "popular", label: "Most popular" },
  { key: "newest", label: "Newest first" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Highest rated" },
];

const emptyFilters = {
  categories: [],
  brands: [],
  maxPrice: priceBounds.max,
  rating: 0,
  inStock: false,
  onSale: false,
  freeShipping: false,
};

const PAGE_SIZE = 10;

function Productspage() {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...emptyFilters,
    categories: params.get("category") ? [params.get("category")] : [],
    onSale: params.get("sale") === "1",
  });
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState(params.get("sort") ?? "featured");
  const [view, setView] = useState("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);

  // Keep the URL shareable — filters live in the address bar.
  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set("q", query.trim());
    if (sort !== "featured") next.set("sort", sort);
    if (filters.categories.length === 1) next.set("category", filters.categories[0]);
    if (filters.onSale) next.set("sale", "1");
    setParams(next, { replace: true });
  }, [query, sort, filters, setParams]);

  // Brief skeleton pass whenever the result set changes.
  useEffect(() => {
    setLoading(true);
    setVisible(PAGE_SIZE);
    const t = setTimeout(() => setLoading(false), 320);
    return () => clearTimeout(t);
  }, [query, sort, filters]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (q && ![p.name, p.brand, p.categoryName, p.description].join(" ").toLowerCase().includes(q))
        return false;
      if (filters.categories.length && !filters.categories.includes(p.category))
        return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.rating && p.rating < filters.rating) return false;
      if (filters.inStock && p.stock <= 0) return false;
      if (filters.onSale && p.discount <= 0) return false;
      if (filters.freeShipping && !p.freeShipping) return false;
      return true;
    });

    const by = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      popular: (a, b) => b.popularity - a.popularity,
      newest: (a, b) => a.addedDaysAgo - b.addedDaysAgo,
    }[sort];
    if (by) list = [...list].sort(by);
    return list;
  }, [query, sort, filters]);

  const shown = results.slice(0, visible);

  return (
    <PageShell>
      <div className="container-x pt-8">
        <Breadcrumbs trail={[{ label: "Shop" }]} />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              All products
            </h1>
            <p className="mt-1.5 text-sm muted">
              {results.length} {results.length === 1 ? "product" : "products"}
              {query.trim() && (
                <>
                  {" "}
                  matching “<span className="font-bold">{query.trim()}</span>”
                </>
              )}
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <HiOutlineSearch
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search this catalogue…"
              className="field h-11 rounded-full py-0 pl-11 pr-10"
              aria-label="Search products"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 muted hover:bg-ink-100 dark:hover:bg-white/10"
              >
                <HiX size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-x mt-8 flex gap-8 pb-20">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32">
            <Filters
              value={filters}
              onChange={setFilters}
              onReset={() => setFilters(emptyFilters)}
            />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center gap-3">
            <button
              onClick={() => setSheetOpen(true)}
              className="btn-outline btn-sm lg:hidden"
            >
              <HiOutlineAdjustments size={16} /> Filters
            </button>

            <div className="ml-auto flex items-center gap-2">
              <label className="hidden text-xs font-bold muted sm:block">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
                className="field h-10 w-auto rounded-full py-0 pr-8 text-xs font-bold"
              >
                {sorts.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>

              <div className="hidden rounded-full border border-ink-200 p-1 dark:border-white/15 sm:flex">
                {[
                  ["grid", HiOutlineViewGrid],
                  ["list", HiOutlineViewList],
                ].map(([key, Icon]) => (
                  <button
                    key={key}
                    onClick={() => setView(key)}
                    aria-label={`${key} view`}
                    className={cx(
                      "grid h-8 w-8 place-items-center rounded-full transition",
                      view === key
                        ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900"
                        : "muted hover:bg-ink-100 dark:hover:bg-white/10"
                    )}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ActiveChips
            value={filters}
            onChange={setFilters}
            onReset={() => setFilters(emptyFilters)}
          />

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Nothing matched those filters"
              copy="Try widening the price range or clearing a filter or two."
              action={
                <button
                  onClick={() => {
                    setFilters(emptyFilters);
                    setQuery("");
                  }}
                  className="btn-primary btn-md"
                >
                  Reset everything
                </button>
              }
            />
          ) : (
            <>
              <div
                className={cx(
                  view === "grid"
                    ? "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
                    : "flex flex-col gap-3"
                )}
              >
                {shown.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    index={i}
                    view={view}
                    onQuickView={setQuickView}
                  />
                ))}
              </div>

              {visible < results.length && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <p className="text-xs muted">
                    Showing {shown.length} of {results.length}
                  </p>
                  <div className="h-1 w-48 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all duration-500"
                      style={{ width: `${(shown.length / results.length) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="btn-outline btn-md mt-1"
                  >
                    Load more products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <div className="fixed inset-0 z-[85] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 dark:bg-ink-950"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink-200 dark:bg-white/20" />
              <Filters
                value={filters}
                onChange={setFilters}
                onReset={() => setFilters(emptyFilters)}
              />
              <button
                onClick={() => setSheetOpen(false)}
                className="btn-primary btn-lg sticky bottom-0 mt-4 w-full"
              >
                Show {results.length} results
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </PageShell>
  );
}

export default Productspage;
