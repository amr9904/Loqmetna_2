import React from "react";
import { Box, Typography, Divider } from "@mui/material";


const FoodListItem = ({ item, onClick }) => {
  const { image, title, desc, price, badge } = item;

  const isWeeklyOffer = item.category === "weekly_offer" && badge && /%/.test(badge);
  let discountedPrice = null;
  let discountPercent = null;
  if (isWeeklyOffer) {
    // Extract percent from badge like 'خصم 25%'
    const match = badge.match(/(\d+)%/);
    if (match) {
      discountPercent = parseInt(match[1], 10);
      discountedPrice = (price * (1 - discountPercent / 100)).toFixed(2);
    }
  }

  return (
    <Box sx={{ width: "100%", mb: { xs: 2, sm: 3 } }}>
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: { xs: 2, sm: 3 },
          cursor: "pointer",
          transition: "background-color 0.2s, box-shadow 0.3s, transform 0.3s",
          animation: "fadeSlideIn 0.7s cubic-bezier(.4,2,.6,1) both",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          borderRadius: 8,
          "&:hover": {
            backgroundColor: "#fff7e6",
            boxShadow: "0 8px 25px rgba(152, 33, 33, 0.13)",
            transform: "translateY(-6px) scale(1.02)",
          },
          direction: "rtl",
        }}
      >
        {/* Image (Left Side) */}
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: { xs: 110, sm: 140 },
              height: { xs: 90, sm: 130 },
              borderRadius: 2,
              objectFit: "cover",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
          
          {/* Badge */}
          {badge && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                bgcolor: "#ffb80e",
                color: "#982121",
                fontSize: { xs: 12, sm: 14 },
                fontWeight: 700,
                py: 0.3,
                px: 0.8,
                borderRadius: 1,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                zIndex: 1,
              }}
            >
              {badge}
            </Box>
          )}
        </Box>
        
        {/* Content (Right Side) */}
        <Box sx={{ pl: { xs: 2, sm: 3 }, flex: 1 }}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: 18, sm: 20 },
              fontWeight: 700,
              mb: 1,
              color: "#333",
              textAlign: "left",
            }}
          >
            {title}
          </Typography>
          
          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: 14, sm: 15 },
              color: "#666",
              mb: 1.5,
              lineHeight: 1.4,
              textAlign: "left",
            }}
          >
            {desc}
          </Typography>
          
          {/* Price */}
          {isWeeklyOffer && discountedPrice ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
                flexDirection: "row-reverse",
                justifyContent: "flex-start",
              }}
            >
              {/* Old Price (strikethrough, gray) */}
              <Box sx={{ display: "inline-flex", alignItems: "center", direction: "ltr" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    color: "#888",
                    fontSize: { xs: 16, sm: 18 },
                    textDecoration: "line-through",
                    opacity: 0.7,
                  }}
                >
                  {price.toFixed(2)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    color: "#888",
                    fontSize: { xs: 14, sm: 16 },
                    ml: 0.5,
                    textDecoration: "line-through",
                    opacity: 0.7,
                  }}
                >
                  ج.م
                </Typography>
              </Box>

              {/* New Price (highlighted) */}
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  direction: "ltr",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 2,
                    height: 8,
                    bgcolor: "#ffeb3b",
                    borderRadius: 2,
                    zIndex: 0,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 900,
                    color: "#982121",
                    fontSize: { xs: 20, sm: 22 },
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {discountedPrice}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    color: "#982121",
                    fontSize: { xs: 16, sm: 18 },
                    ml: 0.5,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  ج.م
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", // ✅ aligns the whole box to the left
    direction: "ltr",              // ✅ ensures number appears before ج.م
  }}
>
  <Typography
    variant="body1"
    sx={{
      fontWeight: 900,
      color: "#982121",
      fontSize: { xs: 20, sm: 22 },
    }}
  >
    {price.toFixed(2)}
  </Typography>
  <Typography
    variant="body1"
    sx={{
      fontWeight: 700,
      color: "#982121",
      fontSize: { xs: 16, sm: 18 },
      ml: 0.5,
    }}
  >
    ج.م
  </Typography>
</Box>

          )}

        </Box>
      </Box>
      
    </Box>
  );
};

export default FoodListItem; 