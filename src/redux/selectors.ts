import { IState } from "./nanniesSlice";
import { IFilter } from "./filterSlice";

export const selectNannies = (state: { nannies: IState }) =>
  state.nannies.items;

export const selectIsLoading = (state: { nannies: IState }) =>
  state.nannies.isLoading;

export const selectError = (state: { nannies: IState }) => state.nannies.error;

export const selectFilter = (state: IFilter) => state.filter;

export const selectFavoritesNannies = (state: { nannies: IState }) =>
  state.nannies.favorites;

export const selectCurrentPage = (state: { nannies: IState }) =>
  state.nannies.currentPage;
