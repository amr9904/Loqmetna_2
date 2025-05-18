"use client";

import React, { useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { categories as originalCategories, menuItems } from "../data/menu";
import AddToCartCard from "../components/AddToCartCard";
import StickyCartBar from "../components/StickyCartBar";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import menuBg from "../assets/bg.jpg";
import RestaurantInfo from "../components/RestaurantInfo";
import FoodListItem from "../components/FoodListItem";
import CategorySection from "../components/CategorySection";
import TabNavigator from "../components/TabNavigator";

const Menu = () => {
	const [selectedCategory, setSelectedCategory] = useState("weekly_offer");
	const [addToCartOpen, setAddToCartOpen] = useState(false);
	const [selectedFood, setSelectedFood] = useState(null);
	const navigate = useNavigate();
	const { cartItems, getCartTotal } = useCart();

	const cartTotal = getCartTotal();
	const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	const desiredOrder = [
		"weekly_offer",
		"new",
		"meals",
		"burgers",
		"shawarma",
		"crepes",
		"sides_salads",
		"cold_drinks",
	];
	
	const categories = desiredOrder
		.map((id) => originalCategories.find((cat) => cat.id === id))
		.filter(Boolean);

	const handleCategoryChange = (event, newValue) => {
		setSelectedCategory(newValue);
	};

	const filteredItems = menuItems.filter(
		(item) => item.category === selectedCategory
	);

	const handleFoodClick = (item) => {
		setSelectedFood(item);
		setAddToCartOpen(true);
	};
	
	const handleCloseAddToCart = () => {
		setAddToCartOpen(false);
		setTimeout(() => setSelectedFood(null), 300);
	};

	return (
		<Box
			sx={{
				width: "100%",
				minHeight: "100vh",
				bgcolor: "#f5f5f5",
				paddingTop: 0,
				margin: 0,
			}}
		>
			{/* Main Content Container */}
			<Box
				sx={{
					width: { xs: "100%", md: "100%" },
					mx: "auto",
					bgcolor: "#fff",
					minHeight: "100vh",
					position: "relative",
					display: "flex",
					flexDirection: "column",
					boxShadow: { xs: "none", md: "0 0 15px rgba(0,0,0,0.1)" },
					direction: "ltr",
					mt: 0,
				}}
			>
				{/* Header Section with Background */}
				<Box
					sx={{
						height: { xs: "25vh", sm: "28vh", md: "35vh" },
						width: "100%",
						position: "relative",
						backgroundImage: `url(${menuBg})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						marginBottom: "120px",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: "rgba(0,0,0,0.4)",
							zIndex: 1,
						},
					}}
				>
					{/* Action Icons */}
					<Box
						sx={{
							position: "absolute",
							top: 16,
							right: 16,
							display: "flex",
							gap: 1.5,
							zIndex: 10,
						}}
					>
						
						<IconButton
							onClick={() => navigate("/contact")}
							sx={{
								bgcolor: "#fff",
								color: "#982121",
								width: 40,
								height: 40,
								boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
							}}
						>
							<LocationOnIcon />
						</IconButton>
						<IconButton
							onClick={() => navigate("/search")}
							sx={{
								bgcolor: "#fff",
								color: "#982121",
								width: 40,
								height: 40,
								boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
							}}
						>
							<SearchIcon />
						</IconButton>
					</Box>

					{/* Restaurant Info Component */}
					<RestaurantInfo />
				</Box>

				{/* Tab Navigator */}
				<TabNavigator
					categories={categories}
					selectedCategory={selectedCategory}
					handleCategoryChange={handleCategoryChange}
				/>

				{/* Menu Items */}
				<Box sx={{ flex: 1, width: "100%" }}>
					{selectedCategory === "weekly_offer" && (
						<>
							<CategorySection
								title="العرض الأسبوعي"
								
							/>
							{filteredItems.map((item) => (
								<FoodListItem
									key={item.id}
									item={item}
									onClick={() => handleFoodClick(item)}
								/>
							))}
						</>
					)}

					{selectedCategory === "new" && (
						<>
							<CategorySection
								title="جديد"
								
							/>
							{filteredItems.map((item) => (
								<FoodListItem
									key={item.id}
									item={item}
									onClick={() => handleFoodClick(item)}
								/>
							))}
						</>
					)}

					{selectedCategory === "meals" && (
						<>
							<CategorySection
								title="الوجبات"
								
							/>
							{filteredItems.map((item) => (
								<FoodListItem
									key={item.id}
									item={item}
									onClick={() => handleFoodClick(item)}
								/>
							))}
						</>
					)}

					{selectedCategory === "burgers" && (
						<>
							<CategorySection
								title="البرجر"
						
							/>
							{filteredItems.map((item) => (
								<FoodListItem
									key={item.id}
									item={item}
									onClick={() => handleFoodClick(item)}
								/>
							))}
						</>
					)}

					{selectedCategory === "shawarma" && (
						<>
							<CategorySection
								title="شاورما"
								
							/>
							{filteredItems.map((item) => (
								<FoodListItem
									key={item.id}
									item={item}
									onClick={() => handleFoodClick(item)}
								/>
							))}
						</>
					)}

					{selectedCategory === "crepes" && (
						<>
							<CategorySection
								title="الكريب"
								
							/>
							{filteredItems.map((item) => (
								<FoodListItem
									key={item.id}
									item={item}
									onClick={() => handleFoodClick(item)}
								/>
							))}
						</>
					)}

					{selectedCategory === "sides_salads" && (
						<>
							<CategorySection
								title="مقبلات وسلطات"
								
							/>
							{filteredItems.map((item) => (
								<FoodListItem
									key={item.id}
									item={item}
									onClick={() => handleFoodClick(item)}
								/>
							))}
						</>
					)}

					{selectedCategory === "cold_drinks" && (
						<>
							<CategorySection
								title="مشروبات باردة"
								
							/>
							{filteredItems.map((item) => (
								<FoodListItem
									key={item.id}
									item={item}
									onClick={() => handleFoodClick(item)}
								/>
							))}
						</>
					)}
				</Box>
			</Box>

			{/* Add to Cart Modal */}
			<AddToCartCard
				open={addToCartOpen}
				onClose={handleCloseAddToCart}
				food={selectedFood}
			/>

			{/* Sticky Cart Bar */}
			{!addToCartOpen && cartQuantity > 0 && (
				<StickyCartBar
					total={cartTotal}
					quantity={cartQuantity}
					onClick={() => navigate("/purchasesCart")}
				/>
			)}
		</Box>
	);
};

export default Menu;
