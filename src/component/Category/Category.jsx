/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../toolkitRedux/storeSlice";

const Category = () => {

    const { categories } = useSelector(state => state.onlineStore);

    const dispatch = useDispatch();

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <Box sx={{ flexGrow: 1, margin: "25px 0" }} color="primary.main">
            <Grid container sx={{ borderBottom: "1px solid rgba(77, 77, 77, 0.3)" }}>
                <Grid item xs={12} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", mb: "10px" }}>
                    <Typography sx={{ fontSize: "1rem" }}>
                        <Link to="/all products">
                            All products
                        </Link>
                    </Typography>
                    {categories && categories.map((item) => (
                        <Link to={`/${item}`} key={item}>
                            <Typography key={item} sx={{ fontSize: "1rem" }}>{capitalizeFirstLetter(item)}</Typography>
                        </Link>
                    ))}
                </Grid>
            </Grid>
        </Box>
    )
}
export default Category;
