import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
  order: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    shipping: "",
  },
  customer: {},
};

export const asis = createSlice({
  name: "Asis",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setOrder: (state, action) => {
      state.order = { ...state.order, ...action.payload };
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCart, setOrder,setCustomer } = asis.actions;

export default asis.reducer;
