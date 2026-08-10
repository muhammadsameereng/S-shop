import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data/catalog";
import { load, save, STORAGE_KEYS } from "../../lib/utils";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    ids: load(STORAGE_KEYS.wishlist, []),
  },
  reducers: {
    toggleWishlist(state, action) {
      const id = action.payload;
      state.ids = state.ids.includes(id)
        ? state.ids.filter((x) => x !== id)
        : [id, ...state.ids];
      save(STORAGE_KEYS.wishlist, state.ids);
    },
    removeFromWishlist(state, action) {
      state.ids = state.ids.filter((x) => x !== action.payload);
      save(STORAGE_KEYS.wishlist, state.ids);
    },
    clearWishlist(state) {
      state.ids = [];
      save(STORAGE_KEYS.wishlist, state.ids);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const selectWishlist = (state) =>
  state.wishlist.ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

export const selectIsWishlisted = (id) => (state) =>
  state.wishlist.ids.includes(id);

export default wishlistSlice.reducer;
