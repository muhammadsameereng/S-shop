import shoes from "../assets/shoes.jpg";
import tools from "../assets/tools.jpg";
import cosmetics from "../assets/cosmatics.jpg";
import clothes from "../assets/clothes.jpg";
import mobileItems from "../assets/mobileitems.jpg";
import electronics from "../assets/electronic.jpg";
import { productImage } from "../lib/productImage";

/* ------------------------------------------------------------------ *
 * Catalog
 * ------------------------------------------------------------------ */

export const categories = [
  {
    slug: "sneakers",
    name: "Sneakers",
    tagline: "Everyday runners & court classics",
    image: shoes,
    color: "#ff7900",
    icon: "👟",
  },
  {
    slug: "electronics",
    name: "Electronics",
    tagline: "Audio, wearables & smart gear",
    image: electronics,
    color: "#3563e9",
    icon: "🎧",
  },
  {
    slug: "displays",
    name: "TV & Displays",
    tagline: "Monitors and panels that pop",
    image: mobileItems,
    color: "#ff5757",
    icon: "🖥️",
  },
  {
    slug: "apparel",
    name: "Apparel",
    tagline: "Layers built for daily wear",
    image: clothes,
    color: "#0e1116",
    icon: "🧥",
  },
  {
    slug: "beauty",
    name: "Beauty",
    tagline: "Skin, scent and self-care",
    image: cosmetics,
    color: "#e83e8c",
    icon: "💄",
  },
  {
    slug: "workshop",
    name: "Workshop",
    tagline: "Tools that outlive the job",
    image: tools,
    color: "#ffb703",
    icon: "🛠️",
  },
];

const shot = (category, seed, label, variant, name) =>
  productImage({ category, seed, label, variant, name });

/**
 * Compact source rows keep the catalog readable:
 * [name, brand, category, price, oldPrice, rating, reviews, stock, badge]
 */
