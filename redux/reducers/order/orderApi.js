import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { postLogin } from "./authApi";

export const postOrder = createAsyncThunk("postOrder",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access_token": token,
          },
          body: JSON.stringify({
            "start_rent_at": formData.start_rent_at,
            "finish_rent_at": formData.finish_rent_at, // Fixed typo
            "car_id": formData.car_id,
          }),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Handle error response
      }

      const data = await response.json();
      
      return data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.message); // Handle network errors
    }
  }
);


export const putOrderSlip = createAsyncThunk("putOrderSlip",
  async ({ token, id, formData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order/slip", // Fixed URL concatenation
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "acces_token": token,
          },
          body: formData, // Ensure body is JSON stringified
        }
      );

      const body = await response.json(); // Moved this line inside try block
      if (!response.ok) throw new Error(body.message); // Handle error response
      return body; // Return the response body
    } catch (error) {
      return rejectWithValue(error.message); // Handle network errors
    }
  }
);

// const loginSlice = createSlice({
//   name: "user",
//   initialState: {
//     isLoading: false,
//     carId: null,
//     startRent: null,
//     endRent: null,
//     data: {},
//     paymentCountdown: null,
//     paymentMethod: null,
//     verificationCountdown: null,
//     errorMessage: null,
//   },
//   reducers: {
//     setCarId: (state, { payload }) => {
//       state.carId = payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(postLogin.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(postLogin.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.isLogin = true;
//       state.data = action.payload;
//       // Assuming setStore is defined elsewhere
//       setStore(action.payload);
//       state.isModalVisible = true;
//     });
//     builder.addCase(postLogin.rejected, (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       state.errorMessage = action.payload;
//       state.isModalVisible = true;
//     });
//   },
// });

// export { postLogin };
// export const { closeModal, logout, setCarId } = loginSlice.actions; // Export setCarId
// export const selectUser = (state) => state.user; // Selector
// export default loginSlice.reducer;