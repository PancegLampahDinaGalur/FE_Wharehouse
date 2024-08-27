import {createSlice} from "@reduxjs/toolkit";
import {fetchCars, fetchCarsDetails} from "./carApi";


const carSlice = createSlice({
    name : "car",
    initialState: {
        isLoading: false,
        data: [],  
        isError: false,
        errorMessage: null, 
    },
    // reducer = untuk mengelola data lokal yang ada pada initialstate 
    extraReducers: (builder) => { // extrareducer = digunakan ketika pake Thunk
        builder.addCase(fetchCars.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCars.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchCars.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    },
})

// const detailCarSlice = createSlice({
//     name : "car",
//     initialState: {
//         isLoading: false,
//         data: [],  
//         isError: false,
//         errorMessage: null, 
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchCarsDetails.pending, (state, action) => {
//             state.isLoading = true;
//         });
//         builder.addCase(fetchCarsDetails.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.data = action.payload;
//         });
//         builder.addCase(fetchCarsDetails.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = true;
//             state.errorMessage = action.error.message;
//         });
//     },
// })



export const getCar = fetchCars;
export const selectCar = state => state.car; //selector
export default carSlice.reducer;

// export const getCarsDetail = fetchCarsDetails;
// export const selectCarDetails = state => state.car; // Selector
// export const carReducer = carSlice.reducer; // Export the reducer with a clear name