import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const FoodItemCard = ({
	image,
	title,
	desc,
	price,
	badge,
	cardBg = "#fff",
	onClick,
}) => (
	<Card
		onClick={onClick}
		sx={{
			borderRadius: 3,
			boxShadow: 2,
			p: { xs: 1, sm: 1.5 },
			display: "flex",
			flexDirection: "column",
			alignItems: "stretch",
			height: "100%",
			minWidth: { xs: "90vw", sm: 180 },
			maxWidth: { xs: "100vw", sm: 220 },
			width: { xs: "100%", sm: "auto" },
			mx: "auto",
			transition: "box-shadow 0.2s, background 0.2s, transform 0.1s",
			background: cardBg,
			position: "relative",
			cursor: onClick ? "pointer" : "default",
			"&:hover": onClick
				? { boxShadow: 8, background: "#fff7e6", transform: "scale(1.03)" }
				: {},
			"& .food-card-content": {
				transition: "background 0.2s, color 0.2s, font-weight 0.2s",
			},
		}}
	>
		<Box sx={{ position: "relative" }}>
			<CardMedia
				component="img"
				image={image}
				alt={title}
				sx={{
					width: "100%",
					height: { xs: 120, sm: 140 },
					objectFit: "cover",
					borderRadius: 2,
					mb: 2,
				}}
			/>
			{badge && (
				<Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
					<Box
						sx={{
							bgcolor: "#ffb80e",
							color: "#982121",
							px: 1.2,
							py: 0.2,
							borderRadius: 2,
							fontWeight: 700,
							fontSize: { xs: 14, sm: 18 },
						}}
					>
						{badge}
					</Box>
				</Box>
			)}
		</Box>
		<CardContent
			className="food-card-content"
			sx={{
				p: 0,
				pb: "8px!important",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end",
			}}
		>
			<Typography
				variant="subtitle1"
				sx={{
					fontWeight: 700,
					color: "#222",
					textAlign: "left",
					direction: "ltr",
					mb: 0.5,
					width: "100%",
					whiteSpace: { xs: "normal", sm: "nowrap" },
					overflow: "hidden",
					textOverflow: "ellipsis",
					fontSize: { xs: 16, sm: 18 },
				}}
			>
				{title}
			</Typography>
			{desc && (
				<Typography
					variant="body2"
					sx={{
						color: "#888",
						textAlign: "left",
						direction: "ltr",
						mb: 1,
						fontSize: { xs: 13, sm: 14 },
						minHeight: 32,
						width: "100%",
					}}
				>
					{desc}
				</Typography>
			)}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "row-reverse", // تجعل السعر على اليمين والعملة على اليسار
					width: "100%",
					mt: 0.5,
				}}
			>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 700,
						color: "#982121",
						textAlign: "left",
					}}
				>
					{price}
				</Typography>
				<Typography
					sx={{
						fontSize: { xs: 16, sm: 20 },
						fontWeight: 400,
						color: "#982121",
						ml: 0.5,
					}}
				>
					ج.م
				</Typography>
			</Box>
		</CardContent>
	</Card>
);

export default FoodItemCard;
