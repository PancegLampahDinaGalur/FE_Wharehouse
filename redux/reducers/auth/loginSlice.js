
import { createSlice } from "@reduxjs/toolkit";
import { postlogin } from "./authApi"; // Import the login thunk
// import { outer } from "expo-router"
import * as SecureStore from 'expo-secure-store';

// const getStore = () => JSON.parse(SecureStore.getItem('user'))
const getStore = () => {
    const user = SecureStore.getItem('user'); // Get the item
    return user ? JSON.parse(user) : null; // Parse only if user is not null/undefined
}
const setStore = (value) => SecureStore.setItem("user", JSON.stringify(value)) 
 
const loginSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    data: getStore() ? getStore() : {},  
    isError: false,
    isModalVisible: false,
    isLogin: getStore() ? true : false,
    errorMessage: null,
    
  },
  reducers: {
    closeModal : (state) => {
        state.isModalVisible = false;
        state.isError = false;
        state.errorMessage = null;
    },
    logout: (state) =>{
      state.data = {}
      state.isLogin = false
      SecureStore.deleteItemAsync('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postlogin.pending, (state, action) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(postlogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true,
        state.data = action.payload; // Store user data
        setStore(action.payload)
        state.isModalVisible =true;
        
        // setTimeout (()=> {
        //     state.isModalVisible = false;
        //     router.replace('/(tabs)')
        // },2000)
      })
      .addCase(postlogin.rejected, (state, action) => {
        state.isloading = false; 
        state.isError = true;
        state.errorMessage = action.payload;
        state.isModalVisible = true;
        // setTimeout(() => {
        //     state.isModalVisible = false;
        // }, 2000)
    
    
      });
  },
});

// Selectors
export {postlogin} ;
export const {closeModal, logout} = loginSlice.actions
export const selectDataAuth  = state => state.dataLogin; //selector
export default loginSlice.reducer; // Export the reducer

