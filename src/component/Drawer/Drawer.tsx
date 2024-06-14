import React from "react";
import { Fragment, KeyboardEvent, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Switches from "../Switches/Switches";

type Anchor = "right";

interface State {
  right: boolean;
}

export default function AnchorTemporaryDrawer() {
  const [state, setState] = useState<State>({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as KeyboardEvent).key === "Tab" || (event as KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box color="primary.main">
      <Box role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
        <List>
          {["About us", "Contact", "Blog"].map((text) => (
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
        <List></List>
      </Box>
      <Switches />
    </Box>
  );

  return (
    <div>
      {["right" as const].map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}
