import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import QuickView from "../components/product/QuickView";
import SmartImage from "../components/ui/SmartImage";
import { EmptyState } from "../components/ui/Bits";
import { Breadcrumbs, PageShell } from "../components/layout/Layout";
import { categories, products } from "../data/catalog";
import { cx } from "../lib/utils";

const sorts = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
  { key: "rating", label: "Top rated" },
];

function CatagoryPage() {
  const { slug } = useParams();
  const [sort, setSort] = useState("featured");
  const [quickView, setQuickView] = useState(null);

  const category = categories.find((c) => c.slug === slug);

  const list = useMemo(() => {
    const items = products.filter((p) => p.category === slug);
    const by = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    }[sort];
    return by ? [...items].sort(by) : items;
  }, [slug, sort]);

  if (!category) {
    return (
      <PageShell>
        <EmptyState
          icon="🗂️"
          title="Category not found"
          copy="Pick one from the shop instead."
          action={
            <Link to="/products" className="btn-primary btn-md">
              Go to shop
            </Link>
          }
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="container-x pt-8">
        <Breadcrumbs
          trail={[{ label: "Shop", to: "/products" }, { label: category.name }]}
        />

        <div className="relative mt-4 overflow-hidden rounded-3xl">
          <SmartImage
            src={category.image}
            alt={category.name}
            className="h-56 w-full sm:h-72"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/55 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-8 text-white sm:p-12">
            <span
              className="w-fit rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em]"
              style={{ background: category.color }}
            >
              {list.length} products
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {category.icon} {category.name}
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/75">{category.tagline}</p>
          </div>
        </div>
      </div>

      <div className="container-x mt-8 pb-20">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {sorts.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={cx(
                "chip",
                sort === s.key
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "hover:border-brand-400"
              )}
            >
              {s.label}
            </button>
          ))}
          <Link to="/products" className="ml-auto text-xs font-bold text-brand-500 hover:underline">
            Browse all products →
          </Link>
        </div>

        {list.length === 0 ? (
          <EmptyState icon="📦" title="Nothing here yet" copy="Restocking soon." />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickView} />
            ))}
          </div>
        )}
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </PageShell>
  );
}

export default CatagoryPage;
