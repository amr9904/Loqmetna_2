import React from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const deepRed = "#982121";

const PurchasesCartItemCard = ({ item, onAdd, onRemove }) => {
	return (
		<Paper
			sx={{
				mb: { xs: 1, sm: 2 },
				p: 0,
				borderRadius: 3,
				overflow: "hidden",
				boxShadow: 2,
				position: "relative",
				width: "100%",
			}}
		>
			{/* Image with overlay controls */}
			<Box
				sx={{
					position: "relative",
					width: "100%",
					height: { xs: 80, sm: 120 },
					bgcolor: "#eee",
				}}
			>
				<img
					src={item.image}
					alt={item.title}
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
				/>
				{/* Controls overlay */}
				<Box
					sx={{
						position: "absolute",
						bottom: { xs: 4, sm: 8 },
						left: { xs: 4, sm: 8 },
						display: "flex",
						alignItems: "center",
						bgcolor: "rgba(255,255,255,0.85)",
						borderRadius: 2,
						px: { xs: 0.5, sm: 1 },
					}}
				>
					<IconButton
						onClick={onAdd}
						sx={{
							color: "#fff",
							bgcolor: deepRed,
							width: { xs: 24, sm: 32 },
							height: { xs: 24, sm: 32 },
							"&:hover": { bgcolor: "#b71c1c" },
						}}
					>
						<AddIcon />
					</IconButton>
					<Typography
						sx={{
							fontWeight: 700,
							fontSize: { xs: 14, sm: 18 },
							minWidth: 20,
							textAlign: "center",
							mx: 1,
						}}
					>
						{item.quantity}
					</Typography>
					<IconButton
						onClick={onRemove}
						sx={{
							color: "#fff",
							bgcolor: deepRed,
							width: { xs: 24, sm: 32 },
							height: { xs: 24, sm: 32 },
							"&:hover": { bgcolor: "#b71c1c" },
						}}
					>
						<RemoveIcon />
					</IconButton>
				</Box>
			</Box>
			{/* Info */}
			<Box
				sx={{
					p: { xs: 1, sm: 2 },
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-end",
				}}
			>
				<Typography
					sx={{
						fontWeight: 700,
						color: "#222",
						textAlign: "left",
						fontSize: { xs: 15, sm: 18 },
						width: "100%",
					}}
				>
					{item.title}
				</Typography>
				<Typography
					sx={{
						color: deepRed,
						textAlign: "left",
						fontWeight: 700,
						fontSize: { xs: 13, sm: 16 },
						width: "100%",
					}}
				>
					{item.price} ج.م
				</Typography>
			</Box>
		</Paper>
	);
};

export default PurchasesCartItemCard;
