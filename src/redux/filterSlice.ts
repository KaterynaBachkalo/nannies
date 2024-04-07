import { createSlice } from "@reduxjs/toolkit";

export interface IFilter {
  filter: string;
}

const INITIAL_STATE: IFilter = {
  filter: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: INITIAL_STATE,

  reducers: {
    setFilter(_, action) {
      return action.payload;
    },
    resetFilter(state, _) {
      return (state = INITIAL_STATE);
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
