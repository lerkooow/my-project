import React from "react";
import { FC } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

import Category from "../Category/Category";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserCart from "../UserCart/UserCart";

import { lightTheme, darkTheme, greyTheme } from "../themes";
import { useAppSelector } from "../../hooks";

const UserCartPage: FC = () => {
  const { switches } = useAppSelector((state) => state.user);

  return (
    <Box
      sx={{
        backgroundColor:
          switches === "light"
            ? lightTheme.palette.background.default
            : switches === "dark"
              ? darkTheme.palette.background.default
              : greyTheme.palette.background.default,
      }}
    >
      <ThemeProvider theme={switches === "light" ? lightTheme : switches === "dark" ? darkTheme : greyTheme}>
        <Box sx={{ minHeight: "132px" }}>
          <Header />
          <Category />
        </Box>
        <UserCart />
        <Footer />
      </ThemeProvider>
    </Box>
  );
};

export default UserCartPage;
