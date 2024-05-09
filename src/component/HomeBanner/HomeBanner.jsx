/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@mui/material";

import HomeBannerImg from "./HomeBanner.jpg";

const HomeBanner = () => {
    return (
        <Box sx={{ flexGrow: 1, m: { xs: "0", md: "30px 80px" }, color: "#FFF" }}>
            <Grid container>
                <Grid item md={12} lg={8} sx={{ height: "584px", display: 'flex', flexDirection: "column", justifyContent: 'space-around', alignItems: "center" }}
                    backgroundColor="background.accent3"
                >
                    <Grid item xs={11} sx={{ height: '100%', display: { xs: "flex", md: "null" }, flexDirection: { xs: "column", md: "null" }, justifyContent: { xs: "space-evenly", md: "null" } }}>
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, padding: { xs: "0", md: "0" } }}>
                            Update your wardrobe with our collection of stylish women's clothing!
                        </Typography>
                        <Button sx={{ display: { xs: "none", md: "block" }, color: "#FFF", backgroundColor: "#FFFFFF8F", '&:hover': { color: '#000', backgroundColor: 'white' }, mb: "20px", height: "56px", width: "192px" }}>
                            <Link to={"/women's clothing"} >
                                <Typography>View collection</Typography>
                            </Link>
                        </Button>
                        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.125rem" } }}>
                            From elegant dresses to comfortable everyday looks, we have everything to highlight your personality.
                            Discover the latest fashion trends, enjoy comfort and express your uniqueness with our collection.
                            Feel irresistible every day - choose high-quality women's clothing from us!
                        </Typography>
                        <Button sx={{ display: { xs: "block", md: "none" }, color: "#FFF", '&:hover': { color: '#000', backgroundColor: 'white' }, backgroundColor: "#FFFFFF8F", width: "100%", height: '56px' }} >
                            <Link to={"/women's clothing"}>
                                <Typography>View collection</Typography>
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item lg={4} sx={{ display: { xs: "none", lg: "block" } }}>
                    <img src={HomeBannerImg} style={{ width: "100%", height: "584px" }} alt="Home Banner" />
                </Grid>
            </Grid>
        </Box >
    );
};

export default HomeBanner;
