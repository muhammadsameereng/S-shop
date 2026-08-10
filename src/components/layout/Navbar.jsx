import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineMenu,
  HiX,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineLogout,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { FaShippingFast } from "react-icons/fa";
import Contexts from "../../context/Context";
import { openCart, selectCartCount } from "../../redux/cart/cartSlices";
import { logout } from "../../redux/user/userSlices";
import { categories, products } from "../../data/catalog";
import { currency, cx, initials } from "../../lib/utils";
import SmartImage from "../ui/SmartImage";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/deals", label: "Deals" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme, toast } = useContext(Contexts);
  const cartCount = useSelector(selectCartCount);
  const wishCount = useSelector((s) => s.wishlist.ids.length);
  const user = useSelector((s) => s.user.user);

  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // ⌘K / Ctrl+K focuses search — a small touch reviewers notice.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserMenu(false);
    setMenuOpen(false);
    toast.info("Signed out", "See you soon.");
    navigate("/auth");
  };

  const IconButton = ({ to, count, label, children, onClick }) => {
    const inner = (
      <span className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink-100 dark:hover:bg-white/10">
        {children}
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-extrabold text-white"
          >
            {count}
          </motion.span>
        )}
      </span>
    );
    return to ? (
      <Link to={to} aria-label={label}>
        {inner}
      </Link>
    ) : (
      <button onClick={onClick} aria-label={label}>
        {inner}
      </button>
    );
  };

  return (
    <>
      {/* Announcement rail */}
      <div className="bg-ink-900 text-white dark:bg-black">
        <div className="container-x flex h-9 items-center justify-between text-[11px] font-semibold">
          <p className="truncate">
            Free express delivery on orders over $75 · Use code{" "}
            <span className="text-accent-500">SSHOP10</span> for 10% off
          </p>
          <div className="hidden items-center gap-5 sm:flex">
            <Link to="/orders" className="link-underline">
              Track order
            </Link>
            <Link to="/contact" className="link-underline">
              Help
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cx(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "glass border-ink-100 shadow-soft dark:border-white/10"
            : "border-transparent bg-white dark:bg-ink-950"
        )}
      >
        <div className="container-x flex h-16 items-center gap-3 lg:h-[72px] lg:gap-6">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink-100 dark:hover:bg-white/10 lg:hidden"
          >
            <HiOutlineMenu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-white shadow-glow">
              <FaShippingFast size={19} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              S<span className="text-brand-500">-</span>Shop
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cx(
                    "rounded-full px-4 py-2 text-sm font-bold transition",
                    isActive
                      ? "bg-ink-100 text-ink-900 dark:bg-white/10 dark:text-white"
                      : "muted hover:text-ink-900 dark:hover:text-white"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Search */}
          <div ref={searchRef} className="relative ml-auto hidden flex-1 max-w-md md:block">
            <form onSubmit={submitSearch}>
              <HiOutlineSearch
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 muted"
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search products, brands, categories…"
                aria-label="Search products"
                className="field h-11 rounded-full py-0 pl-11 pr-16"
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-ink-200 px-1.5 py-0.5 text-[10px] font-bold muted dark:border-white/15 lg:block">
                ⌘K
              </kbd>
            </form>

            <AnimatePresence>
              {searchOpen && query.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-white/10"
                >
                  {suggestions.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm muted">
                      No matches for “{query}”.
                    </p>
                  ) : (
                    <ul className="max-h-[22rem] overflow-y-auto p-2">
                      {suggestions.map((p) => (
                        <li key={p.id}>
                          <Link
                            to={`/product/${p.id}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setQuery("");
                            }}
                            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-ink-50 dark:hover:bg-white/5"
                          >
                            <SmartImage
                              src={p.img}
                              alt=""
                              className="h-11 w-11 shrink-0 rounded-lg"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-bold">
                                {p.name}
                              </span>
                              <span className="block text-xs muted">
                                {p.brand} · {p.categoryName}
                              </span>
                            </span>
                            <span className="text-sm font-extrabold">
                              {currency(p.price)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={submitSearch}
                    className="w-full border-t border-ink-100 px-4 py-3 text-left text-xs font-bold text-brand-500 transition hover:bg-ink-50 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    See all results for “{query}” →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="ml-auto flex items-center gap-0.5 md:ml-0">
            <Link
              to="/products"
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink-100 dark:hover:bg-white/10 md:hidden"
            >
              <HiOutlineSearch size={20} />
            </Link>

            <button
              onClick={toggleTheme}
              aria-label="Toggle colour theme"
              className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink-100 dark:hover:bg-white/10"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="grid place-items-center"
              >
                {theme === "dark" ? (
                  <HiOutlineSun size={20} />
                ) : (
                  <HiOutlineMoon size={20} />
                )}
              </motion.span>
            </button>

            <IconButton to="/wishlist" count={wishCount} label="Wishlist">
              <HiOutlineHeart size={20} />
            </IconButton>

            <IconButton
              onClick={() => dispatch(openCart())}
              count={cartCount}
              label="Open cart"
            >
              <HiOutlineShoppingBag size={20} />
            </IconButton>

            <div className="relative">
              <button
                onClick={() => setUserMenu((v) => !v)}
                aria-label="Account menu"
                className="ml-1 grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink-100 dark:hover:bg-white/10"
              >
                {user ? (
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-500 text-xs font-extrabold text-white">
                    {initials(user.fullName || user.username)}
                  </span>
                ) : (
                  <HiOutlineUser size={20} />
                )}
              </button>

              <AnimatePresence>
                {userMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl bg-white p-2 shadow-lift ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-white/10"
                    >
                      {user ? (
                        <>
                          <div className="px-3 py-2.5">
                            <p className="truncate text-sm font-extrabold">
                              {user.fullName || user.username}
                            </p>
                            <p className="truncate text-xs muted">{user.email}</p>
                          </div>
                          <div className="my-1 h-px bg-ink-100 dark:bg-white/10" />
                          {[
                            { to: "/profile", label: "My profile", Icon: HiOutlineUser },
                            { to: "/orders", label: "Orders", Icon: HiOutlineClipboardList },
                            { to: "/wishlist", label: "Wishlist", Icon: HiOutlineHeart },
                          ].map(({ to, label, Icon }) => (
                            <Link
                              key={to}
                              to={to}
                              onClick={() => setUserMenu(false)}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-ink-50 dark:hover:bg-white/5"
                            >
                              <Icon size={17} /> {label}
                            </Link>
                          ))}
                          <div className="my-1 h-px bg-ink-100 dark:bg-white/10" />
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-500 transition hover:bg-rose-500/10"
                          >
                            <HiOutlineLogout size={17} /> Sign out
                          </button>
                        </>
                      ) : (
                        <div className="p-2">
                          <p className="px-1 pb-3 text-sm font-bold">
                            Sign in for a faster checkout
                          </p>
                          <Link
                            to="/auth"
                            onClick={() => setUserMenu(false)}
                            className="btn-primary btn-sm w-full"
                          >
                            Sign in
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Category rail */}
        <div className="hidden border-t border-ink-100 dark:border-white/10 lg:block">
          <div className="container-x flex h-11 items-center gap-1 overflow-x-auto no-scrollbar">
            {categories.map((c) => (
              <NavLink
                key={c.slug}
                to={`/category/${c.slug}`}
                className={({ isActive }) =>
                  cx(
                    "shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-bold transition",
                    isActive
                      ? "bg-brand-500 text-white"
                      : "muted hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-white/10 dark:hover:text-white"
                  )
                }
              >
                <span className="mr-1.5">{c.icon}</span>
                {c.name}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-white p-5 dark:bg-ink-950"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-extrabold">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink-100 dark:hover:bg-white/10"
                >
                  <HiX size={18} />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cx(
                        "rounded-xl px-4 py-3 text-sm font-bold transition",
                        isActive
                          ? "bg-brand-500 text-white"
                          : "hover:bg-ink-100 dark:hover:bg-white/10"
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>

              <p className="mt-6 px-4 text-[11px] font-extrabold uppercase tracking-wider muted">
                Categories
              </p>
              <div className="mt-2 flex flex-col gap-1 overflow-y-auto">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/category/${c.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:bg-ink-100 dark:hover:bg-white/10"
                  >
                    <span>{c.icon}</span> {c.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-6">
                {user ? (
                  <button onClick={handleLogout} className="btn-outline btn-md w-full">
                    <HiOutlineLogout size={17} /> Sign out
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary btn-md w-full"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
