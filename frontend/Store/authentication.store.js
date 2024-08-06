import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthticated: false,
    Username: "",
    jwtToken: "",
    expiredIn: "",
    email: "",
  },
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthticated = action.payload.auth;
    },
    setName(state, action) {
      state.Username = action.payload.name;
    },
    setjwtToken(state, action) {
      state.jwtToken = action.payload.token;
    },
    setAllData(state, action) {
      const { email, auth, token, name } = action.payload;
      (state.jwtToken = token), (state.Username = name);
      state.isAuthticated = auth;
      state.email = email;
    },
    setEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export default authenticationSlice.reducer;
export const authFunction = authenticationSlice.actions;
