import React, { useState } from "react";
import {
	Box,
	Typography,
	Divider,
	Button,
	IconButton,
	Paper,
	TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PurchasesCartCard from "../components/PurchasesCartCard";
import OrderConfirmationDialog from "../components/OrderConfirmationDialog";
import { categories, menuItems } from "../data/menu";

const deepRed = "#982121";

export default function PurchasesCart() {
	const navigate = useNavigate();
	const { cartItems, getCartTotal, addToCart, updateQuantity, removeFromCart } =
		useCart();
	const subtotal = getCartTotal();
	const deliveryFee = cartItems.length === 0 ? 0 : 20;
	const serviceFee = cartItems.length === 0 ? 0 : 10;
	const total = subtotal + deliveryFee + serviceFee;
	const [showNoteField, setShowNoteField] = useState(false);
	const [note, setNote] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleAdd = (item) => {
		addToCart(item, 1);
	};

	const handleRemove = (item) => {
		const itemId = item.cartItemKey || item.id;
		if (item.quantity > 1) {
			updateQuantity(itemId, item.quantity - 1);
		} else {
			removeFromCart(itemId);
		}
	};

	const toggleNoteField = () => {
		setShowNoteField(!showNoteField);
	};

	const handleOrderContinue = () => {
		if (cartItems.length === 0) {
			// Don't open dialog if cart is empty
			return;
		}
		setDialogOpen(true);
	};

	// Get menu categories excluding weekly_offer
	const suggestedCategories = categories.filter(cat => cat.id !== 'weekly_offer');
	
	// Get one item from each category for suggestions
	const suggestedItems = suggestedCategories.map(category => {
		return menuItems.find(item => item.category === category.id);
	}).filter(Boolean);

	return (
		<Box
			sx={{
				maxWidth: "100%", 
				width: "100%",
				mx: "auto",
				minHeight: "100vh",
				bgcolor: "#FFF",
				pb: 10,
				px: { xs: 1, sm: 2 },
				overflowX: "hidden",
				boxSizing: "border-box",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{/* Order Confirmation Dialog */}
			<OrderConfirmationDialog 
				open={dialogOpen} 
				onClose={() => setDialogOpen(false)} 
				orderNotes={note}
			/>
			
			<Box
				sx={{
					width: "100%",
					maxWidth: { xs: "100%", sm: "85%", md: 900 },
			}}
		>
			{/* Sticky Top Bar */}
			<Paper
				elevation={2}
				sx={{
					position: "sticky",
					top: 0,
					zIndex: 10,
					bgcolor: "#fff",
					px: { xs: 1, sm: 2 },
					py: { xs: 0.5, sm: 1 },
					display: "flex",
					alignItems: "center",
					borderRadius: { xs: 2, sm: 8 },
						width: "100%",
				}}
			>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 900,
						color: deepRed,
						flexGrow: 1,
						textAlign: "left",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						gap: 1,
						fontSize: { xs: 18, sm: 22 },
					}}
				>
					<span>سلة المشتريات</span>
					<IconButton
						onClick={() => navigate(-1)}
						sx={{
							ml: 1,
							border: "1.5px solid #fff",
							bgcolor: " #f7f7f7",
							width: 35,
							height: 35,
						}}
					>
						<ArrowForwardIosIcon sx={{ fontSize: 22 }} />
					</IconButton>
				</Typography>
			</Paper>

			{/* Cart Items List */}
				<Box sx={{ mt: { xs: 1, sm: 2 }, width: "100%" }}>
				{cartItems.length === 0 ? (
					<Typography
						sx={{
							textAlign: "center",
							color: "#888",
							mt: { xs: 2, sm: 4 },
							fontSize: { xs: 15, sm: 18 },
						}}
					>
						سلتك فارغة
					</Typography>
				) : (
					cartItems.map((item) => (
						<PurchasesCartCard
								key={item.cartItemKey || item.id}
							item={item}
							onAdd={handleAdd}
							onRemove={handleRemove}
						/>
					))
				)}
			</Box>

					{/* "You May Also Like" Section */}
			<Box sx={{ mb: 3, width: "100%" , direction: "ltr" }}>
				<Typography
					variant="h6"
					fontWeight={700}
					textAlign={'left'}
					sx={{
						fontSize: { xs: 18, sm: 20 },
						mb: 1.5,
						pr: 1,
						color: "#333"
					}}
				>
					قد تعجبك أيضا...
				</Typography>

				{/* Scrollable items container */}
				<Box 
					sx={{
						display: 'flex',
						flexDirection: 'row',
						overflowX: 'auto',
						gap: 2,
						pb: 2,
						pt: 1,
						px: 1,
						'&::-webkit-scrollbar': {
							height: 8,
						},
						'&::-webkit-scrollbar-track': {
							backgroundColor: '#f1f1f1',
							borderRadius: 10,
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#ccc',
							borderRadius: 10,
						},
					}}
				>
					{suggestedItems.map((item) => (
						<Box 
							key={item.id}
							sx={{
								minWidth: 145,
								maxWidth: 145,
								bgcolor: '#faf8f5',
								borderRadius: 2,
								overflow: 'hidden',
								boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
								transition: 'transform 0.2s',
								'&:hover': {
									transform: 'translateY(-2px)',
									boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
								},
								display: 'flex',
								flexDirection: 'column',
								position: 'relative',
							}}
						>
							{/* Product Image */}
							<Box sx={{ position: 'relative', height: 120 }}>
								<img 
									src={item.image} 
									alt={item.title}
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
									}}
								/>
								
								{/* Add button */}
								<IconButton
									onClick={() => handleAdd(item)}
									sx={{
										position: 'absolute',
										bottom: 8,
										right: 8,
										bgcolor: '#fff',
										color: deepRed,
										boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
										width: 30,
										height: 30,
										'&:hover': {
											bgcolor: '#f9f9f9',
										},
									}}
								>
									<AddIcon fontSize="small" />
								</IconButton>
							</Box>
							
							{/* Product Details */}
							<Box sx={{ p: 1.5, textAlign: 'right' }}>
								<Typography 
									sx={{ 
										fontWeight: 700, 
										fontSize: 14,
										mb: 0.5,
										height: 42,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										display: '-webkit-box',
										WebkitLineClamp: 2,
										WebkitBoxOrient: 'vertical',
									}}
								>
									{item.title}
								</Typography>
								
								<Typography 
									sx={{ 
										color: deepRed,
										fontWeight: 600,
										fontSize: 16,
										display: 'flex',
										justifyContent: 'flex-end',
										alignItems: 'center',
										direction: 'ltr',
									}}
								>
									{item.price.toFixed(2)} 
									<Typography component="span" sx={{ fontSize: 14, mr: 0.5 }}>ج.م</Typography>
									                                                           
								</Typography>
							</Box>
						</Box>
					))}
				</Box>
			</Box>

			               {/* Notes Section */}
				<Box sx={{ mb: 3, width: "100%" }}>
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
							width: "100%",
										}}
										>
										{/* Left side: Icon */}
										

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
						<Box sx={{ position: 'relative', mt: 1, width: "100%" }}>
										{/* Close Icon at top-left */}
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

		

			{/* Payment Summary */}
			<Box
				sx={{
					bgcolor: "#fff",
					borderRadius: 2,
					p: { xs: 1, sm: 2 },
					mb: 2,
					direction: "ltr",
						width: "100%",
				}}
			>
				<Typography
					fontWeight={900}
					fontSize={{ xs: 15, sm: 18 }}
					color={deepRed}
					mb={1}
				>
					ملخص الدفع
				</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
						direction: "ltr",
						fontSize: { xs: 13, sm: 15 },
					}}
				>
					<Typography>المجموع الفرعي </Typography>
					<Typography> {subtotal} ج.م </Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
						direction: "ltr",
						fontSize: { xs: 13, sm: 15 },
					}}
				>
					<Typography>رسوم التوصيل</Typography>
					<Typography>{deliveryFee} ج.م</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
						direction: "ltr",
						fontSize: { xs: 13, sm: 15 },
					}}
				>
					<Typography>رسوم الخدمة</Typography>
					<Typography>{serviceFee} ج.م</Typography>
				</Box>
				<Divider sx={{ my: 1, bgcolor: "#222", opacity: 0.4 }} />
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						fontWeight: 900,
						fontSize: { xs: 15, sm: 18 },
					}}
				>
					<Typography>الإجمالي</Typography>
					<Typography>{total} ج.م</Typography>
					</Box>
				</Box>
			</Box>

			{/* Sticky Bottom Bar */}
			<Paper
				elevation={3}
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					width: "100%",
					zIndex: 20,
					bgcolor: "transparent",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						width: "100%",
						maxWidth: { xs: "100%", sm: "85%", md: 900 },
						display: "flex",
						justifyContent: "center",
						gap: { xs: 2, sm: 6 },
						py: { xs: 1, sm: 2 },
						bgcolor: "rgba(255, 255, 255, 0.85)",
						backdropFilter: "blur(10px)",
						borderRadius: { xs: "8px 8px 0 0", sm: "16px 16px 0 0" },
						boxShadow: 3,
					}}
				>
					<Button
						variant="contained"
						onClick={handleOrderContinue}
						disabled={cartItems.length === 0}
						sx={{
							bgcolor: cartItems.length === 0 ? '#cccccc' : deepRed,
							color: "#fff",
							fontWeight: 900,
							px: { xs: 3, sm: 8 },
							borderRadius: 8,
							fontSize: { xs: 14, sm: 16 },
							"&:hover": { bgcolor: cartItems.length === 0 ? '#cccccc' : "#b71c1c" },
						}}
					>
						تابع للطلب
					</Button>
					<Button
						variant="outlined"
						sx={{
							color: deepRed,
							borderColor: deepRed,
							fontWeight: 900,
							px: { xs: 3, sm: 8 },
							borderRadius: 8,
							bgcolor: "#fff",
							fontSize: { xs: 14, sm: 16 },
							"&:hover": { bgcolor: "#f7f7f7" },
						}}
						onClick={() => navigate("/menu")}
					>
						اضف المزيد
					</Button>
				</Box>
			</Paper>
		</Box>
	);
}
