/**
 * Product imagery is generated as inline SVG rather than fetched.
 * That keeps every card sharp, instant and available offline, and each
 * illustration actually matches the product category.
 */

const glyphs = {
  watch: `
    <rect x="40" y="8" width="20" height="22" rx="5"/>
    <rect x="40" y="70" width="20" height="22" rx="5"/>
    <rect x="28" y="26" width="44" height="48" rx="12"/>
    <rect x="36" y="34" width="28" height="32" rx="7" opacity=".32"/>`,
  battery: `
    <rect x="30" y="14" width="40" height="72" rx="11"/>
    <rect x="38" y="24" width="24" height="7" rx="3.5" opacity=".35"/>
    <path d="M54 38 40 62h8l-3 14 15-24h-9z" opacity=".4"/>`,
  speaker: `
    <rect x="30" y="12" width="40" height="76" rx="13"/>
    <circle cx="50" cy="36" r="9" opacity=".32"/>
    <circle cx="50" cy="64" r="14" opacity=".32"/>`,
  camera: `
    <circle cx="50" cy="44" r="25"/>
    <circle cx="50" cy="44" r="11" opacity=".32"/>
    <rect x="22" y="72" width="56" height="11" rx="5.5"/>`,
  keyboard: `
    <rect x="8" y="32" width="84" height="38" rx="8"/>
    ${Array.from({ length: 6 }, (_, i) => `<rect x="${16 + i * 12}" y="40" width="9" height="8" rx="2" opacity=".33"/>`).join("")}
    ${Array.from({ length: 5 }, (_, i) => `<rect x="${22 + i * 12}" y="51" width="9" height="8" rx="2" opacity=".33"/>`).join("")}`,
  mouse: `
    <path d="M50 10a23 23 0 0 1 23 23v29a23 23 0 0 1-46 0V33A23 23 0 0 1 50 10z"/>
    <rect x="47" y="24" width="6" height="16" rx="3" opacity=".38"/>`,
  tv: `
    <rect x="5" y="18" width="90" height="54" rx="7"/>
    <rect x="12" y="25" width="76" height="40" rx="3" opacity=".3"/>
    <rect x="45" y="72" width="10" height="10"/>
    <rect x="30" y="82" width="40" height="7" rx="3.5"/>`,
  jar: `
    <rect x="29" y="24" width="42" height="11" rx="5"/>
    <path d="M32 37h36v35a11 11 0 0 1-11 11H43a11 11 0 0 1-11-11z"/>
    <rect x="42" y="52" width="16" height="14" rx="3" opacity=".3"/>`,
  lipstick: `
    <path d="M42 46V25a8 8 0 0 1 16 0v21z"/>
    <rect x="37" y="43" width="26" height="8" rx="3" opacity=".45"/>
    <rect x="40" y="51" width="20" height="37" rx="4"/>`,
  perfume: `
    <rect x="44" y="9" width="12" height="10" rx="3"/>
    <rect x="46" y="19" width="8" height="9"/>
    <path d="M32 42a14 14 0 0 1 14-14h8a14 14 0 0 1 14 14v32a10 10 0 0 1-10 10H42a10 10 0 0 1-10-10z"/>
    <rect x="41" y="50" width="18" height="17" rx="3" opacity=".3"/>`,
  jacket: `
    <path d="M36 21 17 32l-5 17 13 4v29a4 4 0 0 0 4 4h42a4 4 0 0 0 4-4V53l13-4-5-17-19-11-14 12z"/>
    <path d="M50 33v53" fill="none" stroke-width="3" opacity=".4"/>`,
  jeans: `
    <path d="M30 16h40l4 31-2 39H58l-6-33-6 33H30l-2-39z"/>
    <path d="M50 18v30" fill="none" stroke-width="3" opacity=".38"/>`,
  wrench: `
    <path d="M71 12a21 21 0 0 0-25 27L17 68a8.5 8.5 0 0 0 12 12l29-29a21 21 0 0 0 27-25L71 40l-11-3-3-11z"/>`,
  toolbox: `
    <rect x="11" y="40" width="78" height="43" rx="9"/>
    <path d="M37 40V29a8 8 0 0 1 8-8h10a8 8 0 0 1 8 8v11" fill="none" stroke-width="6"/>
    <rect x="11" y="55" width="78" height="8" opacity=".28"/>`,
  worklight: `
    <path d="M26 25h48l11 34H15z"/>
    <rect x="19" y="59" width="62" height="11" rx="5"/>
    <rect x="44" y="70" width="12" height="15"/>
    <rect x="31" y="85" width="38" height="7" rx="3.5"/>`,
  bits: `
    ${[26, 45, 64].map((x) => `<rect x="${x}" y="17" width="10" height="47" rx="4"/><path d="M${x} 64h10l-5 17z"/>`).join("")}`,
  laser: `
    <rect x="14" y="33" width="46" height="35" rx="9"/>
    <rect x="21" y="40" width="32" height="15" rx="3" opacity=".32"/>
    <path d="M66 50h28" fill="none" stroke-width="5" stroke-linecap="round" stroke-dasharray="7 6"/>`,
  sneakers: `
    <path d="M8 63c0-4 4-6 8-6h13c4 0 8-2 12-5l16-12c4-3 9-4 13-2l7 3c6 3 10 8 11 15l1 7c0 4-3 6-7 6H14c-4 0-6-2-6-6z"/>
    <path d="M44 45l7 6M52 39l7 6M60 34l6 6" stroke-width="3" stroke-linecap="round" fill="none" opacity=".55"/>
    <rect x="8" y="66" width="82" height="6" rx="3" opacity=".45"/>`,
  electronics: `
    <path d="M22 63V50a28 28 0 0 1 56 0v13" fill="none" stroke-width="8" stroke-linecap="round"/>
    <rect x="10" y="55" width="18" height="30" rx="9"/>
    <rect x="72" y="55" width="18" height="30" rx="9"/>
    <circle cx="19" cy="70" r="4" opacity=".45"/>
    <circle cx="81" cy="70" r="4" opacity=".45"/>`,
  displays: `
    <rect x="10" y="20" width="80" height="52" rx="7"/>
    <rect x="17" y="27" width="66" height="38" rx="3" opacity=".35"/>
    <rect x="44" y="72" width="12" height="10"/>
    <rect x="30" y="82" width="40" height="7" rx="3.5"/>`,
  apparel: `
    <path d="M36 22 20 30l-6 15 13 4v31a4 4 0 0 0 4 4h38a4 4 0 0 0 4-4V49l13-4-6-15-16-8a15 9 0 0 1-28 0z"/>
    <path d="M36 22a15 9 0 0 0 28 0" fill="none" stroke-width="3" opacity=".5"/>`,
  beauty: `
    <rect x="43" y="10" width="14" height="11" rx="3"/>
    <rect x="46" y="21" width="8" height="7" opacity=".7"/>
    <path d="M34 40a12 12 0 0 1 12-12h8a12 12 0 0 1 12 12v38a10 10 0 0 1-10 10H44a10 10 0 0 1-10-10z"/>
    <rect x="42" y="52" width="16" height="16" rx="3" opacity=".35"/>`,
  workshop: `
    <rect x="22" y="31" width="42" height="23" rx="9"/>
    <rect x="64" y="37" width="15" height="11" rx="3"/>
    <rect x="79" y="40" width="13" height="5" rx="2.5"/>
    <path d="M33 54l-4 27a6 6 0 0 0 6 7h12a6 6 0 0 0 6-7l-4-27z"/>
    <rect x="30" y="66" width="24" height="6" opacity=".35"/>`,
};

