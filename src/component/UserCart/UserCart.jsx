import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../toolkitRedux/storeSlice";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserCart = () => {
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userId = localStorage.getItem('userId');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fakestoreapi.com/users')
            .then(response => setUser(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const matchedUser = user.find(u => u.username === username);
        if (!matchedUser) {
            alert('Invalid username or password');
        } else {
            dispatch(loginUser({ username, password }));
            localStorage.setItem('userId', matchedUser.id);
            navigate("/");
        }
    }

    return (
        userId ? (
            <Cart userId={userId} />
        ) : (
            <Box sx={{ flexGrow: 1, margin: "30px 80px", color: "#FFF" }}>
                <Typography sx={{ color: "text.primary", fontSize: "2rem", textAlign: "center", marginBottom: "20px" }}>Login</Typography>
                <form onSubmit={handleLogin}>
                    <Box sx={{ border: "2px solid rgba(179, 179, 179, 0.8)", display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontSize: "1rem", textAlign: "center", margin: "20px" }} color="secondary.main">Log in to your account to access your cart/account</Typography>
                        <Box sx={{ margin: "30px" }}>
                            <TextField className="customTextField" label="username" fullWidth type="text" onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
                        </Box>
                        <Box sx={{ margin: "30px" }}>
                            <TextField className="customTextField" label="password" fullWidth type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                        <Button type="submit" sx={{ margin: "20px auto", marginTop: "30px", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>
                            Log In
                        </Button>
                    </Box>
                </form>
            </Box >
        )
    )
}

export default UserCart;
