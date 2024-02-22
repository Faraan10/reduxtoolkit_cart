import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItems from "./CartItems";
// import { clearCart } from "../redux/slices/cart/cartSlice";
import { openModal } from "../redux/slices/modal/modalSlice";
const CartContain = () => {
	const { cartItems, amount, total } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	if (amount < 1) {
		return (
			<section className="cart">
				<header>
					<h2>Your bag</h2>
					<h4 className="empty-cart">is currently empty</h4>
				</header>
			</section>
		);
	}

	return (
		<section className="cart">
			<header>
				<h2>Your bag</h2>
			</header>
			<div>
				{cartItems.map((item) => {
					return <CartItems key={item.id} {...item} />;
				})}
			</div>
			<footer>
				<hr />
				<div className="cart-total">
					<h4>
						total <span>${total.toFixed(2)}</span>
					</h4>
				</div>
				<button className="btn clear-btn" onClick={() => dispatch(openModal())}>
					clear cart
				</button>
			</footer>
		</section>
	);
};

export default CartContain;
