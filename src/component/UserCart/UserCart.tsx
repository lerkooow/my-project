import React from "react";
import { FC } from "react";

import { Box, Typography } from "@mui/material";
import Cart from "./Cart.jsx";

import LoginForm from "./LoginForm";
import { useAppSelector } from "../../hooks.js";

const UserCart: FC = () => {
  const { userId } = useAppSelector((state) => state.user);

  return userId ? (
    <Cart />
  ) : (
    <Box sx={{ flexGrow: 1, margin: "30px 80px", color: "#FFF" }}>
      <Typography sx={{ color: "text.primary", fontSize: "2rem", textAlign: "center", marginBottom: "20px" }}>
        Login
      </Typography>
      <Box
        sx={{ border: "2px solid rgba(179, 179, 179, 0.8)", display: "flex", flexDirection: "column", padding: "20px" }}
      >
        <Typography sx={{ fontSize: "1rem", textAlign: "center", marginBottom: "20px" }} color="secondary.main">
          Log in to your account to access your cart/account
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default UserCart;
