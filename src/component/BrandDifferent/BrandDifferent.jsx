import { Box, Grid, Typography } from "@mui/material";

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const BrandDifferent = () => {

    const items = [
        {
            icon: <LocalShippingIcon />,
            title: "Next day as standard",
            description: "Order before 3pm and get your order the next day as standard"
        },
        {
            icon: <CheckCircleOutlineIcon />,
            title: "Made by true artisans",
            description: "Handmade crafted goods made with real passion and craftmanship"
        },
        {
            icon: <CreditCardIcon />,
            title: "Unbeatable prices",
            description: "For our materials and quality you won’t find better prices anywhere"
        },
        {
            icon: <LocalFloristIcon />,
            title: "Recycled packaging",
            description: "We use 100% recycled packaging to ensure our footprint is manageable"
        }
    ];

    return (
        <Box sx={{ flexGrow: 1, margin: { xs: "30px 25px", md: "30px 80px" } }} color="text.primary">
            <Typography sx={{ textAlign: "center", marginBottom: "60px", fontSize: "1.5rem" }}>What makes our brand different</Typography>
            <Grid container direction="row">
                {items.map((item, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3} lg={3} sx={{ padding: "10px" }}>
                        {item.icon}
                        <Typography sx={{ margin: "20px 0", fontSize: "1.25rem" }}>{item.title}</Typography>
                        <Typography sx={{ fontSize: "1rem", marginBottom: "20px" }}>{item.description}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BrandDifferent;
