import React from "react";
import { Box, Typography } from "@mui/material";

const CategorySection = ({ title, icon }) => {
  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 2, sm: 3 },
        pb: { xs: 1, sm: 1.5 },
        direction: "ltr",
        backgroundColor: "#f8f8f8",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontSize: { xs: 20, sm: 24 },
          fontWeight: 700,
          color: "#333",
          display: "flex",
          alignItems: "center",
          pb: 1,
          textAlign: "left",
        }}
      >
        {icon && (
          <span style={{ marginRight: 8, fontSize: '110%' }}>{icon}</span>
        )}
        {title}
      </Typography>
    </Box>
  );
};

export default CategorySection; 