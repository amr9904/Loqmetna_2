import { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Box,
	Avatar,
	Container,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logo from "../assets/logo.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import AuthModal from "./AuthModal";

const navItems = [{ text: "", path: "/contact", icon: <LocationOnIcon /> }];

const Header = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	// const [authOpen, setAuthOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<>
			<AppBar
				position="fixed"
				elevation={0}
				sx={{
					width: { xs: "100%", sm: "65%" },
					maxWidth: { xs: "100%", sm: 1200 },
					left: 0,
					right: 0,
					mx: "auto",
					marginBottom: 20,
					borderRadius: { xs: 0, sm: 4 },
					overflow: "hidden",
					bgcolor: "#FFFFED",
					borderBottom: "1px solid #eee",
					color: "#982121",
					boxSizing: "border-box",
				}}
			>
				<Container
					maxWidth={false}
					sx={{
						width: "100%",
						maxWidth: "100%",
						mx: 0,
						px: { xs: 1, sm: 3, md: 6 },
					}}
				>
					<Toolbar sx={{ justifyContent: "space-around", px: 0 }}>
						{/* Left side: Search/Share (Menu icon removed) */}
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<IconButton color="inherit" onClick={() => navigate("/search")}>
								<SearchIcon />
							</IconButton>
							{/* <IconButton color="inherit" onClick={() => alert("مشاركة")}> 
								<ShareIcon />
							</IconButton> */}
							<IconButton
								color="inherit"
								component={RouterLink}
								to="/contact"
								sx={{ ml: 1 }}
							>
								<LocationOnIcon />
							</IconButton>
						</Box>
						
						{/* Right side: Main Menu button and Auth */}
						<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							<img
								src={logo}
								alt="شعار المطعم"
								style={{
									width: 96,
									height: 48,
									objectFit: "contain",
									borderRadius: 8,
									boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
									display: "block",
								}}
								
							/>
							<IconButton
						onClick={() => navigate("/menu")}
						sx={{
							ml: 2,
							border: "1.5px solid #fff",
							bgcolor: " #f7f7f7",
							color: "#982121",
							width: 35,
							height: 35,
						}}
					>
						<ArrowForwardIosIcon sx={{ fontSize: 22 }} />
					</IconButton>
						</Box>
						
					</Toolbar>
				</Container>
			</AppBar>

			{/* Mobile drawer */}
			<Drawer
				anchor="right"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				sx={{
					"& .MuiDrawer-paper": {
						width: { xs: "90vw", sm: 320 },
						bgcolor: "#fff",
					},
				}}
			>
				<Box sx={{ pt: { xs: 1, sm: 2 } }}>
					<List>
						{navItems.map((item) => (
							<ListItem
								button
								component={RouterLink}
								to={item.path}
								key={item.text}
								onClick={() => setDrawerOpen(false)}
								sx={{
									py: { xs: 1, sm: 1.5 },
									fontSize: { xs: 15, sm: 18 },
									"&:hover": {
										bgcolor: "transparent",
										color: "secondary.main",
									},
								}}
							>
								<ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>

			{/* Auth Modal */}
			{/*
			<AuthModal
				open={authOpen}
				onClose={() => setAuthOpen(false)}
				language="ar"
			/>
			*/}
		</>
	);
};

export default Header;
