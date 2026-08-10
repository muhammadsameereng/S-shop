import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineCamera,
  HiOutlinePencil,
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
  HiOutlineLogout,
  HiOutlineHeart,
} from "react-icons/hi";
import SmartImage from "../components/ui/SmartImage";
import { Badge, EmptyState } from "../components/ui/Bits";
import { Breadcrumbs, PageShell } from "../components/layout/Layout";
import Contexts from "../context/Context";
import { logout, updateProfile } from "../redux/user/userSlices";
import { selectWishlist } from "../redux/wishlist/wishlistSlices";
import { currency, cx } from "../lib/utils";

const tabs = [
  { key: "profile", label: "Profile" },
  { key: "addresses", label: "Addresses" },
  { key: "payments", label: "Payment" },
  { key: "settings", label: "Settings" },
];

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast, theme, toggleTheme } = useContext(Contexts);
  const { user, addresses, paymentMethods, orders } = useSelector((s) => s.user);
  const wishlist = useSelector(selectWishlist);
  const fileRef = useRef(null);

  const [tab, setTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    fullName: user?.fullName ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });

  if (!user) {
    return (
      <PageShell>
        <EmptyState
          icon="🔐"
          title="Sign in to view your profile"
          copy="Your orders, addresses and saved cards live behind a quick sign in."
          action={
            <Link to="/auth" className="btn-primary btn-md">
              Sign in
            </Link>
          }
        />
      </PageShell>
    );
  }

  const pickAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    dispatch(updateProfile({ img: URL.createObjectURL(file) }));
    toast.success("Photo updated", "Looking good.");
  };

  const saveProfile = () => {
    dispatch(updateProfile(draft));
    setEditing(false);
    toast.success("Profile saved");
  };

  const stats = [
    ["Orders", orders.length],
    ["Wishlist", wishlist.length],
    ["Points", user.points?.toLocaleString() ?? 0],
  ];

  return (
    <PageShell>
      <div className="container-x pt-8">
        <Breadcrumbs trail={[{ label: "Profile" }]} />
      </div>

      <div className="container-x mt-4 pb-20">
        {/* Header card */}
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-7 text-white sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand-500/40 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="relative">
              <SmartImage
                src={user.img}
                alt={user.fullName}
                className="h-24 w-24 rounded-2xl ring-4 ring-white/15"
              />
              <button
                onClick={() => fileRef.current?.click()}
                aria-label="Change photo"
                className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-full bg-white text-ink-900 shadow-lift transition hover:bg-brand-500 hover:text-white"
              >
                <HiOutlineCamera size={17} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={pickAvatar}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {user.fullName || user.username}
                </h1>
                <Badge tone="amber">{user.tier}</Badge>
              </div>
              <p className="mt-1 text-sm text-white/70">{user.email}</p>
              <p className="mt-0.5 text-xs text-white/50">
                Member since {user.memberSince}
              </p>
            </div>

            <div className="flex gap-6">
              {stats.map(([label, value]) => (
                <div key={label}>
                  <p className="text-2xl font-extrabold">{value}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 overflow-x-auto border-b border-ink-100 no-scrollbar dark:border-white/10">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cx(
                "relative shrink-0 px-4 py-3 text-sm font-extrabold transition",
                tab === t.key ? "text-brand-500" : "muted hover:text-ink-900 dark:hover:text-white"
              )}
            >
              {t.label}
              {tab === t.key && (
                <motion.span
                  layoutId="profile-tab"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-500"
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {tab === "profile" && (
              <div className="card p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold">Personal details</h2>
                  <button
                    onClick={() => (editing ? saveProfile() : setEditing(true))}
                    className={editing ? "btn-primary btn-sm" : "btn-outline btn-sm"}
                  >
                    {editing ? "Save changes" : (<><HiOutlinePencil size={14} /> Edit</>)}
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["fullName", "Full name"],
                    ["username", "Username"],
                    ["email", "Email"],
                    ["phone", "Phone"],
                  ].map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="text-xs font-extrabold uppercase tracking-wider muted">
                        {label}
                      </span>
                      {editing ? (
                        <input
                          className="field mt-1.5"
                          value={draft[key]}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, [key]: e.target.value }))
                          }
                        />
                      ) : (
                        <p className="mt-1.5 rounded-xl bg-ink-50 px-4 py-3 text-sm font-semibold dark:bg-white/5">
                          {user[key] || "—"}
                        </p>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {tab === "addresses" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {addresses.map((a) => (
                  <div key={a.id} className="card p-5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-extrabold">
                        <HiOutlineLocationMarker size={17} className="text-brand-500" />
                        {a.label}
                      </span>
                      {a.isDefault && <Badge tone="soft">Default</Badge>}
                    </div>
                    <p className="mt-3 text-sm font-bold">{a.name}</p>
                    <p className="text-sm muted">{a.line1}</p>
                    <p className="text-sm muted">{a.line2}</p>
                    <p className="text-sm muted">{a.country}</p>
                    <p className="mt-2 text-xs muted">{a.phone}</p>
                  </div>
                ))}
                <button
                  onClick={() => toast.info("Add address", "Form not part of this demo.")}
                  className="grid min-h-[180px] place-items-center rounded-2xl border-2 border-dashed border-ink-200 text-sm font-bold muted transition hover:border-brand-400 hover:text-brand-500 dark:border-white/15"
                >
                  + Add new address
                </button>
              </div>
            )}

            {tab === "payments" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {paymentMethods.map((p) => (
                  <div
                    key={p.id}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink-900 to-brand-800 p-6 text-white"
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                    <HiOutlineCreditCard size={26} className="opacity-70" />
                    <p className="mt-8 font-mono text-lg tracking-widest">
                      •••• •••• •••• {p.last4}
                    </p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-white/50">
                          Expires
                        </p>
                        <p className="text-sm font-bold">{p.expiry}</p>
                      </div>
                      <p className="text-sm font-extrabold">{p.brand}</p>
                    </div>
                    {p.isDefault && (
                      <span className="absolute right-5 top-5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-extrabold uppercase">
                        Default
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab === "settings" && (
              <div className="card divide-y divide-ink-100 dark:divide-white/10">
                {[
                  ["Dark mode", "Switch the interface theme", theme === "dark", toggleTheme],
                  ["Order updates", "Email me about shipping changes", true, null],
                  ["Product drops", "Notify me about new arrivals", false, null],
                  ["Marketing emails", "Occasional offers and discounts", false, null],
                ].map(([title, copy, on, action]) => (
                  <Toggle key={title} title={title} copy={copy} initial={on} onToggle={action} />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="card p-6">
              <h3 className="text-sm font-extrabold">Recent orders</h3>
              <ul className="mt-4 space-y-3">
                {orders.slice(0, 3).map((o) => (
                  <li key={o.id} className="flex items-center gap-3">
                    <SmartImage
                      src={o.items[0].product.img}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-extrabold">{o.id}</p>
                      <p className="text-[11px] muted">{o.status}</p>
                    </div>
                    <span className="text-xs font-extrabold">{currency(o.total)}</span>
                  </li>
                ))}
              </ul>
              <Link to="/orders" className="btn-outline btn-sm mt-4 w-full">
                View all orders
              </Link>
            </div>

            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-extrabold">
                <HiOutlineHeart size={16} className="text-rose-500" /> Wishlist
              </h3>
              <p className="mt-2 text-xs muted">
                {wishlist.length} saved {wishlist.length === 1 ? "item" : "items"}
              </p>
              <Link to="/wishlist" className="btn-ghost btn-sm mt-3 w-full">
                Open wishlist
              </Link>
            </div>

            <button
              onClick={() => {
                dispatch(logout());
                toast.info("Signed out");
                navigate("/");
              }}
              className="btn-outline btn-md w-full text-rose-500 hover:border-rose-300"
            >
              <HiOutlineLogout size={17} /> Sign out
            </button>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

function Toggle({ title, copy, initial, onToggle }) {
  const [on, setOn] = useState(Boolean(initial));
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div>
        <p className="text-sm font-extrabold">{title}</p>
        <p className="text-xs muted">{copy}</p>
      </div>
      <button
        onClick={() => {
          setOn((v) => !v);
          onToggle?.();
        }}
        role="switch"
        aria-checked={on}
        aria-label={title}
        className={cx(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          on ? "bg-brand-500" : "bg-ink-200 dark:bg-white/15"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={cx(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow",
            on ? "left-[22px]" : "left-0.5"
          )}
        />
      </button>
    </div>
  );
}

export default ProfilePage;
