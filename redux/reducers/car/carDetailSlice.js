import {createSlice} from "@reduxjs/toolkit";
import { fetchCarsDetails} from "./carApi";


const carDetailSlice = createSlice({
    name : "carDetail",
    initialState: {
        isLoading: false,
        data: {},  
        isError: false,
        errorMessage: null, 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCarsDetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCarsDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchCarsDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    },
})

export const getCarDetail = fetchCarsDetails;
export const selectCar = state => state.carDetail; //selector
export default carDetailSlice.reducer;