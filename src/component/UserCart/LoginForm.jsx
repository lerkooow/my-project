/* eslint-disable react/no-unescaped-entities */
import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, setUserId } from '../../features/user/userSlice';
import axios from 'axios';
import ModalWarning from "./ModalWarning";

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'required';
    }

    if (!values.password) {
        errors.password = 'required';
    }

    return errors;
};

const LoginForm = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/users')
            .then(response => setUser(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate,
    });

    const [open, setOpen] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = formik.values;
        const matchedUser = user.find(u => u.username === username && u.password === password);
        if (!matchedUser) {
            setOpen(true);
        } else {
            dispatch(loginUser({ username, password }));
            dispatch(setUserId(matchedUser.id));
            navigate("/");
        }
    }

    return (
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
            <TextField
                id="username"
                name="username"
                type="text"
                label="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                variant="outlined"
                style={{ margin: "20px 0" }}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
                id="password"
                name="password"
                type="password"
                label="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                variant="outlined"
                style={{ margin: "20px 0" }}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Typography sx={{ color: "text.primary", textAlign: "center" }}>Don't have an account?</Typography>
            <Button type="submit" variant="contained" color="primary" style={{ margin: "20px auto", minWidth: "150px", height: "56px" }}>
                Log In
            </Button>
            <ModalWarning open={open} handleClose={() => setOpen(false)} />
        </form>
    );
};

export default LoginForm;
