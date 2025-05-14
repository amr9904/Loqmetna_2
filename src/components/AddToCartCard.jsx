import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	IconButton,
	Button,
	TextField,
	Slide,
	Backdrop,
	Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext";
import foodImage from "../assets/download.jpeg";

const AddToCartCard = ({ open, onClose, food }) => {
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [note, setNote] = useState("");

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
			setQuantity(1);
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	if (!food) return null;

	const deepRed = "#982121";
	const totalPrice = food.price * quantity;

	const handleAdd = () => {
		addToCart({ ...food }, quantity, note);
		onClose();
	};

	const handleQuantity = (delta) => {
		setQuantity((q) => Math.max(1, q + delta));
	};

	return (
		<>
			<Backdrop
				open={open}
				sx={{ zIndex: 1200, bgcolor: "rgba(0,0,0,0.35)" }}
				onClick={onClose}
			/>
			<Slide direction="up" in={open} mountOnEnter unmountOnExit>
				<Box
					sx={{
						position: "fixed",
						bottom: 0,
						left: 0,
						width: "100%",
						zIndex: 1300,
						display: "flex",
						justifyContent: "center",
						pb: { xs: 1, md: 3 },
						px: { xs: 0.5, sm: 2 },
					}}
				>
					<Paper
						elevation={10}
						sx={{
							width: { xs: "100%", sm: 500 },
							maxWidth: { xs: "98vw", sm: 500 },
							borderRadius: 4,
							overflow: "hidden",
							boxShadow: 8,
							bgcolor: "#fff",
							direction: "ltr",
							overflowX: "hidden",
						}}
					>
						{/* Image */}
						<Box
							sx={{
								position: "relative",
								height: { xs: 120, sm: 200 },
								width: "100%",
							}}
						>
							<img
								src={foodImage}
								alt={food.title}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
							<IconButton
								onClick={onClose}
								sx={{
									position: "absolute",
									top: 8,
									right: 8,
									bgcolor: "#fff",
									color: deepRed,
									boxShadow: 1,
								}}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</Box>

						{/* Content */}
						<Box sx={{ p: { xs: 1, sm: 2 } }}>
							{/* Title */}
							<Typography
								variant="h6"
								fontWeight={900}
								color={deepRed}
								sx={{
									textAlign: "left",
									direction: "ltr",
									fontSize: { xs: 16, sm: 20 },
								}}
							>
								{food.title}
							</Typography>

							{/* Notes */}
							<Typography
								variant="subtitle1"
								color="#000"
								fontWeight={700}
								sx={{
									mb: 1,
									textAlign: "left",
									marginTop: "10px",
									direction: "ltr",
									fontSize: { xs: 13, sm: 16 },
								}}
							>
								ملاحظات إضافية
							</Typography>

							<TextField
								fullWidth
								variant="outlined"
								placeholder="هل تود أن تخبرنا أي شيء؟"
								value={note}
								onChange={(e) => setNote(e.target.value)}
								sx={{
									bgcolor: "#f7f7f7",
									borderRadius: 8,
									fontSize: { xs: 13, sm: 16 },
									"& .MuiOutlinedInput-input": {
										textAlign: "left",
										direction: "ltr",
										fontSize: { xs: 13, sm: 16 },
									},
								}}
							/>

							{/* Footer */}
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: { xs: 1, sm: 2 },
									mt: 3,
									flexDirection: { xs: "column", sm: "row" },
								}}
							>
								{/* Quantity */}
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										px: 1.5,
										py: 0.5,
										border: "none",
										outline: "none",
										boxShadow: "none",
										background: "none",
									}}
								>
									<Button
										onClick={() => handleQuantity(-1)}
										disabled={quantity === 1}
										variant="text"
										disableRipple
										disableElevation
										sx={{
											minWidth: 0,
											color: quantity === 1 ? "#ccc" : deepRed,
											fontSize: { xs: 22, sm: 32 },
											fontWeight: 900,
											px: { xs: 1, sm: 2 },
											border: "none",
											outline: "none",
											boxShadow: "none",
											background: "none",
										}}
									>
										-
									</Button>
									<Typography
										fontWeight={900}
										fontSize={{ xs: 18, sm: 24 }}
										color="#222"
										sx={{ mx: 1 }}
									>
										{quantity}
									</Typography>
									<Button
										onClick={() => handleQuantity(1)}
										variant="text"
										disableRipple
										disableElevation
										sx={{
											minWidth: 0,
											color: deepRed,
											fontSize: { xs: 22, sm: 32 },
											fontWeight: 900,
											px: { xs: 1, sm: 2 },
											border: "none",
											outline: "none",
											boxShadow: "none",
											background: "none",
										}}
									>
										+
									</Button>
								</Box>

								{/* Add to Cart */}
								<Button
									variant="contained"
									onClick={handleAdd}
									fullWidth
									sx={{
										bgcolor: deepRed,
										borderRadius: 10,
										py: { xs: 1, sm: 1.5 },
										fontWeight: 900,
										fontSize: { xs: 15, sm: 18 },
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										gap: { xs: 1, sm: 1.5 },
										"&:hover": {
											bgcolor: "#ffb80e",
										},
									}}
								>
									أضف للسلة
									<Typography fontSize={16} fontWeight={700}>
										{totalPrice.toFixed(2)} ج.م
									</Typography>
								</Button>
							</Box>
						</Box>
					</Paper>
				</Box>
			</Slide>
		</>
	);
};

export default AddToCartCard;
