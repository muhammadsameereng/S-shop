import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaCcVisa, FaCcMastercard, FaPaypal, FaApplePay } from "react-icons/fa";
import { HiOutlineArrowLeft, HiOutlineLockClosed } from "react-icons/hi";
import SmartImage from "../components/ui/SmartImage";
import { EmptyState } from "../components/ui/Bits";
import { PageShell } from "../components/layout/Layout";
import Contexts from "../context/Context";
import { clearCart, selectCartTotals } from "../redux/cart/cartSlices";
import { addOrder } from "../redux/user/userSlices";
import { currency, cx } from "../lib/utils";

const steps = ["Delivery", "Payment", "Review"];

function Field({ label, className, ...rest }) {
  return (
    <label className={cx("block", className)}>
      <span className="text-xs font-extrabold uppercase tracking-wider muted">
        {label}
      </span>
      <input className="field mt-1.5" {...rest} />
    </label>
  );
}

function Checkoutpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useContext(Contexts);
  const totals = useSelector(selectCartTotals);
  const user = useSelector((s) => s.user.user);

  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(null);
  const [payment, setPayment] = useState("card");
  const [form, setForm] = useState({
    email: user?.email ?? "",
    name: user?.fullName ?? "",
    address: "24 Marina Heights, Block 5",
    city: "Karachi",
    zip: "75600",
    country: "Pakistan",
    card: "4242 4242 4242 4242",
    expiry: "08/28",
    cvc: "123",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const orderId = useMemo(
    () => `SSH-${Math.floor(10000 + totals.total * 7).toString().slice(0, 5)}`,
    [totals.total]
  );

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const order = {
        id: orderId,
        placed: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Processing",
        eta: "Arriving in 3–5 days",
        total: Math.round(totals.total),
        items: totals.items.map((l) => ({ product: l.product, quantity: l.quantity })),
        timeline: ["Ordered", "Packed", "Shipped", "Delivered"],
        step: 1,
      };
      dispatch(addOrder(order));
      dispatch(clearCart());
      setPlacing(false);
      setPlaced(order);
      toast.success("Order confirmed", `${order.id} is on its way.`);
    }, 1400);
  };

  if (placed) {
    return (
      <PageShell>
        <div className="container-x grid place-items-center py-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="card w-full max-w-lg p-8 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 16 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white"
            >
              <FaCheck size={26} />
            </motion.span>
            <h1 className="mt-6 text-2xl font-extrabold tracking-tight">
              Thanks, your order is confirmed
            </h1>
            <p className="mt-2 text-sm muted">
              Order <span className="font-extrabold">{placed.id}</span> ·{" "}
              {currency(placed.total)}. A confirmation is on its way to{" "}
              {form.email || "your inbox"}.
            </p>

            <div className="mt-6 space-y-2 rounded-2xl bg-ink-50 p-4 text-left dark:bg-white/5">
              {placed.items.map((i) => (
                <div key={i.product.id} className="flex items-center gap-3">
                  <SmartImage
                    src={i.product.img}
                    alt=""
                    className="h-11 w-11 rounded-lg"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-bold">
                    {i.product.name}
                  </span>
                  <span className="text-xs muted">×{i.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link to="/orders" className="btn-primary btn-md flex-1">
                Track order
              </Link>
              <Link to="/products" className="btn-outline btn-md flex-1">
                Keep shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </PageShell>
    );
  }

  if (totals.items.length === 0) {
    return (
      <PageShell>
        <EmptyState
          icon="🧾"
          title="Nothing to check out"
          copy="Add a product to your bag and come back."
          action={
            <Link to="/products" className="btn-primary btn-md">
              Browse products
            </Link>
          }
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="container-x py-8">
        <button
          onClick={() => (step === 0 ? navigate("/cart") : setStep((s) => s - 1))}
          className="btn-ghost btn-sm -ml-2"
        >
          <HiOutlineArrowLeft size={16} /> {step === 0 ? "Back to bag" : "Back"}
        </button>

        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Stepper */}
            <ol className="flex items-center gap-3">
              {steps.map((label, i) => (
                <li key={label} className="flex flex-1 items-center gap-3">
                  <span
                    className={cx(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold transition",
                      i < step
                        ? "bg-emerald-500 text-white"
                        : i === step
                        ? "bg-brand-500 text-white"
                        : "bg-ink-100 muted dark:bg-white/10"
                    )}
                  >
                    {i < step ? <FaCheck size={11} /> : i + 1}
                  </span>
                  <span
                    className={cx(
                      "text-sm font-extrabold",
                      i === step ? "" : "muted"
                    )}
                  >
                    {label}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="h-px flex-1 bg-ink-200 dark:bg-white/10" />
                  )}
                </li>
              ))}
            </ol>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="card mt-6 p-6 sm:p-8"
              >
                {step === 0 && (
                  <>
                    <h2 className="text-lg font-extrabold">Delivery details</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@email.com"
                      />
                      <Field
                        label="Full name"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Your name"
                      />
                      <Field
                        label="Address"
                        className="sm:col-span-2"
                        value={form.address}
                        onChange={set("address")}
                      />
                      <Field label="City" value={form.city} onChange={set("city")} />
                      <Field label="Postcode" value={form.zip} onChange={set("zip")} />
                      <Field
                        label="Country"
                        className="sm:col-span-2"
                        value={form.country}
                        onChange={set("country")}
                      />
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h2 className="text-lg font-extrabold">Payment method</h2>
                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      {[
                        ["card", "Card", [FaCcVisa, FaCcMastercard]],
                        ["paypal", "PayPal", [FaPaypal]],
                        ["applepay", "Apple Pay", [FaApplePay]],
                      ].map(([key, label, Icons]) => (
                        <button
                          key={key}
                          onClick={() => setPayment(key)}
                          className={cx(
                            "flex items-center justify-between rounded-xl border px-4 py-3.5 transition",
                            payment === key
                              ? "border-brand-500 bg-brand-500/5"
                              : "border-ink-200 hover:border-brand-300 dark:border-white/10"
                          )}
                        >
                          <span className="text-sm font-extrabold">{label}</span>
                          <span className="flex gap-1.5 text-xl muted">
                            {Icons.map((Ic, i) => (
                              <Ic key={i} />
                            ))}
                          </span>
                        </button>
                      ))}
                    </div>

                    {payment === "card" && (
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Card number"
                          className="sm:col-span-2"
                          value={form.card}
                          onChange={set("card")}
                          inputMode="numeric"
                        />
                        <Field label="Expiry" value={form.expiry} onChange={set("expiry")} />
                        <Field label="CVC" value={form.cvc} onChange={set("cvc")} />
                      </div>
                    )}

                    <p className="mt-5 flex items-center gap-2 text-xs muted">
                      <HiOutlineLockClosed size={15} /> Payments are encrypted end to end.
                    </p>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-lg font-extrabold">Review your order</h2>
                    <div className="mt-5 space-y-4">
                      <div className="rounded-2xl bg-ink-50 p-4 dark:bg-white/5">
                        <p className="text-xs font-extrabold uppercase tracking-wider muted">
                          Delivering to
                        </p>
                        <p className="mt-1.5 text-sm font-bold">{form.name}</p>
                        <p className="text-sm muted">
                          {form.address}, {form.city} {form.zip}, {form.country}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-ink-50 p-4 dark:bg-white/5">
                        <p className="text-xs font-extrabold uppercase tracking-wider muted">
                          Paying with
                        </p>
                        <p className="mt-1.5 text-sm font-bold capitalize">
                          {payment === "card"
                            ? `Card ending ${form.card.slice(-4)}`
                            : payment}
                        </p>
                      </div>
                      <ul className="divide-y divide-ink-100 dark:divide-white/10">
                        {totals.items.map((l) => (
                          <li key={l.key} className="flex items-center gap-3 py-3">
                            <SmartImage
                              src={l.product.img}
                              alt=""
                              className="h-14 w-14 rounded-xl"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold">
                                {l.product.name}
                              </p>
                              <p className="text-xs muted">Qty {l.quantity}</p>
                            </div>
                            <span className="text-sm font-extrabold">
                              {currency(l.product.price * l.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <div className="mt-7 flex gap-3">
                  {step < steps.length - 1 ? (
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      className="btn-primary btn-lg w-full"
                    >
                      Continue to {steps[step + 1]}
                    </button>
                  ) : (
                    <button
                      onClick={placeOrder}
                      disabled={placing}
                      className="btn-primary btn-lg w-full"
                    >
                      {placing ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Placing order…
                        </>
                      ) : (
                        <>
                          <HiOutlineLockClosed size={17} /> Pay {currency(totals.total)}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="lg:col-span-1">
            <div className="card sticky top-32 p-6">
              <h2 className="text-lg font-extrabold">Summary</h2>
              <ul className="mt-4 space-y-3">
                {totals.items.map((l) => (
                  <li key={l.key} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <SmartImage src={l.product.img} alt="" className="h-12 w-12 rounded-lg" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-ink-900 px-1 text-[10px] font-extrabold text-white dark:bg-white dark:text-ink-900">
                        {l.quantity}
                      </span>
                    </div>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                      {l.product.name}
                    </span>
                    <span className="text-sm font-extrabold">
                      {currency(l.product.price * l.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm dark:border-white/10">
                <div className="flex justify-between">
                  <span className="muted">Subtotal</span>
                  <span className="font-bold">{currency(totals.subtotal)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount</span>
                    <span className="font-bold">− {currency(totals.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="muted">Delivery</span>
                  <span className="font-bold">
                    {totals.shipping === 0 ? "Free" : currency(totals.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="muted">Tax</span>
                  <span className="font-bold">{currency(totals.tax)}</span>
                </div>
                <div className="flex justify-between border-t border-ink-100 pt-3 dark:border-white/10">
                  <span className="font-extrabold">Total</span>
                  <span className="text-xl font-extrabold">{currency(totals.total)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

export default Checkoutpage;
