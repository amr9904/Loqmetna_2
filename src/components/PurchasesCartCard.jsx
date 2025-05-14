import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const deepRed = "#982121";

const PurchasesCartCard = ({ item, onAdd, onRemove }) => {
	const imageWidth = 170;
	const imageHeight = 110;
	const buttonContainerWidth = imageWidth * 0.65;

	return (
		<Box
			sx={{
				width: { xs: "98vw", sm: "75%" },
				mx: "auto",
				mb: { xs: 2, sm: 5 },
				mt: { xs: 2, sm: 5 },
				borderRadius: 3,
				overflow: "hidden",
				boxShadow: 1,
				bgcolor: "#f7f7f7",
				display: "flex",
				flexDirection: { xs: "column", sm: "row" },
				alignItems: "center",
				height: { xs: "auto", sm: 120 },
			}}
		>
			{/* Image on the left with buttons at the bottom */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					position: "relative",
					p: { xs: 2, sm: "40px" },
				}}
			>
				<Box
					sx={{
						position: "relative",
						width: { xs: 120, sm: imageWidth },
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
							width: { xs: 80, sm: buttonContainerWidth },
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							bgcolor: "#fff",
							borderRadius: 999,
							px: 1,
							py: 0.2,
							boxShadow: 1,
							zIndex: 2,
						}}
					>
						<IconButton
							onClick={() => onRemove && onRemove(item)}
							sx={{
								color: deepRed,
								bgcolor: "transparent",
								width: { xs: 24, sm: 28 },
								height: { xs: 24, sm: 28 },
								"&:hover": { bgcolor: "#fbe9e7" },
							}}
						>
							<RemoveIcon />
						</IconButton>
						<Typography
							sx={{
								fontWeight: 700,
								fontSize: { xs: 14, sm: 16 },
								minWidth: 20,
								textAlign: "center",
								mx: 1,
								color: deepRed,
							}}
						>
							{item.quantity}
						</Typography>
						<IconButton
							onClick={() => onAdd && onAdd(item)}
							sx={{
								color: deepRed,
								bgcolor: "transparent",
								width: { xs: 24, sm: 28 },
								height: { xs: 24, sm: 28 },
								"&:hover": { bgcolor: "#fbe9e7" },
							}}
						>
							<AddIcon />
						</IconButton>
					</Box>
				</Box>
			</Box>
			{/* Info on the right */}
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: { xs: "center", sm: "flex-start" },
					justifyContent: "center",
					p: { xs: 2, sm: "40px" },
				}}
			>
				<Typography
					sx={{
						fontWeight: 700,
						color: "#222",
						textAlign: { xs: "center", sm: "left" },
						fontSize: { xs: 16, sm: 18 },
						width: "100%",
						mb: 1,
					}}
				>
					{item.title}
				</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: { xs: "center", sm: "flex-end" },
						width: "100%",
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
						{item.price}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default PurchasesCartCard;
