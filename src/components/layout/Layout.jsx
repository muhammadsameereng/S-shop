import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineChevronUp } from "react-icons/hi";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";
import { cx } from "../../lib/utils";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-ink-900 text-white shadow-lift transition hover:bg-brand-500 dark:bg-white dark:text-ink-900"
        >
          <HiOutlineChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Breadcrumb used by inner pages. */
export function Breadcrumbs({ trail = [] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold muted">
      <Link to="/" className="transition hover:text-brand-500">
        Home
      </Link>
      {trail.map((t, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="opacity-50">/</span>
          {t.to && i < trail.length - 1 ? (
            <Link to={t.to} className="transition hover:text-brand-500">
              {t.label}
            </Link>
          ) : (
            <span className="text-ink-900 dark:text-white">{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageShell({ children, className }) {
  const { pathname } = useLocation();
  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cx("min-h-[60vh]", className)}
    >
      {children}
    </motion.main>
  );
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <CartDrawer />
      <BackToTop />
    </div>
  );
}

export default Layout;
