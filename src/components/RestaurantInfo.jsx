import React from "react";
import { Box, Typography, Chip, Avatar, Stack, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { useNavigate } from "react-router-dom";
import TalabatLogo from "../assets/Talabat_logo.svg";
import RestLogo from "../assets/restlogo.png";
import logo from "../assets/logo.svg";
const RestaurantInfo = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Restaurant Card */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: -80, sm: -95, md: -110 },
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 25,
          display: "flex",
          justifyContent: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <Box
          sx={{
            width: "92%",
            bgcolor: "#fff",
            borderRadius: { xs: "20px", sm: "22px", md: "24px" },
            pt: { xs: 2, sm: 2.5, md: 3 },
            pb: { xs: 1, sm: 1.8, md: 2 },
            px: { xs: 1, sm: 3, md: 4 },
            boxShadow: "0px -4px 10px rgba(0,0,0,0.05)",
            direction: "ltr",
          }}
        >
      
          {/* Restaurant Info - Top Section */}
          <Grid container spacing={1.5} alignItems="center">
            {/* Restaurant Logo - Right Side */}
            <Grid item xs={3} sm={2.5} md={2}>
              <Avatar
                sx={{
                  width: { xs: 70, sm: 80, md: 90 },
                  height: { xs: 70, sm: 80, md: 90 },
                  bgcolor: "#f5f5f5",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                src={RestLogo}
                alt="loqmetna"
              />
            </Grid>

            {/* Restaurant Title & Categories - Left Side */}
            <Grid item xs={9} sm={9.5} md={10} sx={{ textAlign: "left" }}>
              <Box
                component="img"
                src={logo}
                alt="شعار المطعم"
                sx={{
                  height: { xs: 32, sm: 40, md: 48 },
                  maxWidth: "180px",
                  objectFit: "contain",
                  display: "block",
                  mb: 1,
                }}
              />
              
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  mb: { xs: 0.5, sm: 0.8, md: 1 },
                  mt: { xs: 0.5, sm: 0.8, md: 1 },  
                  fontWeight: 500,
                  fontSize: { xs: 11, sm: 12, md: 14 },
                  pl:.7 
                }}
              >
                البرجر و الكريب و الشاورما   
              </Typography>

              {/* Rating & Featured Tag */}
              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                  gap: { xs: 0.5, sm: 0.8, md: 1 },
                  mb: { xs: 0.5, sm: 0.8, md: 1 },
                  
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <StarIcon sx={{ color: "#FFD700", fontSize: { xs: 16, sm: 17, md: 18 } }} />
                  <Typography component="span" sx={{ fontWeight: 800, ml: 0.5, fontSize: { xs: 11, sm: 12, md: 14} }}>
                    4.9
                  </Typography>
                  <Typography component="span" sx={{ color: "#666", ml: 0.5, fontSize: { xs: 10, sm: 11, md: 13 } }}>
                    (1,000+)
                  </Typography>
                </Box>
                <Chip
                  label="مميز"
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 152, 0, 0.1)",
                    color: "#ff9800",
                    fontWeight: 700,
                    border: "1px solid #ff9800",
                    borderRadius: 2,
                    fontSize: { xs: 9, sm: 10.5, md: 12 },
                    height: { xs: 18, sm: 20, md: 24 },
                    '& .MuiChip-label': {
                      px: { xs: 1, sm: 1.5 }
                    }
                  }}
                  icon={
                    <Box 
                      component="span" 
                      sx={{ 
                        fontSize: { xs: 12, sm: 14, md: 16 }, 
                        display: "flex", 
                        alignItems: "center",
                      }}
                    >
                      🏆
                    </Box>
                  }
                />
              </Box>
            </Grid>
          </Grid>

          {/* Delivery Info */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              pt: { xs: 0.5, sm: 0.8, md: 1 },
              mt: { xs: 0.5, sm: 0.8, md: 1 },
            }}
          >
            {/* Delivery Time */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 0.8, md: 1 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: 28, sm: 30, md: 34 },
                  height: { xs: 28, sm: 30, md: 34 },
                  borderRadius: "50%",
                  bgcolor: "rgba(0,0,0,0.03)",
                }}
              >
                <AccessTimeIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 }, color: "#666" }} />
              </Box>
              <Typography sx={{ color: "#333", fontWeight: 600, fontSize: { xs: 10, sm: 12, md: 15 } }}>
                15 - 25 دقيقة
              </Typography>
            </Box>

            {/* Delivery Fee */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 0.8, md: 1 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: 28, sm: 30, md: 34 },
                  height: { xs: 28, sm: 30, md: 34 },
                  borderRadius: "50%",
                  bgcolor: "rgba(0,0,0,0.03)",
                }}
              >
                <DeliveryDiningIcon sx={{ fontSize: { xs: 10, sm: 12, md: 15 } , color: "#666" }} />
              </Box>
              <Typography sx={{ color: "#333", fontWeight: 600,fontSize: { xs: 10, sm: 12, md: 15 }  }}>
                16.99 ج.م
              </Typography>
            </Box>

            {/* Powered By Talabat */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-end", sm: "center" },
                gap: { xs: 0, sm: 0.5 },
              }}
            >
              <Typography sx={{ 
                color: "#666", 
                fontSize: { xs: 10, sm: 11, md: 13 },
                fontWeight: 500,
                lineHeight: 1,
                textAlign: { xs: "right", sm: "left" }
              }}>
                التوصيل بواسطة
              </Typography>
              <Box 
                component="img" 
                src={TalabatLogo} 
                alt="Talabat" 
                sx={{ 
                  height: { xs: 12, sm: 13, md: 15 },
                  mt: { xs: 0.5, sm: 0 }
                }} 
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RestaurantInfo; 