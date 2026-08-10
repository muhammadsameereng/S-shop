import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productslices";
import cartReducer from "./cart/cartSlices";
import wishlistReducer from "./wishlist/wishlistSlices";
import userReducer from "./user/userSlices";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
});

export default store;
