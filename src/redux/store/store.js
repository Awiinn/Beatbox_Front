import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
