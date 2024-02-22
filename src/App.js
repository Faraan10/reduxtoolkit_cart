import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContain from "./components/CartContain";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals } from "./redux/slices/cart/cartSlice";
import Modal from "./components/Modal";
import "./App.css";

function App() {
	const { cartItems } = useSelector((state) => state.cart);
	const { isOpen } = useSelector((state) => state.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(calculateTotals());
	}, [cartItems]);
	return (
		<div className="App">
			{isOpen && <Modal />}
			<Navbar />
			<CartContain />
		</div>
	);
}

export default App;
