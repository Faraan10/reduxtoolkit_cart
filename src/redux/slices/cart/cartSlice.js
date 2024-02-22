import { createSlice } from "@reduxjs/toolkit";
import CartData from "../../../CartData";

const initialState = {
	cartItems: CartData,
	amount: 4,
	total: 0,
	isLoading: true,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cartItems = [];
		},
		removeCart: (state, action) => {
			const itemId = action.payload;
			state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
		},
		increaseCart: (state, { payload }) => {
			const cartItem = state.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount + 1;
		},
		decreaseCart: (state, { payload }) => {
			const cartItem = state.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount - 1;
		},
		calculateTotals: (state) => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach((item) => {
				amount = amount + item.amount;
				total = total + item.amount * item.price;
			});
			state.amount = amount;
			state.total = total;
		},
	},
});

export const { clearCart, removeCart, increaseCart, decreaseCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
