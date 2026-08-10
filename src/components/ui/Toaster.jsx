import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import Contexts from "../../context/Context";

const styles = {
  success: {
    Icon: FaCheckCircle,
    ring: "ring-emerald-500/30",
    tint: "text-emerald-500",
    bar: "bg-emerald-500",
  },
  error: {
    Icon: FaExclamationCircle,
    ring: "ring-rose-500/30",
    tint: "text-rose-500",
    bar: "bg-rose-500",
  },
  info: {
    Icon: FaInfoCircle,
    ring: "ring-brand-500/30",
    tint: "text-brand-500",
    bar: "bg-brand-500",
  },
};

function Toaster() {
  const { toasts, dismiss } = useContext(Contexts);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:items-end">
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const { Icon, ring, tint, bar } = styles[t.type] ?? styles.info;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className={`pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-4 pl-5 shadow-lift ring-1 dark:bg-ink-900 ${ring}`}
              role="status"
            >
              <span className={`absolute inset-y-0 left-0 w-1 ${bar}`} />
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 shrink-0 ${tint}`} size={18} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 text-xs muted">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                  className="rounded-lg p-1 muted transition hover:bg-ink-100 dark:hover:bg-white/10"
                >
                  <HiX size={14} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default Toaster;
