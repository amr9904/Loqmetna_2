import { useMemo } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import Header from "./components/Header";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import SearchMenu from "./pages/SearchMenu";
import PurchasesCart from "./pages/purchasesCart";

import "@fontsource/cairo/400.css";
import "@fontsource/cairo/500.css";
import "@fontsource/cairo/700.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Container } from "@mui/material";
import { CartProvider } from "./context/CartContext";

function AppContent() {
	const location = useLocation();
	const showHeaderOnlyOnContact = location.pathname === "/contact";
	const isMenuPage = location.pathname === "/" || location.pathname === "/menu";
	const isPurchasesCartPage = location.pathname === "/purchasesCart";
	
	return (
		<>
			{showHeaderOnlyOnContact && (
				<Box
					sx={{ width: { xs: "98vw", sm: "65vw" }, mx: "auto", maxWidth: 1200 } }
				>
					<Header />
				</Box>
			)}
			<Container
				maxWidth={false}
				disableGutters={isMenuPage || isPurchasesCartPage}
				sx={{
					width: { xs: "98vw", sm: "65vw" },
					maxWidth: { sm: 1200 },
					mx: "auto",
					bgcolor: "#fff",
					borderRadius: showHeaderOnlyOnContact ? 4 : 0,
					boxShadow: showHeaderOnlyOnContact ? 3 : 0,
					px: (isMenuPage || isPurchasesCartPage) ? 0 : { xs: 1, sm: 3, md: 6 },
					py: (isMenuPage || isPurchasesCartPage) ? 0 : (showHeaderOnlyOnContact ? { xs: 1, sm: 3, md: 4 } : 0),
					minHeight: "80vh",
					mt: showHeaderOnlyOnContact ? 4 : 0,
					overflow: "hidden",
					p: (isMenuPage || isPurchasesCartPage) ? 0 : undefined,
				}}
			>
				<main style={{ width: "100%" }}>
					<Routes>
						<Route path="/" element={<Menu />} />
						<Route path="/menu" element={<Menu />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/search" element={<SearchMenu />} />
						<Route path="/purchasesCart" element={<PurchasesCart />} />
					</Routes>
				</main>
			</Container>
		</>
	);
}

function App() {
	const theme = useMemo(
		() =>
			createTheme({
				direction: "rtl",
				palette: {
					primary: {
						main: "#982121",
						light: "#e32929",
						dark: "#813531",
					},
					secondary: {
						main: "#ff611d",
						light: "#ffb80e",
					},
				},
				typography: {
					fontFamily: '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif',
				},
				components: {
					MuiCssBaseline: {
						styleOverrides: {
							body: {
								scrollbarColor: "#6b6b6b #2b2b2b",
								"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
									backgroundColor: "#2b2b2b",
								},
								"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
									borderRadius: 8,
									backgroundColor: "#6b6b6b",
									minHeight: 24,
									border: "3px solid #2b2b2b",
								},
								"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
									{
										backgroundColor: "#959595",
									},
							},
						},
					},
				},
			}),
		[]
	);

	const cacheRtl = useMemo(
		() =>
			createCache({
				key: "muirtl",
				stylisPlugins: [prefixer, rtlPlugin],
			}),
		[]
	);

	return (
		<CacheProvider value={cacheRtl}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<CartProvider>
					<Router>
						<AppRouter />
					</Router>
				</CartProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

function AppRouter() {
	const location = useLocation();
	const isContactPage = location.pathname === "/contact";
	const isMenuPage = location.pathname === "/" || location.pathname === "/menu";
	const isPurchasesCartPage = location.pathname === "/purchasesCart";
	
	return (
		<Box
			sx={{
				minHeight: "100vh",
				width: "100vw",
				bgcolor: "#f5f5f5",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				pt: 0,
				pb: { xs: 8, sm: 10 },
				boxSizing: "border-box",
				m: 0,
				p: isMenuPage || isPurchasesCartPage ? 0 : undefined,
			}}
		>
			<AppContent />
		</Box>
	);
}

export default App;
