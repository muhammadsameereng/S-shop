import { FaStar } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import { brands, categories, priceBounds, products } from "../../data/catalog";
import { currency, cx } from "../../lib/utils";

const countFor = (predicate) => products.filter(predicate).length;

function Group({ title, children }) {
  return (
    <div className="border-b border-ink-100 py-5 last:border-0 dark:border-white/10">
      <h3 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.14em] muted">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Check({ checked, onChange, label, count }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-1.5">
      <span
        className={cx(
          "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border transition",
          checked
            ? "border-brand-500 bg-brand-500 text-white"
            : "border-ink-300 group-hover:border-brand-400 dark:border-white/20"
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-current stroke-2">
            <path d="M2.5 6.2 4.8 8.5 9.5 3.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="flex-1 text-sm font-semibold">{label}</span>
      {count != null && <span className="text-xs muted">{count}</span>}
    </label>
  );
}

function Filters({ value, onChange, onReset }) {
  const toggleIn = (key, item) => {
    const set = new Set(value[key]);
    set.has(item) ? set.delete(item) : set.add(item);
    onChange({ ...value, [key]: [...set] });
  };

  return (
    <div className="text-sm">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-base font-extrabold">Filters</h2>
        <button
          onClick={onReset}
          className="text-xs font-bold text-brand-500 hover:underline"
        >
          Reset all
        </button>
      </div>

      <Group title="Category">
        {categories.map((c) => (
          <Check
            key={c.slug}
            label={c.name}
            count={countFor((p) => p.category === c.slug)}
            checked={value.categories.includes(c.slug)}
            onChange={() => toggleIn("categories", c.slug)}
          />
        ))}
      </Group>

      <Group title={`Max price · ${currency(value.maxPrice)}`}>
        <input
          type="range"
          min={0}
          max={priceBounds.max}
          step={10}
          value={value.maxPrice}
          onChange={(e) => onChange({ ...value, maxPrice: Number(e.target.value) })}
          className="w-full accent-brand-500"
          aria-label="Maximum price"
        />
        <div className="mt-1 flex justify-between text-xs muted">
          <span>{currency(0)}</span>
          <span>{currency(priceBounds.max)}</span>
        </div>
      </Group>

      <Group title="Brand">
        <div className="max-h-52 overflow-y-auto pr-1">
          {brands.map((b) => (
            <Check
              key={b}
              label={b}
              count={countFor((p) => p.brand === b)}
              checked={value.brands.includes(b)}
              onChange={() => toggleIn("brands", b)}
            />
          ))}
        </div>
      </Group>

      <Group title="Customer rating">
        <div className="flex flex-col gap-1.5">
          {[4.5, 4, 3.5].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...value, rating: value.rating === r ? 0 : r })}
              className={cx(
                "flex items-center gap-2 rounded-xl px-3 py-2 transition",
                value.rating === r
                  ? "bg-brand-500/10 text-brand-600 dark:text-brand-300"
                  : "hover:bg-ink-100 dark:hover:bg-white/5"
              )}
            >
              <FaStar className="text-accent-500" size={13} />
              <span className="text-sm font-bold">{r} & up</span>
            </button>
          ))}
        </div>
      </Group>

      <Group title="Availability">
        <Check
          label="In stock only"
          checked={value.inStock}
          onChange={() => onChange({ ...value, inStock: !value.inStock })}
        />
        <Check
          label="On sale"
          checked={value.onSale}
          onChange={() => onChange({ ...value, onSale: !value.onSale })}
        />
        <Check
          label="Free shipping"
          checked={value.freeShipping}
          onChange={() => onChange({ ...value, freeShipping: !value.freeShipping })}
        />
      </Group>
    </div>
  );
}

export function ActiveChips({ value, onChange, onReset }) {
  const chips = [
    ...value.categories.map((c) => ({
      label: categories.find((x) => x.slug === c)?.name ?? c,
      clear: () =>
        onChange({ ...value, categories: value.categories.filter((x) => x !== c) }),
    })),
    ...value.brands.map((b) => ({
      label: b,
      clear: () => onChange({ ...value, brands: value.brands.filter((x) => x !== b) }),
    })),
    value.rating > 0 && {
      label: `${value.rating}★ & up`,
      clear: () => onChange({ ...value, rating: 0 }),
    },
    value.maxPrice < priceBounds.max && {
      label: `Under ${currency(value.maxPrice)}`,
      clear: () => onChange({ ...value, maxPrice: priceBounds.max }),
    },
    value.inStock && {
      label: "In stock",
      clear: () => onChange({ ...value, inStock: false }),
    },
    value.onSale && {
      label: "On sale",
      clear: () => onChange({ ...value, onSale: false }),
    },
    value.freeShipping && {
      label: "Free shipping",
      clear: () => onChange({ ...value, freeShipping: false }),
    },
  ].filter(Boolean);

  if (chips.length === 0) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.label}
          onClick={c.clear}
          className="chip bg-ink-100 hover:border-rose-400 hover:text-rose-500 dark:bg-white/10"
        >
          {c.label} <HiOutlineX size={13} />
        </button>
      ))}
      <button
        onClick={onReset}
        className="text-xs font-bold text-brand-500 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}

export default Filters;
