import { createSlice } from "@reduxjs/toolkit";
import { addresses, demoAccount, orders, paymentMethods } from "../../data/account";
import { load, remove, save, STORAGE_KEYS } from "../../lib/utils";

const savedUser = load(STORAGE_KEYS.user, null);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: savedUser,
    isAuthenticated: Boolean(savedUser),
    loading: false,
    error: null,
    addresses,
    paymentMethods,
    orders,
  },
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    authFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    authSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
      save(STORAGE_KEYS.user, action.payload);
    },
    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
      save(STORAGE_KEYS.user, state.user);
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      remove(STORAGE_KEYS.user);
    },
    addOrder(state, action) {
      state.orders = [action.payload, ...state.orders];
    },
  },
});

export const {
  authStart,
  authFailure,
  authSuccess,
  updateProfile,
  logout,
  addOrder,
} = userSlice.actions;

/** Signs a visitor in locally — any password works, the demo account is pre-filled. */
export const signIn =
  ({ email, password, username }) =>
  (dispatch) => {
    dispatch(authStart());
    return new Promise((resolve) => {
      setTimeout(() => {
        const profile = {
          ...demoAccount,
          username: username || demoAccount.username,
          email: email || demoAccount.email,
        };
        delete profile.password;
        void password;
        dispatch(authSuccess(profile));
        resolve(profile);
      }, 700);
    });
  };

export default userSlice.reducer;
