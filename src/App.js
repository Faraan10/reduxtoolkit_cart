import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContain from "./components/CartContain";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, getCartData } from "./redux/slices/cart/cartSlice";
import Modal from "./components/Modal";
import "./App.css";

function App() {
	const { cartItems, isLoading } = useSelector((state) => state.cart);
	const { isOpen } = useSelector((state) => state.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(calculateTotals());
	}, [cartItems]);

	useEffect(() => {
		dispatch(getCartData());
	}, []);

	if (isLoading) {
		return (
			<div className="loading" style={{ marginTop: "17%" }}>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<div className="App">
			{isOpen && <Modal />}
			<Navbar />
			<CartContain />
		</div>
	);
}

export default App;
