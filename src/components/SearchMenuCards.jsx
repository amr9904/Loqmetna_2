import { Box, Typography, Divider, Grid } from "@mui/material";

const SearchMenuCards = ({ items, hideDescription = false, onCardClick }) => (
	<Grid container spacing={{ xs: 2, sm: 3 }}>
		{items.map((item, idx) => (
			<Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
				<Box
					onClick={onCardClick ? () => onCardClick(item) : undefined}
					sx={{
						display: "flex",
						alignItems: "flex-start",
						mb: { xs: 1.5, sm: 2 },
						bgcolor: "#fff",
						borderRadius: 3,
						p: { xs: 1, sm: 2 },
						boxShadow: 1,
						transition: "box-shadow 0.2s, background 0.2s, transform 0.1s",
						cursor: "pointer",
						"&:hover": {
							boxShadow: 8,
							background: "#fff7e6",
							transform: "scale(1.03)",
						},
						width: "100%",
					}}
				>
					{/* Left: Image */}
					<Box
						component="img"
						src={item.image}
						alt={item.title}
						sx={{
							width: { xs: 80, sm: 100 },
							height: { xs: 90, sm: 120 },
							borderRadius: 3,
							objectFit: "cover",
							mr: { xs: 1, sm: 2 },
						}}
					/>
					{/* Right: Info */}
					<Box
						sx={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-end",
						}}
					>
						<Typography
							sx={{
								fontWeight: 700,
								fontSize: { xs: 15, sm: 18 },
								color: "#222",
								mb: 0.5,
								textAlign: "left",
								direction: "ltr",
								width: "100%",
							}}
						>
							{item.title}
						</Typography>
						{!hideDescription && (
							<Typography
								sx={{
									color: "#888",
									fontSize: { xs: 13, sm: 15 },
									mb: 1,
									textAlign: "left",
									direction: "ltr",
									width: { xs: "100%", sm: "50%" },
									maxWidth: { xs: "100%", sm: "50%" },
								}}
							>
								{item.desc}
							</Typography>
						)}

						<Typography
							sx={{
								fontWeight: 700,
								fontSize: { xs: 14, sm: 16 },
								color: "#982121",
								mb: 1,
								textAlign: "left",
								direction: "ltr",
								width: "100%",
							}}
						>
							{item.price}{" "}
							<span style={{ fontWeight: 400, fontSize: 15 }}>ج.م</span>
						</Typography>
					</Box>
				</Box>
				<Divider
					sx={{ width: "100%", bgcolor: "#222", opacity: 0.28, mt: 0.5 }}
				/>
			</Grid>
		))}
	</Grid>
);

export default SearchMenuCards;
