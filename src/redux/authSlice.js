import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser: (users, action) => {
      users.currentUser = action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;

export const selectUser = (state) => state.users;

export const usersReducer = usersSlice.reducer;
