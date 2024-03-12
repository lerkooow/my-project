/* eslint-disable react/no-unescaped-entities */
import { useTheme } from "@emotion/react";
import HomeBannerImg from "../HomeBanner/HomeBanner.jpg"

import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";

const HomeBanner = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        isMobile ? (
            <Box sx={{ flexGrow: 1, marginTop: "30px" }}>
                <Grid container>
                    <Grid item xs={12} sx={{ background: "#5e4632", height: "584px" }}>
                        <Grid item xs={11} direction="column" sx={{ display: 'flex', justifyContent: 'space-around', height: '100%', paddingLeft: "25px" }}>
                            <Typography sx={{ color: "#fff", fontSize: "32px" }}>
                                Update your wardrobe with our collection of stylish women's clothing!
                            </Typography>
                            <Box>
                                <Typography sx={{ color: "#fff", fontSize: "18px", marginBottom: "15px" }}>
                                    From elegant dresses to comfortable everyday looks, we have everything to highlight your personality.
                                    Discover the latest fashion trends, enjoy comfort and express your uniqueness with our collection.
                                </Typography>
                                <Button sx={{ color: "#fff", background: "#ffffff8f", height: "56px", width: "100%" }}>View collection</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        ) : (
            <Box sx={{ flexGrow: 1, margin: "30px" }}>
                <Grid container>
                    <Grid item xs={7} sx={{ background: "#5e4632", height: "584px" }}>
                        <Grid item xs={11} direction="column" sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                            <Box>
                                <Typography sx={{ color: "#fff", fontSize: "32px", padding: "60px 0 30px 60px" }}>
                                    Update your wardrobe with our collection of stylish women's clothing!
                                </Typography>
                                <Button sx={{ color: "#fff", background: "#ffffff8f", margin: "0 0 30px 60px", height: "56px", width: "192px" }}>View collection</Button>
                            </Box>
                            <Typography sx={{ color: "#fff", fontSize: "18px", padding: "0 0 30px 60px" }}>
                                From elegant dresses to comfortable everyday looks, we have everything to highlight your personality.
                                Discover the latest fashion trends, enjoy comfort and express your uniqueness with our collection.
                                Feel irresistible every day - choose high-quality women's clothing from us!"
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <img src={HomeBannerImg} style={{ width: "100%", height: "584px" }} />
                    </Grid>
                </Grid>
            </Box>
        )
    )
}

export default HomeBanner;
