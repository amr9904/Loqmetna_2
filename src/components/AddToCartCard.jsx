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
	Checkbox,
	Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useCart } from "../context/CartContext";
// Import all necessary assets properly
import foodImage from "../assets/download.jpeg";

const AddToCartCard = ({ open, onClose, food }) => {
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [note, setNote] = useState("");
	const [selectedExtras, setSelectedExtras] = useState([]);
	const [showNoteField, setShowNoteField] = useState(false);

	// Mock extras data - would come from API/backend
	const extras = [
		{ id: 1, name: "جبنة", price: 20.00 },
		{ id: 2, name: "مسطردة", price: 20.00 },
		{ id: 3, name: "مايونيز برجر كينج", price: 20.00 },
		{ id: 4, name: "جبنة سويسرية", price: 20.00 },
		{ id: 5, name: "شريحة برجر", price: 40.00 },
		{ id: 6, name: "شريحة برجر وابر", price: 100.00 },
		{ id: 7, name: "شرائح هالبينو", price: 5.00 },
	];

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
			setQuantity(1);
			setSelectedExtras([]);
			setShowNoteField(false);
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	if (!food) return null;

	const deepRed = "#982121";
	// Calculate discounted price for weekly_offer
	let displayPrice = food.price;
	if (food.category === "weekly_offer" && food.badge && /%/.test(food.badge)) {
		const match = food.badge.match(/(\d+)%/);
		if (match) {
			const discountPercent = parseInt(match[1], 10);
			displayPrice = Number((food.price * (1 - discountPercent / 100)).toFixed(2));
		}
	}

	// Calculate total price including extras
	const extrasTotal = selectedExtras.reduce((sum, id) => {
		const extra = extras.find(e => e.id === id);
		return sum + (extra ? extra.price : 0);
	}, 0);
	
	const totalPrice = (displayPrice + extrasTotal) * quantity;

	const handleAdd = () => {
		// Pass the discounted price if it's a weekly offer along with selected extras
		const selectedExtrasData = extras.filter(extra => selectedExtras.includes(extra.id));
		addToCart(
			{ ...food, price: displayPrice, selectedExtras: selectedExtrasData }, 
			quantity, 
			note
		);
		onClose();
	};

	const handleQuantity = (delta) => {
		setQuantity((q) => Math.max(1, q + delta));
	};

	const handleExtraToggle = (extraId) => {
		setSelectedExtras(prev => {
			if (prev.includes(extraId)) {
				return prev.filter(id => id !== extraId);
			} else {
				return [...prev, extraId];
			}
		});
	};

	const toggleNoteField = () => {
		setShowNoteField(!showNoteField);
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
						maxHeight: "90vh",
					}}
				>
					<Paper
						elevation={10}
						sx={{
							width: { xs: "100%", sm: 550 },
							maxWidth: { xs: "98vw", sm: 550 },
							borderRadius: 4,
							overflow: "hidden",
							boxShadow: 8,
							bgcolor: "#fff",
							direction: "rtl", // Changed to RTL for Arabic
							overflowY: "auto",
							maxHeight: "90vh",
						}}
					>
						{/* Image */}
						<Box
							sx={{
								position: "relative",
								width: "100%",
								paddingTop: "60%", // This creates a responsive aspect ratio box
							}}
						>
							<Box
								sx={{
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									overflow: "hidden",
							}}
						>
							<img
									src={food.image || foodImage}
								alt={food.title}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
										objectPosition: "center",
								}}
							/>
							</Box>
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
						<Box sx={{ p: { xs: 2, sm: 3 } }}>
							{/* Title */}
							<Typography
								variant="h6"
								fontWeight={900}
								color={deepRed}
								sx={{
									textAlign: "left",
									direction: "rtl",
									fontSize: { xs: 18, sm: 22 },
									mb: 3,
								}}
							>
								{food.title}
							</Typography>

							{/* Extras/Additions Section */}
							<Box sx={{ mb: 3 }}>
								<Box sx={{ 
									display: 'flex', 
									justifyContent: 'space-between', 
									alignItems: 'center',
									mb: 1 
								}}>
									<Box sx={{ 
										bgcolor: '#f5f5f5', 
										borderRadius: '30px',
										px: 2,
										py: 0.5,
										display: 'inline-block'
									}}>
										<Typography variant="body2" fontWeight={500} sx={{ fontSize: 14 }}>
											إختياري
										</Typography>
									</Box>
							<Typography
										variant="h6"
								fontWeight={700}
								sx={{
											fontSize: { xs: 20, sm: 24 },
										}}
									>
										إضافات
									</Typography>
								</Box>
								
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{
									textAlign: "left",
										mb: 2,
										fontSize: { xs: 13, sm: 14 },
									}}
								>
							            إختر حتى 7 اصناف
								</Typography>

								{/* Extras List */}
								<Box>
									{extras.map((extra, index) => (
										<React.Fragment key={extra.id}>
											<Box 
												sx={{ 
													display: 'flex', 
													justifyContent: 'space-between',
													alignItems: 'center',
													py: 1.5
												}}
											>
												<Box sx={{ display: 'flex-end', alignItems: 'center' }}>
												<Checkbox
														checked={selectedExtras.includes(extra.id)}
														onChange={() => handleExtraToggle(extra.id)}
														sx={{
															color: '#aaa',
															'&.Mui-checked': {
																color: deepRed,
															},
														}}
													/>
													<Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
													<Typography sx={{ color: '#666', fontSize: { xs: 13, sm: 14 }, mr: 0.5 }} paddingLeft={.5}>
															 (ج.م     
														</Typography>
														<Typography sx={{ color: '#666', fontSize: { xs: 13, sm: 14 } }}>
														  { extra.price.toFixed(2) }+)
														</Typography>
														
														</Box>

													
												</Box>
												<Typography 
													sx={{ 
														fontWeight: selectedExtras.includes(extra.id) ? 700 : 500,
														fontSize: { xs: 15, sm: 16 }
													}}
												>
													{extra.name}
												</Typography>
											</Box>
											{index < extras.length - 1 && <Divider />}
										</React.Fragment>
									))}
								</Box>
							</Box>

							{/* Notes Section */}
							<Box sx={{ mb: 3 }}>
									<Typography
										variant="h6"
										fontWeight={700}
										textAlign={'left'}
										sx={{
										fontSize: { xs: 18, sm: 20 },
										mb: 1.5,
								}}
							>
								ملاحظات إضافية
							</Typography>

									{!showNoteField ? (
										<Box
										onClick={toggleNoteField}
										sx={{
											display: 'flex',
											alignItems: 'center',
											border: '1px solid #eee',
											borderRadius: 2,
											p: 2,
											cursor: 'pointer',
											transition: 'background-color 0.3s',
											'&:hover': {
											backgroundColor: '#f9f9f9',
											},
											direction: 'rtl', // لضبط الترتيب داخل الـ Box
											
										}}
										>
										{/* Right side: Texts */}
										<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1, pr: 2 }}>
											{/* الأيقونة مع "دُون ملاحظة" في نفس السطر */}
											<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<Typography fontWeight={600} sx={{ fontSize: 15 }} paddingLeft={1}> 
												دون ملاحظة
												</Typography>
												
												<ChatBubbleOutlineIcon sx={{ fontSize: 22, color: '#999', ml: 1 }} />
												
											</Box>

											{/* النص الثاني */}
											<Typography
												sx={{
												color: '#888',
												fontSize: 14,
												mt: 0.5,
												}}
											>
												هل تود أن تخبرنا أي شيء آخر؟
											</Typography>
											</Box>

										</Box>
									) : (
										<Box sx={{ position: 'relative', mt: 1 }}>
										{/* Close Icon at top-right */}
										<Button
										  onClick={() => {
											setShowNoteField(false);
											setNote("");
										  }}
										  sx={{
											position: 'absolute',
											top: 8,
											right: 8,
											color: '#999',
											minWidth: 'auto',
											p: 0,
											zIndex: 1,
										  }}
										>
										  <CloseIcon fontSize="small" />
										</Button>
									  
										{/* Text Field */}
							<TextField
								fullWidth
										  multiline
										  rows={3}
								variant="outlined"
										  placeholder="هل تود أن تخبرنا أي شيء آخر؟"
								value={note}
								onChange={(e) => setNote(e.target.value)}
								sx={{
											bgcolor: "#f9f9f9",
											borderRadius: 2,
											"& .MuiOutlinedInput-root": {
											  borderRadius: 2,
											},
									"& .MuiOutlinedInput-input": {
										textAlign: "left",
										direction: "ltr",
											  fontSize: { xs: 14, sm: 15 },
											  py: 1.5,
									},
								}}
										  autoFocus
							/>
									  </Box>
									)}
								</Box>

							{/* Footer */}
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									mt: 3,
									flexDirection: "row",
									width: "100%",
								}}
							>
								{/* Quantity */}
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										border: "1px solid #eee",
										borderRadius: 50,
										height: 48,
										width: { xs: "35%", sm: "30%" },
										mr: { xs: 1, sm: 2 },
									}}
								>
									<Box
										onClick={() => handleQuantity(1)}
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: deepRed,
											fontSize: { xs: 22, sm: 24 },
											fontWeight: 700,
											width: "33%",
											height: "100%",
											cursor: "pointer",
											userSelect: "none",
										}}
									>
										+
									</Box>
									<Typography
										fontWeight={700}
										fontSize={{ xs: 16, sm: 18 }}
										color="#333"
										sx={{ 
											width: "34%", 
											textAlign: "center",
											userSelect: "none",
										}}
									>
										{quantity}
									</Typography>
									<Box
										onClick={() => quantity > 1 && handleQuantity(-1)}
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: quantity === 1 ? "#ccc" : deepRed,
											fontSize: { xs: 22, sm: 24 },
											fontWeight: 700,
											width: "33%",
											height: "100%",
											cursor: quantity === 1 ? "default" : "pointer",
											userSelect: "none",
										}}
									>
										-
									</Box>
								</Box>

								{/* Add to Cart */}
								<Button
									variant="contained"
									onClick={handleAdd}
									sx={{
										bgcolor: deepRed,
										borderRadius: 50,
										height: 48,
										fontWeight: 900,
										fontSize: { xs: 15, sm: 16 },
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										px: 3,
										width: { xs: "65%", sm: "70%" },
										"&:hover": {
											bgcolor: "#c11c1c",
										},
										boxShadow: 2,
									}}
								>
									<Typography fontSize={{ xs: 14, sm: 16 }} fontWeight={700}>
										ج.م {totalPrice.toFixed(2)}
									</Typography>

									<Typography fontSize={{ xs: 14, sm: 16 }} fontWeight={700}>
									أضف للسلة
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
