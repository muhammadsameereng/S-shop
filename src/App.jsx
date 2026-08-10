import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Toaster from "./components/ui/Toaster";

import Homepage from "./pages/Hompage";
import Productspage from "./pages/Productspage";
import Productpage from "./pages/Productpage";
import CatagoryPage from "./pages/CatagoryPage";
import Dealspage from "./pages/Dealspage";
import Cartpage from "./pages/Cartpage";
import Checkoutpage from "./pages/Checkoutpage";
import Wishlistpage from "./pages/Wishlistpage";
import Orderspage from "./pages/Orderspage";
import ProfilePage from "./pages/ProfilePage";
import Contectpage from "./pages/Contectpage";
import Authpage from "./pages/Authpage";
import NotFoundpage from "./pages/NotFoundpage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth sits outside the shell — it owns the full viewport. */}
        <Route path="/auth" element={<Authpage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Productspage />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/category/:slug" element={<CatagoryPage />} />
          <Route path="/deals" element={<Dealspage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/checkout" element={<Checkoutpage />} />
          <Route path="/wishlist" element={<Wishlistpage />} />
          <Route path="/orders" element={<Orderspage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<Contectpage />} />

          {/* Legacy paths from the earlier build */}
          <Route path="/contect" element={<Navigate to="/contact" replace />} />
          <Route path="/categorypage" element={<Navigate to="/products" replace />} />

          <Route path="*" element={<NotFoundpage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
