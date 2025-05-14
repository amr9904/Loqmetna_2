import { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Box,
	Typography,
	Tabs,
	Tab,
} from "@mui/material";

const AuthModal = ({ open, onClose }) => {
	const [tab, setTab] = useState("login");

	const handleTabChange = (event, newValue) => {
		setTab(newValue);
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogTitle
				sx={{
					textAlign: "center",
					fontWeight: 900,
					color: "#982121",
					fontStyle: "italic",
					fontFamily: "Noto Kufi Arabic, Cairo, sans-serif",
					fontSize: { xs: 20, sm: 26 },
				}}
			>
				{tab === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
			</DialogTitle>
			<DialogContent sx={{ px: { xs: 1, sm: 3 }, py: { xs: 1, sm: 2 } }}>
				<Tabs
					value={tab}
					onChange={handleTabChange}
					centered
					sx={{
						mb: 2,
						"& .MuiTab-root": {
							fontWeight: 700,
							color: "#982121",
							fontSize: { xs: 14, sm: 16 },
						},
						"& .Mui-selected": { color: "#ff611d" },
					}}
				>
					<Tab label="تسجيل الدخول" value="login" />
					<Tab label="إنشاء حساب" value="register" />
				</Tabs>
				<Box
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: { xs: 1.5, sm: 2 },
					}}
				>
					{tab === "register" && (
						<TextField
							label="الاسم الكامل"
							fullWidth
							variant="outlined"
							size="small"
						/>
					)}
					<TextField
						label="البريد الإلكتروني"
						fullWidth
						variant="outlined"
						type="email"
						size="small"
					/>
					<TextField
						label="كلمة المرور"
						fullWidth
						variant="outlined"
						type="password"
						size="small"
					/>
				</Box>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: "space-between",
					px: { xs: 1, sm: 3 },
					pb: { xs: 1, sm: 2 },
				}}
			>
				<Button
					onClick={onClose}
					color="inherit"
					sx={{ fontWeight: 700, fontSize: { xs: 13, sm: 15 } }}
				>
					إغلاق
				</Button>
				<Button
					variant="contained"
					color="primary"
					sx={{ fontWeight: 700, fontSize: { xs: 13, sm: 15 } }}
				>
					إرسال
				</Button>
			</DialogActions>
			<Box sx={{ textAlign: "center", pb: { xs: 1, sm: 2 } }}>
				<Button
					color="secondary"
					onClick={() => setTab(tab === "login" ? "register" : "login")}
					sx={{ fontWeight: 700, fontSize: { xs: 13, sm: 15 } }}
				>
					{tab === "login" ? "إنشاء حساب جديد" : "لديك حساب؟ تسجيل الدخول"}
				</Button>
			</Box>
		</Dialog>
	);
};

export default AuthModal;
