import { motion } from "framer-motion";
import { cx } from "../../lib/utils";

/* Scroll-triggered reveal used across the marketing sections. */
export function Reveal({ children, delay = 0, y = 18, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, copy, action, className }) {
  return (
    <div
      className={cx(
        "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-500">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl text-balance">
          {title}
        </h2>
        {copy && <p className="mt-2 text-sm muted text-balance">{copy}</p>}
      </div>
      {action}
    </div>
  );
}

export function Badge({ children, tone = "brand", className }) {
  const tones = {
    brand: "bg-brand-500 text-white",
    dark: "bg-ink-900 text-white dark:bg-white dark:text-ink-900",
    amber: "bg-accent-500 text-ink-900",
    rose: "bg-rose-500 text-white",
    emerald: "bg-emerald-500 text-white",
    soft: "bg-ink-100 text-ink-700 dark:bg-white/10 dark:text-ink-100",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({ icon = "🛒", title, copy, action }) {
  return (
    <div className="grid place-items-center px-6 py-20 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-ink-100 text-4xl dark:bg-white/5 animate-floaty">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-extrabold">{title}</h3>
      {copy && <p className="mt-2 max-w-sm text-sm muted">{copy}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-square w-full" />
      <div className="space-y-2.5 p-4">
        <div className="skeleton h-3 w-16 rounded-full" />
        <div className="skeleton h-4 w-3/4 rounded-full" />
        <div className="skeleton h-4 w-1/3 rounded-full" />
      </div>
    </div>
  );
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, size = "md" }) {
  const dims = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  return (
    <div className="inline-flex items-center rounded-full border border-ink-200 dark:border-white/15">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className={cx(
          dims,
          "grid place-items-center rounded-full font-bold transition hover:bg-ink-100 disabled:opacity-30 dark:hover:bg-white/10"
        )}
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-bold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className={cx(
          dims,
          "grid place-items-center rounded-full font-bold transition hover:bg-ink-100 disabled:opacity-30 dark:hover:bg-white/10"
        )}
      >
        +
      </button>
    </div>
  );
}
