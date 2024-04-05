import { Box, Grid, Typography } from '@mui/material';

import AnchorTemporaryDrawer from '../Drawer/Drawer';

import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Switches from '../Switches/Switches';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from '../../features/user/userSlice';

const Header = () => {

    const { user } = useSelector(state => state.user);

    const userId = localStorage.getItem("userId");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [dispatch, userId]);

    return (
        <Box sx={{ flexGrow: 1, pt: "30px" }}>
            <Grid container>
                <Grid item xs={4}>
                    <Link to="/">
                        <Typography sx={{ pl: "28px", color: "secondary.main" }} variant='h5'>
                            Avion
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={8} sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end", pr: "20px", color: "primary.main" }}>
                    <AnchorTemporaryDrawer />
                </Grid>
                <Grid item xs={8} sx={{ display: { xs: "none", md: "flex" }, gap: "30px", justifyContent: "flex-end", alignItems: "center", color: "primary.main" }}>
                    <Switches />
                    <Typography variant='subtitle1'>About us</Typography>
                    <Typography variant='subtitle1'>Contact</Typography>
                    <Typography variant='subtitle1'>Blog</Typography>
                    <SearchIcon />
                    <Link to="/cart">
                        <AddShoppingCartIcon />
                    </Link>
                    <Link to="/user">
                        {user ? (
                            <Typography sx={{ mr: "51px" }}>{user.username}</Typography>
                        ) : (
                            <AccountCircleIcon style={{ marginRight: "51px" }} />
                        )}
                    </Link>
                </Grid>
            </Grid>
        </Box >
    )
}

export default Header;