import React from "react";
import { Box, Typography } from "@mui/material";

const deepRed = "#982121";
const yellow = "#FFBC11";

const StickyCartBar = ({ total = 0, quantity = 0, onClick }) => {
	if (!quantity || quantity <= 0) return null;
	return (
		<Box
			sx={{
				position: "fixed",
				left: "50%",
				bottom: 0,
				zIndex: 2000,
				width: { xs: "98vw", sm: "98vw" },
				maxWidth: 1200,
				transform: "translateX(-50%)",
				display: "flex",
				justifyContent: "center",
				bgcolor: "transparent",
				py: { xs: 1, sm: 2 },
			}}
		>
			<Box
				onClick={onClick}
				sx={{
					width: "100%",
					maxWidth: 700,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					bgcolor: yellow,
					borderRadius: 9999,
					boxShadow: 3,
					px: { xs: 2, sm: 4 },
					py: { xs: 0.5, sm: 0.9 },
					cursor: "pointer",
					overflow: "hidden",
					flexDirection: "row",
				}}
			>
				{/* Price and Quantity (left) */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						paddingRight: { xs: 2, sm: 4, md: 6 },
						order: 1,
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							flexDirection: "row",
							gap: 0.5,
						}}
					>
						<Typography
							sx={{
								fontWeight: 700,
								color: deepRed,
								fontSize: { xs: 14, sm: 18 },
							}}
						>
							ج.م
						</Typography>
						<Typography
							sx={{
								fontWeight: 900,
								color: deepRed,
								fontSize: { xs: 16, sm: 22 },
							}}
						>
							{Number(total).toFixed(2)}
						</Typography>
					</Box>

					<Box
						sx={{
							width: { xs: 28, sm: 40 },
							height: { xs: 28, sm: 40 },
							borderRadius: "50%",
							bgcolor: "#fffde7",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							ml: { xs: 1, sm: 2.5 },
							mr: { xs: 0.5, sm: 1.5 },
						}}
					>
						<Typography
							sx={{
								color: deepRed,
								fontWeight: 700,
								fontSize: { xs: 14, sm: 20 },
							}}
						>
							{quantity}
						</Typography>
					</Box>
				</Box>

				{/* View Cart Text (right) */}
				<Typography
					sx={{
						color: deepRed,
						fontWeight: 900,
						fontSize: { xs: 16, sm: 22 },
						paddingRight: { xs: 2, sm: 4, md: 6 },
						order: 2,
						textAlign: "right",
					}}
				>
					اطلع على  سلتك 
				</Typography>
			</Box>
		</Box>
	);
};

export default StickyCartBar;
