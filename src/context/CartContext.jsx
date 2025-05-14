import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	const addToCart = (item, quantity = 1, note = "") => {
		setCartItems((prev) => {
			const existing = prev.find((i) => i.id === item.id);
			if (existing) {
				return prev.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity + quantity, note } : i
				);
			}
			return [...prev, { ...item, quantity, note }];
		});
	};

	const removeFromCart = (itemId) => {
		setCartItems((prev) => prev.filter((i) => i.id !== itemId));
	};

	const updateQuantity = (itemId, quantity) => {
		setCartItems((prev) =>
			prev.map((i) =>
				i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
			)
		);
	};

	const clearCart = () => setCartItems([]);

	const getCartTotal = () =>
		cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getCartTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
