import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCart from "../UserCart/UserCart";

const UserAccount = () => {
    const [user, setUser] = useState({});
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/users/${userId}`)
            .then(res => res.json())
            .then(json => setUser(json))
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        navigate("/user")
    };

    return (
        userId ? (
            <Box sx={{ maxWidth: 600, margin: "20px auto", borderRadius: "20px", padding: "30px" }} backgroundColor="background.accent4" color="primary.main">
                <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: "30px" }}>
                    User Account Details
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <Typography sx={{ padding: "10px", borderRadius: "20px" }} backgroundColor="background.default">
                        Your Email: {user.email}
                    </Typography>
                    <Typography variant="body1" sx={{ padding: "10px", borderRadius: "20px" }} backgroundColor="background.default">
                        Your Username: {user.username}
                    </Typography>
                    <Typography variant="body1" sx={{ padding: "10px", borderRadius: "20px" }} backgroundColor="background.default">
                        Your First Name: {user.name && user.name.firstname}
                    </Typography>
                    <Typography variant="body1" sx={{ padding: "10px", borderRadius: "20px" }} backgroundColor="background.default">
                        Your Last Name: {user.name && user.name.lastname}
                    </Typography>
                    <Typography variant="body1" sx={{ padding: "10px", borderRadius: "20px" }} backgroundColor="background.default">
                        Your Phone: {user.phone}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        onClick={handleLogout}
                        sx={{ marginTop: "30px", backgroundColor: "background.button", color: 'text.accent1', width: "126px", height: "56px", borderRadius: "0" }}>
                        Log Out
                    </Button>
                </Box>
            </Box>
        ) : (
            <Box>
                <UserCart />
            </Box>
        )
    )
}

export default UserAccount;


