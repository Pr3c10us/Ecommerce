import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
  
};

export const asisAdmin = createSlice({
  name: "AsisAdmin",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setCart, setOrder } = asisAdmin.actions;

export default asisAdmin.reducer;
