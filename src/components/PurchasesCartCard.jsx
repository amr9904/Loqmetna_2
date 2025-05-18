import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const deepRed = "#982121";

const PurchasesCartCard = ({ item, onAdd, onRemove }) => {
	const imageWidth = 170;
	const imageHeight = 110;
	const buttonContainerWidth = imageWidth * 0.65;

	// Calculate the item total price including extras
	const calculateItemPrice = () => {
		let basePrice = item.price || 0;
		
		// Add extras price if available
		if (item.selectedExtras && Array.isArray(item.selectedExtras)) {
			const extrasTotal = item.selectedExtras.reduce(
				(sum, extra) => sum + (extra.price || 0),
				0
			);
			basePrice += extrasTotal;
		}
		
		// Return the unit price (without multiplying by quantity)
		return basePrice;
	};
	
	// Calculate unit price
	const unitPrice = calculateItemPrice();
	
	// Calculate total price (unit price * quantity)
	const totalPrice = unitPrice * item.quantity;
	
	// Format extras for display if they exist
	const extrasText = item.selectedExtras && item.selectedExtras.length > 0 
		? `+ ${item.selectedExtras.map(extra => extra.name).join(', ')}` 
		: '';

	return (
		<Box
			sx={{
				width: "100%",
				mx: "auto",
				mb: { xs: 2, sm: 5 },
				mt: { xs: 2, sm: 5 },
				borderRadius: 3,
				overflow: "hidden",
				boxShadow: 1,
				bgcolor: "#f7f7f7",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				height: { xs: 120, sm: 120 },
			}}
		>
			{/* Image on the left with buttons at the bottom */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					position: "relative",
					p: { xs: 2, sm: "40px" },
					width: { xs: "35%", sm: "auto" },
					justifyContent: "flex-start",
				}}
			>
				<Box
					sx={{
						position: "relative",
						width: { xs: "100%", sm: imageWidth },
						maxWidth: { xs: 120, sm: imageWidth },
						height: { xs: 80, sm: imageHeight },
					}}
				>
					<img
						src={item.image}
						alt={item.title}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: 8,
							display: "block",
						}}
					/>
					{/* Buttons at the bottom of the image */}
					<Box
						sx={{
							position: "absolute",
							left: "50%",
							bottom: 2,
							transform: "translateX(-50%)",
							width: { xs: "70%", sm: buttonContainerWidth },
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							bgcolor: "#fff",
							borderRadius: 999,
							px: { xs: 1.5, sm: 2 },
							py: { xs: 0.3, sm: 0.5 },
							boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
							zIndex: 2,
						}}
					>
						<Box
							onClick={() => onRemove && onRemove(item)}
							sx={{
								color: deepRed,
								fontSize: { xs: 18, sm: 22 },
								fontWeight: "bold",
								cursor: "pointer",
								width: { xs: 20, sm: 24 },
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								userSelect: "none",
								"&:hover": { opacity: 0.8 },
							}}
						>
							−
						</Box>
						<Typography
							sx={{
								fontWeight: 700,
								fontSize: { xs: 16, sm: 18 },
								color: "#333",
								mx: { xs: 1, sm: 2 },
								userSelect: "none",
							}}
						>
							{item.quantity}
						</Typography>
						<Box
							onClick={() => onAdd && onAdd(item)}
							sx={{
								color: deepRed,
								fontSize: { xs: 18, sm: 22 },
								fontWeight: "bold",
								cursor: "pointer",
								width: { xs: 20, sm: 24 },
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								userSelect: "none",
								"&:hover": { opacity: 0.8 },
							}}
						>
							+
						</Box>
					</Box>
				</Box>
			</Box>
			{/* Info on the right */}
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					p: { xs: 2, sm: "40px" },
					width: { xs: "65%", sm: "auto" },
				}}
			>
				<Typography
					sx={{
						fontWeight: 700,
						color: "#222",
						textAlign: "left",
						fontSize: { xs: 16, sm: 18 },
						width: "100%",
						mb: 1,
					}}
				>
					{item.title}
				</Typography>
				
				{extrasText && (
					<Typography
						sx={{
							color: "#555",
							textAlign: "left",
							fontSize: { xs: 12, sm: 14 },
							width: "100%",
							mb: 0.5,
							fontStyle: "italic"
						}}
					>
						{extrasText}
					</Typography>
				)}
				
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
						width: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						color: "#982121",
					}}
				>
					<Typography
						sx={{
							fontWeight: 700,
							fontSize: { xs: 14, sm: 16 },
						}}
					>
						ج.م
					</Typography>
					<Typography
						sx={{
							fontWeight: 700,
							fontSize: { xs: 14, sm: 16 },
							ml: 0.5,
						}}
					>
							{totalPrice.toFixed(2)} 
						</Typography>
					</Box>
					
					{item.quantity > 1 && (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								color: "#666",
								fontSize: { xs: 12, sm: 13 },
								mt: 0.5,
							}}
						>
							<Typography component="span" sx={{ fontSize: "inherit", mr: 1 }}>
								{`${unitPrice.toFixed(2)} × ${item.quantity}`}
					</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default PurchasesCartCard;
