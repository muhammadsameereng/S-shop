import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaShippingFast, FaGoogle, FaApple, FaCheck } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineArrowLeft } from "react-icons/hi";
import img from "../assets/design.jpg";
import Contexts from "../context/Context";
import { signIn } from "../redux/user/userSlices";
import { demoAccount } from "../data/account";
import { cx } from "../lib/utils";

const perks = [
  "Track every order in one place",
  "Save products to your wishlist",
  "Faster checkout with saved addresses",
];

function Authentication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useContext(Contexts);
  const loading = useSelector((s) => s.user.loading);

  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const useDemo = () => {
    setValues({
      username: demoAccount.username,
      email: demoAccount.email,
      password: demoAccount.password,
    });
    toast.info("Demo credentials filled", "Hit sign in to continue.");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (mode === "signup" && !values.username.trim()) {
      toast.error("Add a username", "We'll use it on your profile.");
      return;
    }
    if (!values.email.trim() || !values.password) {
      toast.error("Missing details", "Email and password are both required.");
      return;
    }
    await dispatch(signIn(values));
    toast.success(
      mode === "login" ? "Welcome back" : "Account created",
      "You're signed in."
    );
    navigate("/");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-ink-900 lg:block">
        <img
          src={img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700/70 via-ink-950/80 to-ink-950" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="flex w-fit items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500">
              <FaShippingFast size={19} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">S-Shop</span>
          </Link>

          <div>
            <h2 className="max-w-md text-4xl font-extrabold leading-tight tracking-tight text-balance">
              Everything you need, delivered without the hassle.
            </h2>
            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                    <FaCheck size={11} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} S-Shop · Crafted by Muhammad Sameer
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-white px-5 py-12 dark:bg-ink-950">
        <div className="w-full max-w-md">
          <Link to="/" className="btn-ghost btn-sm -ml-2 mb-6">
            <HiOutlineArrowLeft size={16} /> Back to store
          </Link>

          <div className="inline-flex rounded-full bg-ink-100 p-1 dark:bg-white/10">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cx(
                  "relative rounded-full px-5 py-2 text-xs font-extrabold transition",
                  mode === m ? "text-white" : "muted"
                )}
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-pill"
                    className="absolute inset-0 rounded-full bg-brand-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {m === "login" ? "Sign in" : "Create account"}
                </span>
              </button>
            ))}
          </div>

          <h1 className="mt-7 text-3xl font-extrabold tracking-tight">
            {mode === "login" ? "Welcome back" : "Join S-Shop"}
          </h1>
          <p className="mt-1.5 text-sm muted">
            {mode === "login"
              ? "Sign in to pick up where you left off."
              : "Create an account in a few seconds."}
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <AnimatePresence initial={false}>
              {mode === "signup" && (
                <motion.label
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="block overflow-hidden"
                >
                  <span className="text-xs font-extrabold uppercase tracking-wider muted">
                    Username
                  </span>
                  <input
                    className="field mt-1.5"
                    value={values.username}
                    onChange={set("username")}
                    placeholder="How should we call you?"
                    autoComplete="username"
                  />
                </motion.label>
              )}
            </AnimatePresence>

            <label className="block">
              <span className="text-xs font-extrabold uppercase tracking-wider muted">
                Email
              </span>
              <input
                type="email"
                className="field mt-1.5"
                value={values.email}
                onChange={set("email")}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider muted">
                  Password
                </span>
                {mode === "login" && (
                  <span className="text-xs font-bold text-brand-500">Forgot?</span>
                )}
              </span>
              <span className="relative mt-1.5 block">
                <input
                  type={showPass ? "text" : "password"}
                  className="field pr-12"
                  value={values.password}
                  onChange={set("password")}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 muted transition hover:bg-ink-100 dark:hover:bg-white/10"
                >
                  {showPass ? <HiOutlineEyeOff size={17} /> : <HiOutlineEye size={17} />}
                </button>
              </span>
            </label>

            <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </>
              ) : mode === "login" ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </button>

            <button type="button" onClick={useDemo} className="btn-outline btn-md w-full">
              Use demo credentials
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-ink-100 dark:bg-white/10" />
            <span className="text-xs font-bold muted">or continue with</span>
            <span className="h-px flex-1 bg-ink-100 dark:bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              [FaGoogle, "Google"],
              [FaApple, "Apple"],
            ].map(([Icon, label]) => (
              <button
                key={label}
                onClick={() => toast.info(`${label} sign-in`, "Not part of this demo.")}
                className="btn-outline btn-md"
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-xs muted">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
