import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          users: payload.users,
        };
      }
    );
    builder.addMatcher(
      userApi.endpoints.getUserById.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          user: payload.user,
        };
      }
    );
  },
});

export default userSlice.reducer;
