import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import SmartImage from "../components/ui/SmartImage";
import { Badge, EmptyState } from "../components/ui/Bits";
import { Breadcrumbs, PageShell } from "../components/layout/Layout";
import { currency, cx } from "../lib/utils";

const statusTone = {
  Delivered: "emerald",
  "In transit": "brand",
  Processing: "amber",
};

function Orderspage() {
  const orders = useSelector((s) => s.user.orders);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Processing", "In transit", "Delivered"];
  const list = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <PageShell>
      <div className="container-x pt-8">
        <Breadcrumbs trail={[{ label: "Orders" }]} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your orders
        </h1>
        <p className="mt-1.5 text-sm muted">
          Track deliveries and revisit past purchases.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cx(
                "chip",
                filter === f
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "hover:border-brand-400"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="container-x mt-8 space-y-4 pb-20">
        {list.length === 0 ? (
          <EmptyState
            icon="📦"
            title={`No ${filter.toLowerCase()} orders`}
            copy="When you place an order it'll show up here with live tracking."
            action={
              <Link to="/products" className="btn-primary btn-md">
                Start shopping
              </Link>
            }
          />
        ) : (
          list.map((o, idx) => (
            <motion.article
              key={o.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="card overflow-hidden"
            >
              <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-100 p-5 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-base font-extrabold">{o.id}</h2>
                    <Badge tone={statusTone[o.status] ?? "soft"}>{o.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs muted">
                    Placed {o.placed} · {o.eta}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs muted">Order total</p>
                  <p className="text-lg font-extrabold">{currency(o.total)}</p>
                </div>
              </header>

              <div className="p-5">
                {/* Tracking rail */}
                <ol className="flex items-center">
                  {o.timeline.map((label, i) => {
                    const done = i < o.step;
                    const current = i === o.step - 1;
                    return (
                      <li key={label} className="flex flex-1 items-center last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                          <span
                            className={cx(
                              "grid h-7 w-7 place-items-center rounded-full text-[10px] font-extrabold transition",
                              done
                                ? "bg-brand-500 text-white"
                                : "bg-ink-100 muted dark:bg-white/10",
                              current && "ring-4 ring-brand-500/20"
                            )}
                          >
                            {done ? <FaCheck size={10} /> : i + 1}
                          </span>
                          <span
                            className={cx(
                              "whitespace-nowrap text-[10px] font-bold",
                              done ? "" : "muted"
                            )}
                          >
                            {label}
                          </span>
                        </div>
                        {i < o.timeline.length - 1 && (
                          <span className="mx-2 mb-5 h-0.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                            <motion.span
                              initial={{ width: 0 }}
                              animate={{ width: i < o.step - 1 ? "100%" : "0%" }}
                              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                              className="block h-full bg-brand-500"
                            />
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>

                <ul className="mt-6 divide-y divide-ink-100 dark:divide-white/10">
                  {o.items.map((line) => (
                    <li key={line.product.id} className="flex items-center gap-4 py-3">
                      <Link to={`/product/${line.product.id}`} className="shrink-0">
                        <SmartImage
                          src={line.product.img}
                          alt=""
                          className="h-14 w-14 rounded-xl bg-ink-100 dark:bg-white/5"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/product/${line.product.id}`}
                          className="line-clamp-1 text-sm font-extrabold hover:text-brand-500"
                        >
                          {line.product.name}
                        </Link>
                        <p className="text-xs muted">
                          {line.product.brand} · Qty {line.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-extrabold">
                        {currency(line.product.price * line.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to={`/product/${o.items[0].product.id}`}
                    className="btn-outline btn-sm"
                  >
                    Buy again <HiOutlineArrowRight size={14} />
                  </Link>
                  <Link to="/contact" className="btn-ghost btn-sm">
                    Need help?
                  </Link>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </PageShell>
  );
}

export default Orderspage;