const rows = [
  // Sneakers
  ["Aero Runner 2", "Volt", "sneakers", 129, 169, 4.8, 412, 18, "Best seller"],
  ["Court Classic 70", "Volt", "sneakers", 89, 0, 4.6, 233, 34, ""],
  ["Trail Grip GTX", "Northpeak", "sneakers", 159, 199, 4.7, 148, 9, "Low stock"],
  ["Cloudstep Knit", "Aria", "sneakers", 112, 0, 4.5, 96, 41, ""],
  ["Retro Leather 88", "Volt", "sneakers", 99, 139, 4.4, 310, 25, "Deal"],
  ["Studio Trainer", "Aria", "sneakers", 74, 0, 4.2, 61, 52, ""],
  ["Bolt Racer Pro", "Northpeak", "sneakers", 189, 229, 4.9, 507, 6, "Editor's pick"],
  // Electronics
  ["Halo Buds Pro", "Soniq", "electronics", 149, 199, 4.8, 1284, 63, "Best seller"],
  ["Studio Over-Ear 900", "Soniq", "electronics", 279, 329, 4.7, 642, 14, ""],
  ["Pulse Fit Watch", "Kinetic", "electronics", 199, 0, 4.5, 388, 27, "New"],
  ["Nomad Power Bank 20K", "Voltcore", "electronics", 59, 79, 4.6, 921, 120, "Deal"],
  ["Beam Bluetooth Speaker", "Soniq", "electronics", 89, 0, 4.4, 274, 48, ""],
  ["Aperture 4K Webcam", "Lumen", "electronics", 129, 159, 4.3, 156, 22, ""],
  ["Mecha Keyboard 75", "Kinetic", "electronics", 139, 0, 4.8, 733, 31, "Editor's pick"],
  ["Glide Wireless Mouse", "Kinetic", "electronics", 49, 69, 4.5, 502, 88, ""],
  // Displays
  ["Vista 27\" QHD Monitor", "Lumen", "displays", 329, 399, 4.7, 219, 12, "Best seller"],
  ["Vista 32\" 4K Creator", "Lumen", "displays", 649, 749, 4.8, 143, 5, "Low stock"],
  ["Arc 34\" Ultrawide", "Lumen", "displays", 799, 0, 4.6, 88, 7, ""],
  ["Cine 55\" OLED TV", "Northstar", "displays", 1199, 1499, 4.9, 312, 4, "Editor's pick"],
  ["Portable 15\" Touch", "Lumen", "displays", 249, 0, 4.2, 64, 30, "New"],
  ["Studio Monitor Arm", "Kinetic", "displays", 89, 109, 4.5, 176, 55, ""],
  // Apparel
  ["Everyday Oxford Shirt", "Meridian", "apparel", 68, 0, 4.4, 128, 60, ""],
  ["Quilted Field Jacket", "Meridian", "apparel", 189, 249, 4.7, 203, 11, "Deal"],
  ["Merino Crew Knit", "Loom", "apparel", 94, 0, 4.6, 177, 38, ""],
  ["Tech Fleece Hoodie", "Volt", "apparel", 110, 135, 4.5, 421, 44, "Best seller"],
  ["Tapered Denim 401", "Loom", "apparel", 82, 0, 4.3, 265, 72, ""],
  ["Rain Shell Lite", "Northpeak", "apparel", 145, 179, 4.6, 91, 16, ""],
  ["Linen Camp Shirt", "Meridian", "apparel", 59, 0, 4.1, 74, 84, "New"],
  // Beauty
  ["Glow Serum Vitamin C", "Aurelia", "beauty", 42, 55, 4.7, 1560, 210, "Best seller"],
  ["Hydra Cream Rich", "Aurelia", "beauty", 38, 0, 4.6, 842, 145, ""],
  ["Velvet Matte Lipstick", "Rouge", "beauty", 24, 0, 4.4, 610, 260, ""],
  ["Cedar & Amber Eau", "Maison N", "beauty", 96, 120, 4.8, 288, 19, "Editor's pick"],
  ["Clay Detox Mask", "Aurelia", "beauty", 29, 36, 4.3, 355, 132, "Deal"],
  ["Silk Finish Foundation", "Rouge", "beauty", 44, 0, 4.5, 498, 97, ""],
  // Workshop
  ["Impact Driver 18V", "Forge", "workshop", 179, 219, 4.8, 264, 21, "Best seller"],
  ["Precision Bit Set 62", "Forge", "workshop", 49, 0, 4.7, 733, 180, ""],
  ["Laser Measure 40m", "Trueline", "workshop", 119, 149, 4.6, 141, 26, "Deal"],
  ["Modular Tool Chest", "Forge", "workshop", 289, 0, 4.5, 87, 8, "Low stock"],
  ["Ratchet Wrench Set", "Trueline", "workshop", 89, 109, 4.4, 198, 63, ""],
  ["Work Light 5000lm", "Trueline", "workshop", 69, 0, 4.3, 112, 74, ""],
];

