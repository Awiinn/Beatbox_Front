import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const CREDENTIALS = "credentials";

function storeToken(state, { payload }) {
  state.credentials = { token: payload.token, user: { ...payload.user } };
  window.sessionStorage.setItem(
    CREDENTIALS,
    JSON.stringify({
      token: payload.token,
      user: { ...payload.user },
    })
  );
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    credentials: JSON.parse(window.sessionStorage.getItem(CREDENTIALS)) || {
      token: "",
      user: { userId: null, admin: false },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(
      authApi.endpoints.edit.matchFulfilled,
      (state, { payload }) => {
        state.credentials = {
          ...state.credentials,
          user: payload,
        };
      }
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.credentials = {
        token: "",
        user: { userId: null, admin: false },
      };
      window.sessionStorage.removeItem(CREDENTIALS);
    });
  },
});

export default authSlice.reducer;
