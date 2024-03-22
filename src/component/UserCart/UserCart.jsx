import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../toolkitRedux/storeSlice";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://fakestoreapi.com/users')
            .then(res => res.json())
            .then(json => setUser(json));
    }, []);

    const handleLogin = () => {
        const matchedUser = user.find(u => u.username === username);
        if (!matchedUser) {
            alert('Invalid username or password');
        } else {
            dispatch(loginUser({ username, password }));
            setUserId(matchedUser.id);
            localStorage.setItem('userId', matchedUser.id);
            navigate("/")
        }
    }

    return (
        userId ? (
            <Cart userId={userId} />
        ) : (
            <Box sx={{ flexGrow: 1, margin: "30px 80px", color: "#FFF" }}>
                <Typography sx={{ color: "text.primary", fontSize: "2rem", textAlign: "center", marginBottom: "20px" }}>Login</Typography>
                <Box sx={{ border: "2px solid rgba(179, 179, 179, 0.8)", display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ color: "rgba(160, 32, 32, 0.8)", fontSize: "1rem", textAlign: "center", margin: "20px" }}>Log in to your account to access your cart/account</Typography>
                    <Box sx={{ margin: "30px" }}>
                        <TextField label="username" fullWidth type="text" className="customTextField" onChange={(e) => setUsername(e.target.value)} />
                    </Box>
                    <Box sx={{ margin: "30px" }}>
                        <TextField label="password" fullWidth type="password" className="customTextField" onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    <Button onClick={handleLogin} sx={{ margin: "20px auto", marginTop: "30px", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>
                        Log In
                    </Button>
                </Box>
            </Box >
        )
    )
}

export default UserCart;
