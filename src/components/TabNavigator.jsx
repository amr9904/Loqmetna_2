import React from "react";
import { Box, Tab, Tabs } from "@mui/material";

const TabNavigator = ({ categories, selectedCategory, handleCategoryChange }) => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
        marginBottom: { xs: 1, sm: 1.5, md: 2 },
        marginTop: { xs: .5, sm: 1, md: 2 },
      }}
    >
      <Tabs
        value={selectedCategory}
        onChange={handleCategoryChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          direction: "ltr",
          "& .MuiTabs-indicator": {
            bgcolor: "#982121",
            height: 3,
          },
          "& .MuiTabs-flexContainer": {
            justifyContent: "flex-start",
            width: "100%",
          },
          "& .MuiTab-root": {
            fontWeight: 700,
            color: "#666",
            fontSize: { xs: 14, sm: 15 },
            textTransform: "none",
            minWidth: "auto",
            py: 2,
            px: { xs: 2, sm: 3 },
            "&.Mui-selected": {
              color: "#982121",
              fontWeight: 700,
            },
          },
        }}
      >
        {categories.map((category) => (
          <Tab
            key={category.id}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexDirection: "row" }}>
                <span>{category.ar}</span>
              </Box>
            }
            value={category.id}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabNavigator; 