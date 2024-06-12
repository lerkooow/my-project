/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormikErrors, useFormik } from "formik";

import { Button, TextField, Typography } from "@mui/material";

import axios from "axios";

import { loginUser, setUserId } from "../../features/user/userSlice";
import { useAppDispatch } from "../../hooks";

interface Geolocation {
  lat: string;
  long: string;
}

interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface Name {
  firstname: string;
  lastname: string;
}

interface User {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
}

interface FormValues {
  username: string;
  password: string;
}

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};

  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const LoginForm = () => {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://fakestoreapi.com/users")
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      const { username, password } = values;
      const matchedUser = user.find((u) => u.username === username && u.password === password);
      if (!matchedUser) {
        alert("Invalid username or password");
      } else {
        dispatch(loginUser({ username, password }));
        dispatch(setUserId(matchedUser.id));
        navigate("/");
      }
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}
    >
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "20px auto", minWidth: "150px", height: "56px" }}
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
