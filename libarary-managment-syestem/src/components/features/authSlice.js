import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: savedUser,
  role: savedUser?.email === "admin@gmail.com"
    ? "admin"
    : savedUser
    ? "user"
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
  const backendUser = action.payload;   // DB.json se user (isme id hoti hai)
  const localUser = JSON.parse(localStorage.getItem("user")) || {};

  // ✅ dono merge karo (id preserve rehni chahiye)
  state.user = { ...backendUser, ...localUser, id: backendUser.id };

  // ✅ role assign
  state.role =
    state.user.email === "admin@gmail.com" ? "admin" : "user";

  // ✅ save in localStorage
  localStorage.setItem("user", JSON.stringify(state.user));
},

    logout: (state) => {
      state.user = null;
      state.role = null;
      localStorage.removeItem("user");
    },

   updateProfile: (state, action) => {
  state.user = { ...state.user, ...action.payload };
  localStorage.setItem("user", JSON.stringify(state.user));
}

  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;