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
        navigate("/user");
    };

    return (
        userId ? (
            <Box sx={{ maxWidth: 600, margin: "20px auto", padding: "30px" }} backgroundColor="background.accent4" color="primary.main">
                <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: "30px" }}>
                    User Account Details
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }} >
                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                        <Typography sx={{ padding: "10px" }}>
                            Your Email:
                        </Typography>
                        <Typography sx={{ padding: "10px" }}>
                            {user.email}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                        <Typography sx={{ padding: "10px" }}>
                            Your Username:
                        </Typography>
                        <Typography sx={{ padding: "10px" }}>
                            {user.username}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                        <Typography sx={{ padding: "10px" }}>
                            Your First Name:
                        </Typography>
                        <Typography sx={{ padding: "10px" }}>
                            {user.name && user.name.firstname}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                        <Typography sx={{ padding: "10px" }}>
                            Your Last Name:
                        </Typography>
                        <Typography sx={{ padding: "10px" }}>
                            {user.name && user.name.lastname}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                        <Typography sx={{ padding: "10px" }}>
                            Your Phone:
                        </Typography>
                        <Typography sx={{ padding: "10px" }}>
                            {user.phone}
                        </Typography>
                    </Box>
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


