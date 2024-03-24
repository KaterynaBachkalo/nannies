import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { fetchNannies } from "../services/api";

axios.defaults.baseURL =
  "https://nannies-service-7f22d-default-rtdb.europe-west1.firebasedatabase.app/";

export const fetchNanniesThunk = createAsyncThunk(
  "nannies/fetchNannies",
  async (params, thunkAPI) => {
    try {
      const response = await axios("/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchNanniesThunk = createAsyncThunk(
//   "nannies/fetchNannies",
//   async (params, thunkAPI) => {
//     try {
//       const response = await fetchNannies(params);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchAllCarsThunk = createAsyncThunk(
//   "cars/fetchAllCars",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get(`/adverts`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
