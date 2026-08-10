import avatar from "../assets/user.jpg";
import { products } from "./catalog";

export const demoAccount = {
  id: "u-001",
  username: "Sameer",
  fullName: "Muhammad Sameer",
  email: "sameer@s-shop.com",
  password: "sshop123",
  phone: "+92 343 015 9930",
  img: avatar,
  memberSince: "March 2023",
  tier: "Gold member",
  points: 2480,
};

export const addresses = [
  {
    id: "addr-1",
    label: "Home",
    name: "Muhammad Sameer",
    line1: "24 Marina Heights, Block 5",
    line2: "Clifton, Karachi 75600",
    country: "Pakistan",
    phone: "+92 343 015 9930",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    name: "Muhammad Sameer",
    line1: "Floor 9, Dolmen Tower",
    line2: "Marine Drive, Karachi 75600",
    country: "Pakistan",
    phone: "+92 343 015 9930",
    isDefault: false,
  },
];

export const paymentMethods = [
  { id: "pm-1", brand: "Visa", last4: "4242", expiry: "08/28", isDefault: true },
  { id: "pm-2", brand: "Mastercard", last4: "8319", expiry: "01/27", isDefault: false },
];

const pick = (id) => products.find((p) => p.id === id);

export const orders = [
  {
    id: "SSH-10482",
    placed: "12 Jun 2024",
    status: "Delivered",
    eta: "Delivered 15 Jun",
    total: 278,
    items: [
      { product: pick("p-008"), quantity: 1 },
      { product: pick("p-015"), quantity: 1 },
    ],
    timeline: ["Ordered", "Packed", "Shipped", "Delivered"],
    step: 4,
  },
  {
    id: "SSH-10517",
    placed: "02 Jul 2024",
    status: "In transit",
    eta: "Arriving Thursday",
    total: 329,
    items: [{ product: pick("p-016"), quantity: 1 }],
    timeline: ["Ordered", "Packed", "Shipped", "Delivered"],
    step: 3,
  },
  {
    id: "SSH-10553",
    placed: "21 Jul 2024",
    status: "Processing",
    eta: "Ships tomorrow",
    total: 218,
    items: [
      { product: pick("p-001"), quantity: 1 },
      { product: pick("p-029"), quantity: 2 },
    ],
    timeline: ["Ordered", "Packed", "Shipped", "Delivered"],
    step: 1,
  },
];
