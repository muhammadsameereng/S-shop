import { useState } from "react";
import Hero from "../components/home/Hero";
import {
  BrandMarquee,
  CategoryGrid,
  DealStrip,
  FeaturedProducts,
  Testimonials,
  ValueProps,
} from "../components/home/Sections";
import QuickView from "../components/product/QuickView";
import { PageShell } from "../components/layout/Layout";

function Homepage() {
  const [quickView, setQuickView] = useState(null);

  return (
    <PageShell>
      <Hero />
      <ValueProps />
      <CategoryGrid />
      <FeaturedProducts onQuickView={setQuickView} />
      <DealStrip />
      <BrandMarquee />
      <Testimonials />
      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </PageShell>
  );
}

export default Homepage;