const copyByCategory = {
  sneakers: {
    description:
      "Built on a responsive foam midsole with a breathable engineered upper, this pair keeps its shape through daily miles and looks just as good off the track.",
    highlights: [
      "Responsive foam midsole with 8mm drop",
      "Breathable engineered mesh upper",
      "Grippy rubber outsole, 500km rated",
      "Recycled laces and lining",
    ],
    specs: {
      Upper: "Engineered mesh",
      Midsole: "Responsive EVA foam",
      Outsole: "Abrasion-rated rubber",
      Weight: "268 g (UK 8)",
      Fit: "True to size",
    },
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
  },
  electronics: {
    description:
      "Tuned by an in-house audio team and packed with everyday battery life, it pairs in seconds and remembers every device you use it with.",
    highlights: [
      "Up to 32 hours of total battery",
      "Adaptive noise cancelling",
      "Multipoint pairing across two devices",
      "USB-C fast charge — 10 min for 3 hours",
    ],
    specs: {
      Connectivity: "Bluetooth 5.3",
      Battery: "32 h with case",
      Charging: "USB-C + wireless",
      Water: "IPX4 splash resistant",
      Warranty: "2 years",
    },
    sizes: [],
  },
  displays: {
    description:
      "A factory-calibrated panel with slim bezels and a stand that actually moves, so colour-critical work and late-night gaming both land right.",
    highlights: [
      "Factory calibrated, ΔE < 2",
      "99% sRGB / 95% DCI-P3 coverage",
      "Height, tilt and pivot adjustable",
      "USB-C with 90W passthrough",
    ],
    specs: {
      Panel: "IPS, 10-bit",
      "Refresh rate": "144 Hz",
      Response: "1 ms MPRT",
      Ports: "USB-C, 2× HDMI 2.1, DP 1.4",
      Warranty: "3 years",
    },
    sizes: [],
  },
  apparel: {
    description:
      "Cut from a mid-weight fabric that softens with every wash, with reinforced seams where daily wear usually gives out first.",
    highlights: [
      "Mid-weight, pre-shrunk fabric",
      "Reinforced shoulder and side seams",
      "Relaxed modern fit",
      "Machine washable, cold",
    ],
    specs: {
      Fabric: "Cotton blend, 280 gsm",
      Fit: "Relaxed",
      Care: "Machine wash cold",
      Origin: "Ethically made in Portugal",
      Season: "All year",
    },
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  beauty: {
    description:
      "A dermatologist-tested formula that layers cleanly under everything else in your routine — no pilling, no heavy finish.",
    highlights: [
      "Dermatologist tested, fragrance-free",
      "Suitable for sensitive skin",
      "Layers under SPF and makeup",
      "Recyclable glass packaging",
    ],
    specs: {
      Volume: "30 ml",
      "Key actives": "Vitamin C 15%, Ferulic acid",
      "Skin type": "All, incl. sensitive",
      "Use": "AM and PM",
      Cruelty: "Never tested on animals",
    },
    sizes: ["30 ml", "50 ml"],
  },
  workshop: {
    description:
      "Job-site grade with a brushless motor and a housing that shrugs off drops, backed by a battery platform you can build on.",
    highlights: [
      "Brushless motor, 180 Nm torque",
      "3-speed selector with precision mode",
      "Drop tested to 3 m",
      "Works with the whole 18V platform",
    ],
    specs: {
      Motor: "Brushless",
      Torque: "180 Nm",
      Battery: "18V 4.0Ah (included)",
      Chuck: "1/4\" hex quick release",
      Warranty: "5 years",
    },
    sizes: [],
  },
};

const colorways = [
  { name: "Midnight", hex: "#141821" },
  { name: "Fog", hex: "#d8dce4" },
  { name: "Cobalt", hex: "#3563e9" },
  { name: "Clay", hex: "#c96f4a" },
  { name: "Moss", hex: "#4b6b52" },
];

const reviewerPool = [
  ["Amara O.", "Exceeded what I expected at this price. Shipping was quick and packaging was spotless."],
  ["Daniel R.", "Second one I've bought. Holds up well after a few months of daily use."],
  ["Priya S.", "Looks even better in person. Took one star off only because I sized up unnecessarily."],
  ["Marco L.", "Solid build quality. Support answered my question within a couple of hours."],
  ["Hana K.", "Exactly as described. Would happily recommend it to a friend."],
  ["Tom B.", "Great value. Minor learning curve at the start but nothing serious."],
];

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const products = rows.map(
  (
    [name, brand, category, price, oldPrice, rating, reviews, stock, badge],
    i
  ) => {
    const copy = copyByCategory[category];
    const seed = slugify(name);
    const id = `p-${String(i + 1).padStart(3, "0")}`;
    return {
      id,
      slug: seed,
      name,
      brand,
      category,
      categoryName: categories.find((c) => c.slug === category)?.name ?? category,
      price,
      oldPrice: oldPrice || null,
      discount: oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0,
      rating,
      reviews,
      stock,
      badge,
      // A stable pseudo-metric so "trending" ordering is deterministic.
      popularity: Math.round(rating * 100 + reviews / 10),
      addedDaysAgo: (i * 7) % 90,
      img: shot(category, seed, brand, 0, name),
      images: [0, 1, 2, 3].map((v) => shot(category, seed, brand, v, name)),
      colors: colorways.slice(i % 2, (i % 2) + 3),
      sizes: copy.sizes,
      description: copy.description,
      highlights: copy.highlights,
      specs: copy.specs,
      freeShipping: price >= 75,
      reviewList: [0, 1, 2].map((k) => {
        const [author, body] = reviewerPool[(i + k) % reviewerPool.length];
        return {
          id: `${id}-r${k}`,
          author,
          body,
          rating: Math.min(5, Math.round(rating) - (k === 2 ? 1 : 0)),
          daysAgo: 3 + k * 11 + (i % 5),
          verified: k !== 2,
        };
      }),
    };
  }
);

export const brands = [...new Set(products.map((p) => p.brand))].sort();

export const priceBounds = {
  min: 0,
  max: Math.ceil(Math.max(...products.map((p) => p.price)) / 50) * 50,
};

export const getProductById = (id) => products.find((p) => p.id === id);

export const getRelated = (product, limit = 5) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

/* ------------------------------------------------------------------ *
 * Homepage merchandising
 * ------------------------------------------------------------------ */

export const heroSlides = [
  {
    id: "hero-1",
    eyebrow: "Season drop",
    title: "Run further in the Aero Runner 2",
    copy: "Responsive foam, featherweight upper, and a grip that holds the corner. Now in three new colourways.",
    cta: "Shop sneakers",
    to: "/category/sneakers",
    accent: "#ff7900",
    productId: "p-001",
  },
  {
    id: "hero-2",
    eyebrow: "Sound, upgraded",
    title: "Halo Buds Pro — quiet on demand",
    copy: "Adaptive noise cancelling, 32 hours of battery, and a fit that stays put from commute to gym.",
    cta: "Explore audio",
    to: "/category/electronics",
    accent: "#3563e9",
    productId: "p-008",
  },
  {
    id: "hero-3",
    eyebrow: "Workspace",
    title: "Colour-true displays for real work",
    copy: "Factory-calibrated panels with the ports you actually use and a stand that moves with you.",
    cta: "See displays",
    to: "/category/displays",
    accent: "#e83e8c",
    productId: "p-016",
  },
];

export const valueProps = [
  { icon: "truck", title: "Free delivery over $75", copy: "Dispatched same day before 4pm" },
  { icon: "return", title: "30-day free returns", copy: "No questions, prepaid label included" },
  { icon: "shield", title: "2-year warranty", copy: "Covered on every electronics order" },
  { icon: "support", title: "Support that answers", copy: "Real humans, 7 days a week" },
];

export const testimonials = [
  {
    name: "Elena Vasquez",
    role: "Product designer",
    quote:
      "The checkout is the fastest I've used. Three taps from cart to confirmation and the order tracking actually updates.",
  },
  {
    name: "Idris Bello",
    role: "Software engineer",
    quote:
      "Filters, search, wishlist — everything is where I expect it. I found what I wanted in under a minute.",
  },
  {
    name: "Sofia Lindqvist",
    role: "Photographer",
    quote:
      "Product pages give me the specs I need without digging. The comparison between display models sold me.",
  },
];

export const promoCodes = {
  SSHOP10: { type: "percent", value: 10, label: "10% off your order" },
  WELCOME20: { type: "percent", value: 20, label: "20% welcome discount" },
  FREESHIP: { type: "shipping", value: 0, label: "Free express shipping" },
};
