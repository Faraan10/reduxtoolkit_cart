import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import CartData from "../../../CartData";

const initialState = {
	cartItems: [],
	amount: 4,
	total: 0,
	isLoading: true,
};

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartData = createAsyncThunk("cart/getCartData", async () => {
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
});

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
	extraReducers: (builder) => {
		builder
			.addCase(getCartData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCartData.fulfilled, (state, action) => {
				state.cartItems = action.payload;
				state.isLoading = false;
			})
			.addCase(getCartData.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const { clearCart, removeCart, increaseCart, decreaseCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
