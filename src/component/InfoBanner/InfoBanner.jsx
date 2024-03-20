import InfoBannerImg from "./InfoBanner.jpg"

import { Box, Button, Grid, Typography } from "@mui/material";

const InfoBanner = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ height: "603px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around" }} >
                    <Box>
                        <Typography sx={{ fontSize: "1.5rem", margin: { xs: "0 15px 15px 15px", md: "0 15px 25px 80px" } }} color="text.primary">
                            From a studio in London to a global brand with
                            over 400 outlets
                        </Typography>
                        <Typography sx={{ fontSize: "1.125rem", margin: { xs: "0 15px 15px 15px", md: "0 15px 15px 80px" } }} color="text.secondary">
                            When we started Avion, the idea was simple.
                            Make high quality furniture affordable and available for the mass market.
                            Handmade, and lovingly crafted furniture and homeware is what we live,
                            breathe and design so our Chelsea boutique become the hotbed for the London interior design community.
                        </Typography>
                    </Box>
                    <Button sx={{ color: "#2A254B", background: "#F9F9F9", margin: { xs: "0 auto", md: "0 80px" }, height: "56px", width: { xs: "95%", md: "192px" } }}>Get in touch</Button>
                </Grid>
                <Grid item xs={6} sx={{ display: { xs: "none", md: "block" } }}>
                    <img src={InfoBannerImg} style={{ width: "100%", height: "603px" }} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default InfoBanner;
