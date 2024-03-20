import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useEffect, useState } from "react";

const menu = ["New arrivals", "Best sellers", "Recently viewed", "Popular this week", "All products"];
const ourCompany = ["About us", "Vacancies", "Contact us", "Privacy", "Returns policy"];


const Footer = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then(res => res.json())
            .then(json => setCategories(json));
    }, []);
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <Grid container sx={{ color: "#FFF" }} backgroundColor="background.accent3">
            <Grid
                item md={2} sm={4} xs={6}
                sx={{ padding: { xs: "58px 15px 50px 15px", md: "58px 0 50px 82px" } }}
            >
                <Typography sx={{ fontSize: "1rem" }}>
                    Menu
                </Typography>
                {menu.map((item) => (
                    <Typography key={item} sx={{ fontSize: "0.875rem" }}>
                        {item}
                    </Typography>
                ))}
            </Grid>
            <Grid item md={2} sm={4} xs={6}
                sx={{ padding: { xs: "58px 15px 50px 15px", md: "58px 0 50px 82px" } }}
            >
                <Typography sx={{ fontSize: "1rem" }}>
                    Categories
                </Typography>
                <Typography sx={{ fontSize: "0.875rem" }}>All products</Typography>
                {categories
                    .map((item) => (
                        <Typography key={item} sx={{ fontSize: "0.875rem" }}>
                            {capitalizeFirstLetter(item)}
                        </Typography>
                    ))}
            </Grid>
            <Grid item md={2} sm={4} xs={6}
                sx={{ padding: { xs: "58px 15px 50px 15px", md: "58px 15px 50px 82px" } }}
            >
                <Typography sx={{ fontSize: "1rem" }}>
                    Our Company
                </Typography>
                {ourCompany.map((item) => (
                    <Typography key={item} sx={{ fontSize: "0.875rem" }}>
                        {item}
                    </Typography>
                ))}
            </Grid>
            <Grid item md={6} xs={12} sx={{ padding: { xs: "10px 15px 0 15px", md: "58px 30px 0 50px" } }}>
                <Typography sx={{ fontSize: "1rem", marginBottom: "10px" }}>Join our mailing list</Typography>
                <Box sx={{ display: "flex" }}>
                    <TextField label="your@email.com" className="customTextField" sx={{ width: "70%" }} />
                    <Button sx={{ backgroundColor: "#FFF", color: "#000", width: "126px", borderRadius: "0" }}>Sign up</Button>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ padding: { xs: "58px 0 23px 0", md: "58px 0 23px 82px" }, display: "flex", justifyContent: { xs: "center", md: "space-between" } }}>
                <Typography sx={{ fontSize: "0.875rem" }}>Copyright 2024 Avion LTD</Typography>
                <Box sx={{ marginRight: "40px", display: { xs: "none", "md": "block" } }}>
                    <LinkedInIcon style={{ margin: "0 30px" }} />
                    <FacebookIcon style={{ margin: "0 30px" }} />
                    <InstagramIcon style={{ margin: "0 30px" }} />
                    <TwitterIcon style={{ margin: "0 30px" }} />
                    <PinterestIcon style={{ margin: "0 30px" }} />
                </Box>
            </Grid>
        </Grid >
    )
}

export default Footer;