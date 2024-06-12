import React from "react";
import { FC } from "react";

import { Box, Grid, Typography } from "@mui/material";

const InfoBanner: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            height: "603px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <Typography
              sx={{ m: { xs: "0 25px 15px 25px", md: "0 25px 25px 80px" }, color: "text.primary" }}
              variant="h5"
            >
              From a studio in London to a global brand with over 400 outlets
            </Typography>
            <Typography
              sx={{ m: { xs: "0 25px 15px 25px", md: "0 45px 0 80px" }, color: "text.secondary" }}
              variant="h6"
            >
              Avion was launched with a simple idea: to make high-quality clothing, electronics, and jewelry accessible
              and affordable for everyone. Our online store has become a cornerstone of the fashion and technology
              scenes, offering a collection that blends exquisite design, modern technology, and unique accessories.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ display: { xs: "none", md: "block" } }}>
          <img src={`src/component/InfoBanner/InfoBanner.jpg`} style={{ width: "100%", height: "603px" }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoBanner;
