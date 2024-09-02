import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
// npm i @reduxjs/toolkit react-redux
import carSlice from "./reducers/car/carSlice";
import carDetailSlice from "./reducers/car/carDetailSlice"
import loginSlice from "./reducers/auth/loginSlice"
import { DefaultNavigator } from "expo-router/build/views/Navigator";
import orderSlice from "./reducers/order/orderSlice";



export const store = configureStore({
    reducer: {
        car: carSlice,
        carDetail: carDetailSlice,
        order: orderSlice,
        dataLogin: loginSlice,
    },
    enhancers: 
    (getDefaultEnchancers) =>
    __DEV__ ? getDefaultEnchancers().concat(reactotron.createEnhancer()) : getDefaultEnchancers() 
})
