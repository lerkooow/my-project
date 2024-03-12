import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ flexGrow: 1, marginTop: "25px" }}>
            <Grid container>
                <Grid item xs={8}>
                    <Typography variant='h1' sx={{ color: "#22202E", fontSize: "24px", marginLeft: "28px" }}>Avion</Typography>
                </Grid>
                {isMobile ? (
                    <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
                        <MenuIcon />
                    </Grid>
                ) : (
                    <Grid item xs={4} sx={{ display: "flex", color: "#726E8D", gap: "30px", justifyContent: "flex-end" }}>
                        <Typography sx={{ fontSize: "16px" }}>About us</Typography>
                        <Typography sx={{ fontSize: "16px" }}>Contact</Typography>
                        <Typography sx={{ fontSize: "16px" }}>Blog</Typography>
                        <SearchIcon />
                        <AddShoppingCartIcon />
                        <AccountCircleIcon style={{ marginRight: "51px" }} />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default Header;