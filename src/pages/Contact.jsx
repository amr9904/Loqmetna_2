import { Box, Typography, Paper, Link, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const contactInfo = {
	address: "شارع الثورة، مدينة نصر، القاهرة، مصر",
	phone: "+20 100 123 4567",
	whatsapp: "+20 100 123 4567",
	email: "info@loqmetna.com",
	facebook: "https://facebook.com/loqmetn",
	instagram: "https://instagram.com/loqmetn",
};

const Contact = () => (
	<Box
		sx={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "70vh",
			bgcolor: "#f5f5f5",
		}}
	>
		<Paper
			sx={{
				width: { xs: "98vw", sm: "80vw", md: "60vw" },
				maxWidth: 600,
				bgcolor: "#982121",
				color: "#fff",
				borderRadius: { xs: 2, sm: 5 },
				boxShadow: 6,
				p: { xs: 1, sm: 4 },
				textAlign: "right",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: { xs: 1, sm: 2 },
			}}
		>
			<Typography
				variant="h4"
				fontWeight={900}
				sx={{ mb: 2, color: "#ffb80e", fontSize: { xs: 22, sm: 32 } }}
			>
				تواصل معنا
			</Typography>
			<Link
				href="https://www.google.com/maps/search/?api=1&query=شارع الثورة, مدينة نصر, القاهرة, مصر"
				underline="hover"
				sx={{
					color: "#fff",
					fontWeight: 700,
					display: "flex",
					alignItems: "center",
					gap: 1,
					width: "100%",
					justifyContent: "flex-end",
				}}
				target="_blank"
				rel="noopener"
			>
				<LocationOnIcon sx={{ color: "#ffb80e" }} />
				<Typography fontWeight={700} sx={{ fontSize: { xs: 14, sm: 16 } }}>
					شارع الثورة، مدينة نصر، القاهرة، مصر
				</Typography>
			</Link>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
					width: "100%",
					justifyContent: "flex-end",
				}}
			>
				<PhoneIcon sx={{ color: "#ffb80e" }} />
				<Link
					href={`tel:${contactInfo.phone}`}
					underline="hover"
					sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: 14, sm: 16 } }}
				>
					{contactInfo.phone}
				</Link>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
					width: "100%",
					justifyContent: "flex-end",
				}}
			>
				<WhatsAppIcon sx={{ color: "#ffb80e" }} />
				<Link
					href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
					underline="hover"
					sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: 14, sm: 16 } }}
					target="_blank"
					rel="noopener"
				>
					{contactInfo.whatsapp}
				</Link>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
					width: "100%",
					justifyContent: "flex-end",
				}}
			>
				<EmailIcon sx={{ color: "#ffb80e" }} />
				<Link
					href={`mailto:${contactInfo.email}`}
					underline="hover"
					sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: 14, sm: 16 } }}
				>
					{contactInfo.email}
				</Link>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
					mt: 2,
					width: "100%",
					justifyContent: "flex-end",
				}}
			>
				<IconButton
					href={contactInfo.facebook}
					target="_blank"
					rel="noopener"
					sx={{ color: "#ffb80e" }}
				>
					<FacebookIcon />
				</IconButton>
				<IconButton
					href={contactInfo.instagram}
					target="_blank"
					rel="noopener"
					sx={{ color: "#ffb80e" }}
				>
					<InstagramIcon />
				</IconButton>
				<Typography
					fontWeight={700}
					sx={{ color: "#fff", fontSize: { xs: 13, sm: 15 } }}
				>
					تابعنا على مواقع التواصل
				</Typography>
			</Box>
		</Paper>
	</Box>
);

export default Contact;
