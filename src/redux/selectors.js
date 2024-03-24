import { createSelector } from "@reduxjs/toolkit";

export const selectNannies = (state) => state.nannies.items;

export const selectIsLoading = (state) => state.nannies.isLoading;

export const selectError = (state) => state.nannies.error;

export const selectFilter = (state) => state.filter;

export const selectVisibleNannies = createSelector(
  [selectNannies, selectFilter],
  (nannies, filter) => {
    const normalizedFilter = filter.toLowerCase().trim();
    return nannies?.filter((nannies) =>
      nannies.filter.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const selectFavoritesNannies = (state) => state.nannies.favorites;

export const selectLoadMoreButton = (state) => state.nannies.loadMoreButton;

export const selectCurrentPage = (state) => state.nannies.currentPage;
