import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { cx } from "../../lib/utils";

function Rating({ value = 0, count, size = 12, className, showValue = true }) {
  return (
    <div className={cx("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5 text-accent-500">
        {[1, 2, 3, 4, 5].map((i) => {
          const Icon =
            value >= i ? FaStar : value >= i - 0.5 ? FaStarHalfAlt : FaRegStar;
          return <Icon key={i} size={size} />;
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-ink-700 dark:text-ink-200">
          {value.toFixed(1)}
        </span>
      )}
      {count != null && (
        <span className="text-xs muted">({count.toLocaleString()})</span>
      )}
    </div>
  );
}

export default Rating;
