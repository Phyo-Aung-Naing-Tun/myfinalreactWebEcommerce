import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filterProducts: [],
  categories: [],
  currentCategory: "",
  cartProducts: [],
  orderHistory: [],
  totalCost: 0,
};
export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    getProducts: (state, { payload }) => {
      state.products = payload;
    },
    getCategories: (state, { payload }) => {
      state.categories = payload;
    },
    getCurrentCategory: (state, { payload }) => {
      state.currentCategory = payload;
    },
    getFilterProducts: (state, { payload }) => {
      state.filterProducts = payload;
    },
    setCartProduct: (state, { payload }) => {
      if (state.cartProducts.find((cp) => cp.id == payload.id)) {
        state.cartProducts = [...state.cartProducts];
      } else {
        state.cartProducts.push(payload);
      }
    },
    setOrderHistories: (state, { payload }) => {
      state.orderHistory = [...state.orderHistory, payload];
    },
    resetOrderHistories: (state, { payload }) => {
      state.orderHistory = payload;
    },
    deleCartProduct: (state, { payload }) => {
      state.cartProducts = payload;
    },
    plusTotalCost: (state, { payload }) => {
      state.totalCost += payload;
    },
    minusTotalCost: (state, { payload }) => {
      state.totalCost -= payload;
    },
    deleteTotalCost: (state) => {
      state.totalCost = 0;
    },
  },
});

export const {
  getProducts,
  getCategories,
  getCurrentCategory,
  getFilterProducts,
  setCartProduct,
  deleCartProduct,
  setToggle,
  plusTotalCost,
  minusTotalCost,
  setOrderHistories,
  resetOrderHistories,
  deleteTotalCost,
} = productSlice.actions;
export default productSlice.reducer;
