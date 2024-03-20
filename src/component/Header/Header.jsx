import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, Grid, NativeSelect, Typography } from '@mui/material';

import { switchesColor } from '../../toolkitRedux/storeSlice';

import AnchorTemporaryDrawer from '../Drawer/Drawer';

import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();

    const handleSwitchChange = (e) => {
        dispatch(switchesColor(e.target.value));
    };

    const { switches } = useSelector(state => state.onlineStore);

    return (
        <Box sx={{ flexGrow: 1, paddingTop: "25px" }}>
            <Grid container>
                <Grid item xs={4}>
                    <Typography sx={{ paddingLeft: "28px", fontSize: "1.5rem" }} color="secondary.main">
                        <Link to="/">
                            Avion
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={8} sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end", paddingRight: "20px" }} color="primary.main">
                    <AnchorTemporaryDrawer />
                </Grid>
                <Grid item xs={8} sx={{ display: { xs: "none", md: "flex" }, gap: "30px", justifyContent: "flex-end", alignItems: "center" }} color="primary.main">
                    <FormControl sx={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }} onChange={handleSwitchChange}>
                        <ContrastIcon />
                        <NativeSelect defaultValue={switches} sx={{ color: 'primary.main', borderBottom: "none" }}>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="grey">Grey</option>
                        </NativeSelect>
                    </FormControl>
                    <Typography sx={{ fontSize: "1rem" }}>About us</Typography>
                    <Typography sx={{ fontSize: "1rem" }}>Contact</Typography>
                    <Typography sx={{ fontSize: "1rem" }}>Blog</Typography>
                    <SearchIcon />
                    <AddShoppingCartIcon />
                    <AccountCircleIcon style={{ marginRight: "51px" }} />
                </Grid>
            </Grid>
        </Box >
    )
}

export default Header;