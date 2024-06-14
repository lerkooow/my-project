import React from "react";
import { ChangeEvent, FC } from "react";

import { Box, FormControl, NativeSelect } from "@mui/material";
import ContrastIcon from "@mui/icons-material/Contrast";

import { switchesColor } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Switches: FC = () => {
  const { switches } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(switchesColor(e.target.value));
  };
  return (
    <Box>
      <FormControl
        sx={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }}
        onChange={handleSwitchChange}
      >
        <ContrastIcon style={{ marginLeft: "30px" }} />
        <NativeSelect defaultValue={switches} sx={{ color: "primary.main", borderBottom: "none" }}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="grey">Grey</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default Switches;
