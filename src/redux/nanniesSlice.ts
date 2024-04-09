import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { INanny } from "../types";

export interface IState {
  items: INanny[];
  isLoading: boolean;
  error: any | null;
  favorites: string[];
  currentPage: number;
}

export const handlePending = (state: IState): void => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (
  state: IState,
  action: PayloadAction<any>
): void => {
  state.isLoading = false;
  state.error = action.payload;

  if (state.error === "Network Error") {
    toast.error("Something went wrong, please try later", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

export const INITIAL_STATE: IState = {
  items: [],
  isLoading: false,
  error: null,
  favorites: [],
  currentPage: 1,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState: INITIAL_STATE,

  reducers: {
    addToFavorites(state, action: PayloadAction<string>) {
      state.favorites.push(action.payload);
    },
    deleteFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        (favorite) => favorite !== action.payload
      );
    },
    clearFavorites(state) {
      state.favorites = [];
    },
    clearState(state) {
      state.items = [];
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setNextPage(state) {
      state.currentPage = state.currentPage + 1;
    },
    setNannies(state, action: PayloadAction<INanny[]>) {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<any | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  addToFavorites,
  deleteFavorites,
  clearState,
  setCurrentPage,
  setNannies,
  setLoading,
  setError,
  setNextPage,
  clearFavorites,
} = nanniesSlice.actions;
export const nanniesReducer = nanniesSlice.reducer;
