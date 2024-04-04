import { Fragment, useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Switches from '../Switches/Switches';

export default function AnchorTemporaryDrawer() {
    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box color="primary.main">
            <Box role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
                <List>
                    {['About us', 'Contact', 'Blog'].map((text) => (
                        <ListItem key={text}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <ListItemIcon>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: "primary.main", padding: "8px 16px" }}>
                            <SearchIcon style={{ marginRight: "30px" }} />
                            <Link to="/cart">
                                <AddShoppingCartIcon style={{ marginRight: "30px" }} />
                            </Link>
                            <Link to="/user">
                                <AccountCircleIcon />
                            </Link>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItemIcon>
                <Divider />
                <List>
                </List>
            </Box >
            <Switches />
        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </Fragment>
            ))}
        </div>
    );
}