import React from "react";
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
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PurchasesCartCard from "../components/PurchasesCartCard";


const deepRed = "#982121";

export default function PurchasesCart() {
	const navigate = useNavigate();
	const { cartItems, getCartTotal, addToCart, updateQuantity, removeFromCart } =
		useCart();
	const subtotal = getCartTotal();
	const deliveryFee = cartItems.length === 0 ? 0 : 20;
	const serviceFee = cartItems.length === 0 ? 0 : 10;
	const total = subtotal + deliveryFee + serviceFee;

	const handleAdd = (item) => {
		addToCart(item, 1);
	};

	const handleRemove = (item) => {
		if (item.quantity > 1) {
			updateQuantity(item.id, item.quantity - 1);
		} else {
			removeFromCart(item.id);
		}
	};

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: 1200,
				mx: "auto",
				minHeight: "100vh",
				bgcolor: "#FFF",
				pb: 10,
				px: { xs: 0.5, sm: 2 },
				overflowX: "hidden",
				boxSizing: "border-box",
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
			<Box sx={{ mt: { xs: 1, sm: 2 } }}>
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
							key={item.id}
							item={item}
							onAdd={handleAdd}
							onRemove={handleRemove}
						/>
					))
				)}
			</Box>

			{/* Notes Section */}
			<Box sx={{ mt: { xs: 2, sm: 3 }, mb: { xs: 1, sm: 2 } }}>
				<Typography
					variant="subtitle1"
					color="#000"
					fontWeight={700}
					sx={{
						mb: 1,
						textAlign: "left",
						marginTop: "10px",
						direction: "ltr",
						fontSize: { xs: 14, sm: 16 },
					}}
				>
					ملاحظات إضافية
				</Typography>
				<TextField
					fullWidth
					variant="outlined"
					placeholder="هل تود أن تخبرنا أي شيء؟"
					sx={{
						bgcolor: "#f7f7f7",
						borderRadius: 8,
						"& .MuiOutlinedInput-input": {
							textAlign: "left",
							direction: "ltr",
							fontSize: { xs: 13, sm: 15 },
						},
					}}
				/>
			</Box>

			{/* Payment Summary */}
			<Box
				sx={{
					bgcolor: "#fff",
					borderRadius: 2,
					p: { xs: 1, sm: 2 },
					mb: 2,
					direction: "ltr",
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

			{/* Sticky Bottom Bar */}
			<Paper
				elevation={3}
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					width: "100vw",
					zIndex: 20,
					bgcolor: "transparent",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						width: { xs: "98vw", sm: "75vw", md: "65vw" },
						maxWidth: { xs: "98vw", sm: "75vw", md: "65vw" },
						display: "flex",
						justifyContent: "center",
						gap: { xs: 2, sm: 6 },
						py: { xs: 1, sm: 2 },
						bgcolor: "#fff",
						borderRadius: { xs: 2, sm: 8 },
						boxShadow: 3,
					}}
				>
					<Button
						variant="contained"
						sx={{
							bgcolor: deepRed,
							color: "#fff",
							fontWeight: 900,
							px: { xs: 3, sm: 8 },
							borderRadius: 8,
							fontSize: { xs: 14, sm: 16 },
							"&:hover": { bgcolor: "#b71c1c" },
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