/* Product names are more specific than categories — a keyboard and a power bank
   are both "electronics" but should never share an illustration. */
const nameRules = [
  [/watch/i, "watch"],
  [/power bank|battery/i, "battery"],
  [/speaker/i, "speaker"],
  [/webcam|camera/i, "camera"],
  [/keyboard/i, "keyboard"],
  [/mouse/i, "mouse"],
  [/tv$|oled|cine/i, "tv"],
  [/monitor|ultrawide|qhd|4k|touch|arm/i, "displays"],
  [/serum|eau|foundation/i, "beauty"],
  [/cream|mask/i, "jar"],
  [/lipstick/i, "lipstick"],
  [/perfume|amber|cedar/i, "perfume"],
  [/jacket|shell|hoodie|fleece/i, "jacket"],
  [/denim|jean/i, "jeans"],
  [/wrench|ratchet/i, "wrench"],
  [/chest|toolbox/i, "toolbox"],
  [/light|lamp/i, "worklight"],
  [/bit set|driver bit/i, "bits"],
  [/laser|measure/i, "laser"],
  [/impact driver|drill/i, "workshop"],
];

const pickGlyph = (category, name = "") => {
  const rule = nameRules.find(([re]) => re.test(name));
  return glyphs[rule?.[1]] ?? glyphs[category] ?? glyphs.electronics;
};

