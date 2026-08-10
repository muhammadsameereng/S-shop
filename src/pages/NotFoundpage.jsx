import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "../components/layout/Layout";
import { categories } from "../data/catalog";

function NotFoundpage() {
  return (
    <PageShell>
      <div className="container-x grid place-items-center py-24 text-center">
        <motion.p
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="bg-gradient-to-br from-brand-400 to-brand-700 bg-clip-text text-7xl font-extrabold tracking-tighter text-transparent sm:text-9xl"
        >
          404
        </motion.p>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
          This page took a wrong turn
        </h1>
        <p className="mt-2 max-w-md text-sm muted">
          The link may be out of date. Here&apos;s the way back to the good stuff.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary btn-lg">
            Back to home
          </Link>
          <Link to="/products" className="btn-outline btn-lg">
            Browse products
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <Link key={c.slug} to={`/category/${c.slug}`} className="chip hover:border-brand-400">
              <span>{c.icon}</span> {c.name}
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

export default NotFoundpage;
