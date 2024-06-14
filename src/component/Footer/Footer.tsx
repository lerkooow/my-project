import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";

import capitalizeFirstLetter from "../capitalizeFirstLetter/capitalizeFirstLetter";
import { useFetchCategoriesQuery } from "../../features/api/apiSlice";

const menu: string[] = ["New arrivals", "Best sellers", "Recently viewed", "Popular this week", "All products"];
const ourCompany: string[] = ["About us", "Vacancies", "Contact us", "Privacy", "Returns policy"];

const Footer: FC = () => {
  const { data = [] } = useFetchCategoriesQuery();

  return (
    <Grid container sx={{ color: "#FFF", backgroundColor: "background.accent3" }}>
      <Grid item md={2} sm={4} xs={6} sx={{ p: { xs: "58px 15px 50px 15px", md: "58px 0 50px 82px" } }}>
        <Typography variant="subtitle1">Menu</Typography>
        {menu.map((item) => (
          <Typography key={item} variant="subtitle2">
            {item}
          </Typography>
        ))}
      </Grid>
      <Grid item md={2} sm={4} xs={6} sx={{ p: { xs: "58px 15px 50px 15px", md: "58px 0 50px 82px" } }}>
        <Typography variant="subtitle1">Categories</Typography>
        <Link to="/all products">
          <Typography variant="subtitle2">All products</Typography>
        </Link>
        {data &&
          data.map((item, index) => (
            <Link to={`/${item}`} key={index}>
              <Typography variant="subtitle2">{capitalizeFirstLetter(item)}</Typography>
            </Link>
          ))}
      </Grid>
      <Grid item md={2} sm={4} xs={6} sx={{ p: { xs: "58px 15px 50px 15px", md: "58px 15px 50px 82px" } }}>
        <Typography variant="subtitle1">Our Company</Typography>
        {ourCompany.map((item) => (
          <Typography key={item} variant="subtitle2">
            {item}
          </Typography>
        ))}
      </Grid>
      <Grid item md={6} xs={12} sx={{ p: { xs: "10px 15px 0 15px", md: "58px 30px 0 50px" } }}>
        <Typography sx={{ mb: "10px" }} variant="subtitle1">
          Join our mailing list
        </Typography>
        <Box sx={{ display: "flex" }}>
          <TextField label="your@email.com" className="customTextField" sx={{ width: "70%" }} />
          <Button
            sx={{
              width: "126px",
              borderRadius: "0",
              backgroundColor: "background.button",
              color: "text.accent1",
              "&:hover": { color: "text.accent1", backgroundColor: "background.button" },
            }}
          >
            Send
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          p: { xs: "58px 0 23px 0", md: "58px 0 23px 82px" },
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        <Typography variant="subtitle2">Copyright 2024 Avion LTD</Typography>
        <Box sx={{ mr: "40px", display: { xs: "none", md: "block" } }}>
          <LinkedInIcon style={{ margin: "0 30px" }} />
          <FacebookIcon style={{ margin: "0 30px" }} />
          <InstagramIcon style={{ margin: "0 30px" }} />
          <TwitterIcon style={{ margin: "0 30px" }} />
          <PinterestIcon style={{ margin: "0 30px" }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
