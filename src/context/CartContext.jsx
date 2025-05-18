import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	// Generate a unique key for cart items based on item ID and extras
	const getItemKey = (item) => {
		if (!item.selectedExtras || !item.selectedExtras.length) {
			return item.id;
		}
		
		// Sort extras by ID to ensure consistent keys regardless of selection order
		const extrasKey = [...item.selectedExtras]
			.sort((a, b) => a.id - b.id)
			.map(extra => extra.id)
			.join('-');
			
		return `${item.id}_${extrasKey}`;
	};

	const addToCart = (item, quantity = 1, note = "") => {
		setCartItems((prev) => {
			// Generate unique key for the current item with its extras
			const itemKey = getItemKey(item);
			
			// Find existing item with the same ID and extras combination
			const existing = prev.find(i => {
				const existingKey = getItemKey(i);
				return existingKey === itemKey;
			});
			
			if (existing) {
				return prev.map((i) => {
					const currKey = getItemKey(i);
					return currKey === itemKey ? { ...i, quantity: i.quantity + quantity, note } : i;
				});
			}
			
			// If we're here, it's a new item or same item with different extras
			return [...prev, { ...item, quantity, note, cartItemKey: itemKey }];
		});
	};

	const removeFromCart = (itemId) => {
		// Check if this is a composite key (item with extras)
		const isCompositeKey = itemId.includes('_');
		
		setCartItems((prev) => prev.filter((i) => {
			if (isCompositeKey) {
				return i.cartItemKey !== itemId;
			}
			return i.id !== itemId;
		}));
	};

	const updateQuantity = (itemId, quantity) => {
		// Check if this is a composite key (item with extras)
		const isCompositeKey = itemId.includes('_');
		
		setCartItems((prev) =>
			prev.map((i) => {
				if (isCompositeKey) {
					return i.cartItemKey === itemId ? { ...i, quantity: Math.max(1, quantity) } : i;
				}
				return i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i;
			})
		);
	};

	const clearCart = () => setCartItems([]);

	const getCartTotal = () =>
		cartItems.reduce((sum, item) => {
			// Base price of the item
			let itemTotal = item.price;
			
			// Add extras price if available
			if (item.selectedExtras && Array.isArray(item.selectedExtras)) {
				const extrasTotal = item.selectedExtras.reduce(
					(extSum, extra) => extSum + (extra.price || 0),
					0
				);
				itemTotal += extrasTotal;
			}
			
			// Multiply by quantity
			return sum + itemTotal * item.quantity;
		}, 0);

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
