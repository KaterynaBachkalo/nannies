import { createSlice } from "@reduxjs/toolkit";

export interface ICurrentUser {
  id: string;
  name: string;
  email: string;
}

export interface IUser {
  currentUser: null | ICurrentUser;
}

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;

export const selectUser = (state: { users: IUser }) => state.users.currentUser;

export const usersReducer = usersSlice.reducer;
