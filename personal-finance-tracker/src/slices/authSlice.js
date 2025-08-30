import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
// import { setUser, clearUser } from "../slices/authSlice";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: true },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

export const initAuthListener = (store) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }));
    } else {
      store.dispatch(clearUser());
    }
  });
};
