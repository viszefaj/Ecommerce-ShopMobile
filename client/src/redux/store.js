import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import adminReducer from "./slice/adminSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  admin: adminReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
