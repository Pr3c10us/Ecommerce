import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
  adminInfo: {},
};

export const asisAdmin = createSlice({
  name: "AsisAdmin",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setAdminInfo: (state, action) => {
      state.adminInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCart, setAdminInfo } = asisAdmin.actions;

export default asisAdmin.reducer;
