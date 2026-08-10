import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data/catalog";
import { load, save, STORAGE_KEYS } from "../../lib/utils";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: products,
    loading: false,
    error: null,
    query: "",
    recentlyViewed: load(STORAGE_KEYS.recent, []),
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    viewProduct(state, action) {
      const id = action.payload;
      state.recentlyViewed = [
        id,
        ...state.recentlyViewed.filter((x) => x !== id),
      ].slice(0, 8);
      save(STORAGE_KEYS.recent, state.recentlyViewed);
    },
  },
});

export const { setLoading, setQuery, viewProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.list;
export const selectRecentlyViewed = (state) =>
  state.products.recentlyViewed
    .map((id) => state.products.list.find((p) => p.id === id))
    .filter(Boolean);

export default productsSlice.reducer;
