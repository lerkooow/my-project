import React from "react";
import { FC } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import "./JoinForm.css";

const JoinForm: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "481px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.accent1",
      }}
    >
      <Box
        sx={{
          backgroundColor: { xs: "none", md: "background.accent2" },
          width: "88%",
          height: "76%",
          m: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ maxWidth: { xs: "100%", md: "45%" }, textAlign: "center", mb: "15px", color: "text.primary" }}
          variant="h4"
        >
          Join the club and get the benefits
        </Typography>
        <Typography
          sx={{ width: { xs: "100%", md: "37%" }, textAlign: "center", mb: "23px", color: "text.primary" }}
          variant="subtitle1"
        >
          Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more
        </Typography>
        <Box sx={{ display: "flex" }}>
          <TextField label="your@email.com" className="customTextField" />
          <Button
            sx={{
              backgroundColor: "background.button",
              color: "text.accent1",
              width: "126px",
              height: "56px",
              borderRadius: "0",
              "&:hover": { color: "#FFF", backgroundColor: "background.accent3" },
            }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JoinForm;
