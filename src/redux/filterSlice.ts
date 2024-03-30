import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  filter: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: INITIAL_STATE,

  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
    resetFilter(state, action) {
      return (state = INITIAL_STATE);
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