const palettes = {
  sneakers: ["#ff9a3c", "#f4642a", "#7c2d12"],
  electronics: ["#5b8bff", "#3563e9", "#16225c"],
  displays: ["#ff7d8a", "#e8365d", "#5b1224"],
  apparel: ["#94a3c4", "#4a5772", "#1a2032"],
  beauty: ["#f9a8d4", "#e04ba0", "#5b1a45"],
  workshop: ["#ffd166", "#f59e0b", "#6b3d05"],
};

/** Cheap deterministic hash so each product gets a stable variation. */
const hash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
};

/* Rotating the hue per product keeps a category recognisable while giving
   every product its own colourway, so a grid never looks copy-pasted. */
const shiftHue = (hex, deg, lightDelta = 0) => {
  const int = parseInt(hex.slice(1), 16);
  let r = ((int >> 16) & 255) / 255;
  let g = ((int >> 8) & 255) / 255;
  let b = (int & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  h = (h + deg + 360) % 360;
  const l2 = Math.min(Math.max(l + lightDelta, 0.04), 0.96);

  const c = (1 - Math.abs(2 * l2 - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l2 - c / 2;
  const seg = Math.floor(h / 60) % 6;
  const rgb = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ][seg];
  [r, g, b] = rgb.map((v) => Math.round((v + m) * 255));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

/**
 * @param {object} opts
 * @param {string} opts.category  catalogue category slug
 * @param {string} opts.seed      product slug — drives the deterministic variation
 * @param {string} opts.label     short caption rendered in the corner
 * @param {number} opts.variant   0-3, gives each gallery shot a different composition
 */
export function productImage({ category, seed, label = "", variant = 0, name = "" }) {
  const palette = palettes[category] ?? palettes.electronics;
  const glyph = pickGlyph(category, name || seed.replace(/-/g, " "));
  const n = hash(`${seed}-${variant}`);

  const hue = ((hash(seed) % 44) - 22) + variant * 4;
  const [light, mid, deep] = palette.map((c, i) =>
    shiftHue(c, hue, i === 0 ? 0.04 : 0)
  );
  const angle = 25 + (n % 6) * 12 + variant * 9;
  const orbX = 30 + ((n >> 3) % 45);
  const orbY = 22 + ((n >> 6) % 40);
  const rotate = -8 + ((n >> 9) % 17) + variant * 3;
  const scale = [1, 0.86, 1.1, 0.94][variant % 4];
  const flip = variant === 2 ? -1 : 1;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <defs>
    <linearGradient id="bg" gradientTransform="rotate(${angle})">
      <stop offset="0" stop-color="${light}"/>
      <stop offset="0.55" stop-color="${mid}"/>
      <stop offset="1" stop-color="${deep}"/>
    </linearGradient>
    <radialGradient id="orb">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="7" stdDeviation="9" flood-color="#000" flood-opacity="0.28"/>
    </filter>
  </defs>

  <rect width="300" height="300" fill="url(#bg)"/>
  <circle cx="${orbX * 3}" cy="${orbY * 3}" r="130" fill="url(#orb)"/>
  <g opacity="0.13" stroke="#fff" stroke-width="1.4">
    ${Array.from({ length: 7 }, (_, i) => `<line x1="${-40 + i * 52}" y1="300" x2="${60 + i * 52}" y2="0"/>`).join("")}
  </g>
  <circle cx="150" cy="152" r="96" fill="#ffffff" opacity="0.10"/>
  <ellipse cx="150" cy="242" rx="${72 + (n % 20)}" ry="12" fill="#000000" opacity="0.16"/>

  <g filter="url(#soft)" transform="translate(150 152) rotate(${rotate}) scale(${(scale * 1.75 * flip).toFixed(3)} ${(scale * 1.75).toFixed(3)}) translate(-50 -50)">
    <g fill="#ffffff" stroke="#ffffff" fill-opacity="0.94" stroke-opacity="0.94">
      ${glyph}
    </g>
  </g>

  ${
    label
      ? `<text x="22" y="278" font-family="Plus Jakarta Sans, Segoe UI, sans-serif" font-size="13" font-weight="800" letter-spacing="3" fill="#ffffff" fill-opacity="0.6">${label
          .toUpperCase()
          .replace(/[<>&]/g, "")}</text>`
      : ""
  }
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
