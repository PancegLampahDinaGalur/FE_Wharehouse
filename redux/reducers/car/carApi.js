import { createAsyncThunk } from '@reduxjs/toolkit'; // midleware untuk fetch API dari component ke reducer sebagai penghubung 


export const fetchCars = createAsyncThunk(
    "fetchCars",
    async (signal) => {
        const res = await fetch( `https://api-car-rental.binaracademy.org/customer/car/`, {signal});
        return res?.json(); 
    }
)

export const fetchCarsDetails = createAsyncThunk(
    "fetchCarsDetails",
    async ({id,signal}) => {
        const res = await fetch(`https://api-car-rental.binaracademy.org/customer/car/` + id, {signal} );
        return res?.json(); 
    }
)