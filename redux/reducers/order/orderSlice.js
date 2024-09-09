import { createSlice } from "@reduxjs/toolkit";
import { postOrder, putOrderSlip }  from './orderApi'

const initialState = {
  isLoading: false,
  carId: null,
  dataOrder: {},
  currentStep: 0,
  selectedBank: null,
  promo: null,
  errorMessage: null,
  status: "pending"
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setCarId: (state, { payload }) => {
      state.carId = payload;
    },
    setStateByName: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    resetState: (state) => {
      console.log('restState');
      state.dataOrder = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataOrder = action.payload;
      console.log('data fullfilled', action.payload);
      state.status = "success";
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload
      state.status = 'error';
    });

    builder.addCase(putOrderSlip.pending, (state, action) => {
      state.isLoading = true;
      console.log("slip pending")
    });
    builder.addCase(putOrderSlip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataOrder = action.payload;
      console.log("slip ok")
      state.status = "upload-success";
    });
    builder.addCase(putOrderSlip.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload
      console.log("slip err", action.payload)

    });


  },
});

export { postOrder, putOrderSlip };
export const { setCarId, setStateByName, resetState } = orderSlice.actions;
export const selectOrder = (state) => state.order; //selector
export default orderSlice.reducer;
