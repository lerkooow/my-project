import { Box, Button, TextField, Typography } from "@mui/material";
import "./JoinForm.css";

const JoinForm = () => {

    return (
        <Box sx={{ width: "100%", height: "481px", display: "flex", justifyContent: "center", alignItems: "center" }} backgroundColor="background.accent1" component="div">
            <Box sx={{ backgroundColor: { xs: "none", md: "background.accent2" }, width: "88%", height: "76%", margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} component="div">
                <Typography sx={{ maxWidth: { xs: "100%", md: "45%" }, fontSize: "2.25rem", textAlign: "center", marginBottom: "15px" }} color="text.primary">
                    Join the club and get the benefits
                </Typography>
                <Typography sx={{ width: { xs: "100%", md: "37%" }, fontSize: "1rem", textAlign: "center", marginBottom: "23px" }} color="text.primary">
                    Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more
                </Typography>
                <Box sx={{ display: "flex" }} component="div">
                    <TextField label="your@email.com" className="customTextField" />
                    <Button sx={{ backgroundColor: "background.button", color: 'text.accent1', width: "126px", height: "56px", borderRadius: "0" }}>Sign up</Button>
                </Box>
            </Box>
        </Box >
    )
}

export default JoinForm;
