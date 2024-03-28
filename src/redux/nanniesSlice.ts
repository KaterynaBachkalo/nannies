import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { INanny } from "../types";

interface IState {
  items: INanny[];
  isLoading: boolean;
  error: string | null;
  favorites: string[];
  loadMoreButton: boolean;
  currentPage: number;
}

export const handlePending = (state: IState): void => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (
  state: IState,
  action: PayloadAction<string>
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
  loadMoreButton: true,
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
    setFavorites(state, action: PayloadAction<string[]>) {
      state.favorites = action.payload;
    },
    clearState(state) {
      state.items = [];
    },
    setloadMoreButton(state, action: PayloadAction<boolean>) {
      state.loadMoreButton = action.payload;
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
  },
});

export const {
  addToFavorites,
  deleteFavorites,
  clearState,
  setloadMoreButton,
  setCurrentPage,
  setNextPage,
  setNannies,
  setFavorites,
} = nanniesSlice.actions;
export const nanniesReducer = nanniesSlice.reducer;
