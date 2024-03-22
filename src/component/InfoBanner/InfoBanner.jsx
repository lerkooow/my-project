import InfoBannerImg from "./InfoBanner.jpg"

import { Box, Grid, Typography } from "@mui/material";

const InfoBanner = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ height: "603px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around" }} >
                    <Box>
                        <Typography sx={{ fontSize: "1.5rem", margin: { xs: "0 25px 15px 25px", md: "0 25px 25px 80px" } }} color="text.primary">
                            From a studio in London to a global brand with
                            over 400 outlets
                        </Typography>
                        <Typography sx={{ fontSize: "1.125rem", margin: { xs: "0 25px 15px 25px", md: "0 45px 0 80px" } }} color="text.secondary">
                            When we started Avion, the idea was simple.
                            Make high quality furniture affordable and available for the mass market.
                            Handmade, and lovingly crafted furniture and homeware is what we live,
                            breathe and design so our Chelsea boutique become the hotbed for the London interior design community.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ display: { xs: "none", md: "block" } }}>
                    <img src={InfoBannerImg} style={{ width: "100%", height: "603px" }} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default InfoBanner;
