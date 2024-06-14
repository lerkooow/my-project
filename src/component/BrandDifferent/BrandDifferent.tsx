import React from "react";
import { FC, ReactElement } from "react";

import { Box, Grid, Typography } from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

interface Item {
  icon: ReactElement;
  title: string;
  description: string;
}

const BrandDifferent: FC = () => {
  const items: Item[] = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: "Next day as standard",
      description: "Order before 3pm and get your order the next day as standard",
    },
    {
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />,
      title: "Made by true artisans",
      description: "Handmade crafted goods made with real passion and craftmanship",
    },
    {
      icon: <CreditCardIcon sx={{ fontSize: 40 }} />,
      title: "Unbeatable prices",
      description: "For our materials and quality you won’t find better prices anywhere",
    },
    {
      icon: <LocalFloristIcon sx={{ fontSize: 40 }} />,
      title: "Recycled packaging",
      description: "We use 100% recycled packaging to ensure our footprint is manageable",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, m: { xs: "30px 25px", md: "30px 80px" }, color: "text.primary" }}>
      <Typography sx={{ textAlign: "center", mb: "60px" }} variant="h5">
        What makes our brand different
      </Typography>
      <Grid container direction="row">
        {items.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={3} sx={{ p: "10px", textAlign: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {item.icon}
              <Typography sx={{ m: "20px 0" }} variant="h6">
                {item.title}
              </Typography>
              <Typography sx={{ mb: "20px" }} variant="subtitle1">
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BrandDifferent;
