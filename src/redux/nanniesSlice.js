import { createSlice } from "@reduxjs/toolkit";
import { fetchNanniesThunk } from "./operations";
import { toast } from "react-toastify";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
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

const INITIAL_STATE = {
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
    addToFavorites: {
      reducer(state, action) {
        state.favorites.push(action.payload);
      },
    },
    deleteFavorites: {
      reducer(state, action) {
        state.favorites = state.favorites.filter(
          (favorite) => favorite !== action.payload
        );
      },
    },
    clearState: {
      reducer(state) {
        state.items = [];
      },
    },
    setloadMoreButton: {
      reducer(state, action) {
        state.loadMoreButton = action.payload;
      },
    },
    setCurrentPage: {
      reducer(state, action) {
        state.currentPage = action.payload;
      },
    },
    setNextPage: {
      reducer(state, action) {
        state.currentPage = state.currentPage + 1;
      },
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
