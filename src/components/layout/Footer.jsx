import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaShippingFast,
} from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import Contexts from "../../context/Context";
import { categories } from "../../data/catalog";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/products" },
      { label: "Deals", to: "/deals" },
      { label: "New arrivals", to: "/products?sort=newest" },
      { label: "Best sellers", to: "/products?sort=popular" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My profile", to: "/profile" },
      { label: "Orders", to: "/orders" },
      { label: "Wishlist", to: "/wishlist" },
      { label: "Cart", to: "/cart" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Shipping & returns", to: "/contact" },
      { label: "Privacy", to: "/contact" },
      { label: "Terms", to: "/contact" },
    ],
  },
];

function Footer() {
  const { toast } = useContext(Contexts);
  const [email, setEmail] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're on the list", "Welcome offer heading to your inbox.");
    setEmail("");
  };

  return (
    <footer className="mt-24 border-t border-ink-100 bg-white dark:border-white/10 dark:bg-ink-950">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-white">
                <FaShippingFast size={19} />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                S<span className="text-brand-500">-</span>Shop
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm muted">
              A curated store for the things you actually use — fast delivery,
              honest pricing and returns that don&apos;t fight back.
            </p>

            <form onSubmit={subscribe} className="mt-6 max-w-sm">
              <label className="text-xs font-extrabold uppercase tracking-wider muted">
                Get 10% off your first order
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="field h-11 flex-1 rounded-full py-0"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="btn-primary grid h-11 w-11 shrink-0 place-items-center rounded-full p-0"
                >
                  <HiOutlineArrowRight size={18} />
                </button>
              </div>
            </form>

            <div className="mt-6 flex gap-2">
              {[FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 transition hover:border-brand-400 hover:bg-brand-500 hover:text-white dark:border-white/15"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-extrabold">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm muted transition hover:text-brand-500"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-sm font-extrabold">Categories</h3>
              <ul className="mt-4 space-y-2.5">
                {categories.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/category/${c.slug}`}
                      className="text-sm muted transition hover:text-brand-500"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-100 dark:border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs muted sm:flex-row">
          <p>© {new Date().getFullYear()} S-Shop. Crafted by Muhammad Sameer.</p>
          <div className="flex items-center gap-4">
            <span>Secure checkout</span>
            <span className="hidden sm:inline">·</span>
            <span>Visa · Mastercard · PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
