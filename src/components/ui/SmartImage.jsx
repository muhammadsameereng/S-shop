import { useState } from "react";
import { cx } from "../../lib/utils";

/**
 * Image with a shimmer placeholder while loading and a graceful
 * gradient fallback if the source never resolves.
 */
function SmartImage({ src, alt = "", className, imgClassName, ...rest }) {
  const [status, setStatus] = useState("loading");

  return (
    <div className={cx("relative overflow-hidden", className)}>
      {status === "loading" && <div className="absolute inset-0 skeleton" />}
      {status === "error" ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-100 to-ink-200 dark:from-white/5 dark:to-white/10">
          <span className="text-2xl opacity-40">🛍️</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className={cx(
            "h-full w-full object-cover transition-opacity duration-500",
            status === "ready" ? "opacity-100" : "opacity-0",
            imgClassName
          )}
          {...rest}
        />
      )}
    </div>
  );
}

export default SmartImage;
