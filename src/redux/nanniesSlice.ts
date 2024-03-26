import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchNanniesThunk } from "./operations";
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

const handlePending = (state: IState): void => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: IState, action: PayloadAction<any>): void => {
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

const INITIAL_STATE: IState = {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNanniesThunk.pending, handlePending)
      .addCase(fetchNanniesThunk.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchNanniesThunk.rejected, handleRejected);

    // .addCase(fetchAllCarsThunk.pending, handlePending)
    // .addCase(fetchAllCarsThunk.fulfilled, (state, action) => {
    //   state.items = action.payload;
    //   state.isLoading = false;
    //   state.error = null;
    // })
    // .addCase(fetchAllCarsThunk.rejected, handleRejected);
  },
});

export const {
  addToFavorites,
  deleteFavorites,
  clearState,
  setloadMoreButton,
  setCurrentPage,
  setNextPage,
} = nanniesSlice.actions;
export const nanniesReducer = nanniesSlice.reducer;
