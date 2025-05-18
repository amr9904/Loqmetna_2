import { useState } from "react";
import { Box, InputBase, IconButton, Paper, Container } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import FoodListItem from "../components/FoodListItem";
import AddToCartCard from "../components/AddToCartCard";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../data/menu";

const SearchMenu = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	
	// Filter menu items by search query and exclude only "weekly_offer" category
	const filtered = menuItems.filter((item) =>
		item.title.toLowerCase().includes(query.toLowerCase()) && 
		item.category !== "weekly_offer"
	);
	
	const [addToCartOpen, setAddToCartOpen] = useState(false);
	const [selectedFood, setSelectedFood] = useState(null);

	const handleCardClick = (item) => {
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
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				bgcolor: "rgba(245,245,245,0.98)",
				zIndex: 3000,
				overflowY: "auto",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Container
				maxWidth={false}
				sx={{
					width: { xs: "98vw", sm: "65vw" },
					maxWidth: { sm: 1200 },
					mx: "auto",
					bgcolor: "#fff",
					borderRadius: { xs: 0, sm: 4 },
					boxShadow: 3,
					px: { xs: 0.5, sm: 3, md: 6 },
					py: { xs: 0.5, sm: 3, md: 4 },
				}}
			>
				{/* Sticky Search Bar */}
				<Box
					sx={{
						position: "sticky",
						top: 0,
						bgcolor: "#fff",
						zIndex: 10,
						px: 0,
						pt: 0,
						pb: 2,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Paper
						sx={{
							display: "flex",
							alignItems: "center",
							borderRadius: 999,
							boxShadow: 0,
							bgcolor: "#f7f9f8",
							px: { xs: 1, sm: 2 },
							width: { xs: "90vw", sm: 400 },
							maxWidth: 500,
							flex: 1,
							height: 42,
						}}
					>
						<InputBase
							sx={{
								ml: 1,
								flex: 1,
								textAlign: "left",
								fontSize: { xs: 15, sm: 18 },
								fontWeight: 500,
								direction: "ltr",
							}}
							placeholder="بحث في القائمة"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							inputProps={{
								"aria-label": "بحث في القائمة",
								style: { textAlign: "right", direction: "rtl" },
							}}
						/>
						<SearchIcon sx={{ color: "#222", ml: 1 }} />
					</Paper>
					<IconButton
						onClick={() => navigate(-1)}
						sx={{
							ml: 2,
							border: "1.5px solid #fff",
							bgcolor: " #f7f7f7",
							width: 35,
							height: 35,
						}}
					>
						<ArrowForwardIosIcon sx={{ fontSize: 22 }} />
					</IconButton>
				</Box>
				{/* Results Section */}
				<Box sx={{ px: 0, pt: 1 }}>
					{/* All items with FoodListItem (except weekly_offer) */}
					{filtered.map((item) => (
						<FoodListItem
							key={item.id}
							item={item}
							onClick={() => handleCardClick(item)}
						/>
					))}
					
					{/* Empty state when no results */}
					{filtered.length === 0 && (
						<Box 
							sx={{ 
								py: 8, 
								textAlign: 'center', 
								color: '#666',
								fontSize: { xs: 16, sm: 18 }
							}}
						>
							لا توجد نتائج تطابق البحث
						</Box>
					)}
					
					<AddToCartCard
						open={addToCartOpen}
						onClose={handleCloseAddToCart}
						food={selectedFood}
					/>
				</Box>
			</Container>
		</Box>
	);
};

export default SearchMenu;
