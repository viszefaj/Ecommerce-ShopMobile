import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    selectedTab: "products",
  },
  reducers: {
    selectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { selectedTab } = adminSlice.actions;

export default adminSlice.reducer;
