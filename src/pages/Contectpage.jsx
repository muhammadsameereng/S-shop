import { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineChat,
  HiOutlineArrowRight,
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Developer from "../assets/dev.jpg";
import SmartImage from "../components/ui/SmartImage";
import { Reveal } from "../components/ui/Bits";
import { Breadcrumbs, PageShell } from "../components/layout/Layout";
import Contexts from "../context/Context";
import { cx } from "../lib/utils";

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery lands in 3–5 business days. Express orders placed before 4pm ship the same day and arrive the next business day.",
  },
  {
    q: "What is the return window?",
    a: "You have 30 days from delivery. Returns are free — a prepaid label is included with every order and refunds land within 5 business days of us receiving the parcel.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently deliver to 24 countries. Duties are calculated at checkout so there are no surprises when your parcel arrives.",
  },
  {
    q: "Can I change my order after placing it?",
    a: "Yes, as long as it hasn't shipped. Open the order from your account and choose 'Need help?' within two hours of placing it.",
  },
];

const channels = [
  {
    Icon: HiOutlineMail,
    title: "Email us",
    value: "support@s-shop.com",
    copy: "We reply within a few hours",
  },
  {
    Icon: HiOutlinePhone,
    title: "Call us",
    value: "+92 343 015 9930",
    copy: "Mon–Sun, 9am to 9pm",
  },
  {
    Icon: HiOutlineLocationMarker,
    title: "Visit us",
    value: "Dolmen Tower, Karachi",
    copy: "Floor 9, by appointment",
  },
];

function Contectpage() {
  const { toast } = useContext(Contexts);
  const [open, setOpen] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("A few fields are missing", "Name, email and message are required.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent", "We'll be in touch shortly.");
    }, 1100);
  };

  return (
    <PageShell>
      <div className="container-x pt-8">
        <Breadcrumbs trail={[{ label: "Contact" }]} />
        <div className="mt-4 max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-balance">
            Questions, feedback, or just saying hello
          </h1>
          <p className="mt-2 text-sm muted">
            Pick whichever channel suits you — a real person answers every one.
          </p>
        </div>
      </div>

      <div className="container-x mt-8 grid gap-4 sm:grid-cols-3">
        {channels.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <div className="card flex h-full items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                <c.Icon size={21} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-extrabold">{c.title}</p>
                <p className="mt-0.5 truncate text-sm font-bold text-brand-500">
                  {c.value}
                </p>
                <p className="mt-0.5 text-xs muted">{c.copy}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="container-x mt-12 grid gap-10 pb-20 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="card p-6 sm:p-8">
            <h2 className="text-lg font-extrabold">Send a message</h2>
            <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-extrabold uppercase tracking-wider muted">
                  Name
                </span>
                <input className="field mt-1.5" value={form.name} onChange={set("name")} />
              </label>
              <label className="block">
                <span className="text-xs font-extrabold uppercase tracking-wider muted">
                  Email
                </span>
                <input
                  type="email"
                  className="field mt-1.5"
                  value={form.email}
                  onChange={set("email")}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-extrabold uppercase tracking-wider muted">
                  Subject
                </span>
                <input
                  className="field mt-1.5"
                  value={form.subject}
                  onChange={set("subject")}
                  placeholder="What's this about?"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-extrabold uppercase tracking-wider muted">
                  Message
                </span>
                <textarea
                  rows={5}
                  className="field mt-1.5 resize-none"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us what you need…"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary btn-lg sm:col-span-2"
              >
                {sending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message <HiOutlineArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-lg font-extrabold">Frequently asked</h2>
            <div className="mt-4 space-y-2">
              {faqs.map((f, i) => (
                <div key={f.q} className="card overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={open === i}
                  >
                    <span className="text-sm font-extrabold">{f.q}</span>
                    <span
                      className={cx(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-100 text-sm font-extrabold transition-transform dark:bg-white/10",
                        open === i && "rotate-45"
                      )}
                    >
                      +
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed muted">{f.a}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Developer card */}
        <aside className="lg:col-span-2">
          <div className="card sticky top-32 overflow-hidden">
            <div className="relative h-28 bg-gradient-to-br from-brand-500 to-brand-700">
              <div className="absolute -bottom-10 left-6">
                <SmartImage
                  src={Developer}
                  alt="Muhammad Sameer"
                  className="h-20 w-20 rounded-2xl ring-4 ring-white dark:ring-ink-900"
                />
              </div>
            </div>
            <div className="p-6 pt-14">
              <h3 className="text-lg font-extrabold">Muhammad Sameer</h3>
              <p className="text-sm muted">Full-stack developer · MERN</p>
              <p className="mt-4 text-sm leading-relaxed muted">
                S-Shop is a personal build exploring commerce UX — search, filtering,
                cart state, and a checkout flow that stays out of the way.
              </p>

              <div className="mt-5 space-y-2 text-sm">
                <a
                  href="mailto:muhmmadsameer86@gmail.com"
                  className="flex items-center gap-3 rounded-xl p-2.5 font-semibold transition hover:bg-ink-50 dark:hover:bg-white/5"
                >
                  <HiOutlineMail size={17} className="text-brand-500" />
                  muhmmadsameer86@gmail.com
                </a>
                <a
                  href="tel:+923430159930"
                  className="flex items-center gap-3 rounded-xl p-2.5 font-semibold transition hover:bg-ink-50 dark:hover:bg-white/5"
                >
                  <HiOutlinePhone size={17} className="text-brand-500" />
                  +92 343 015 9930
                </a>
              </div>

              <div className="mt-5 flex gap-2">
                {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                  <button
                    key={i}
                    onClick={() => toast.info("Social link", "Not wired up in this demo.")}
                    aria-label="Social profile"
                    className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 transition hover:border-brand-400 hover:bg-brand-500 hover:text-white dark:border-white/15"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-ink-50 p-4 dark:bg-white/5">
                <HiOutlineChat size={20} className="shrink-0 text-brand-500" />
                <p className="text-xs muted">
                  Average first response time:{" "}
                  <span className="font-extrabold text-ink-900 dark:text-white">
                    under 2 hours
                  </span>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

export default Contectpage;
