
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserCart from "../UserCart/UserCart";
import CircularProgress from '@mui/material/CircularProgress';
import { useFetchUserQuery } from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../features/user/userSlice";

const UserAccount = () => {
    const { userId } = useSelector(state => state.user);
    const { data = null, isLoading } = useFetchUserQuery(userId);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userData");
        dispatch(setUserId("no user"));
        navigate("/");
    };

    return (
        userId !== "no user" ? (
            <Box sx={{ maxWidth: 600, margin: "20px auto", padding: "30px" }} backgroundColor="background.accent4" color="primary.main">
                <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: "30px" }}>
                    User Account Details
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }} >
                    {isLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            {data && (
                                <>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                                        <Typography sx={{ padding: "10px" }}>
                                            Your Email:
                                        </Typography>
                                        <Typography sx={{ padding: "10px" }}>
                                            {data.email}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                                        <Typography sx={{ padding: "10px" }}>
                                            Your Username:
                                        </Typography>
                                        <Typography sx={{ padding: "10px" }}>
                                            {data.username}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                                        <Typography sx={{ padding: "10px" }}>
                                            Your First Name:
                                        </Typography>
                                        <Typography sx={{ padding: "10px" }}>
                                            {data.name && data.name.firstname}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                                        <Typography sx={{ padding: "10px" }}>
                                            Your Last Name:
                                        </Typography>
                                        <Typography sx={{ padding: "10px" }}>
                                            {data.name && data.name.lastname}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", borderRadius: "20px" }} backgroundColor="background.default">
                                        <Typography sx={{ padding: "10px" }}>
                                            Your Phone:
                                        </Typography>
                                        <Typography sx={{ padding: "10px" }}>
                                            {data.phone}
                                        </Typography>
                                    </Box>
                                </>
                            )}
                        </>
                    )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={handleLogout} sx={{ marginTop: "30px", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>
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

