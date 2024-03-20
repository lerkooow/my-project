import { useEffect, useState } from "react";

import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Category = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then(res => res.json())
            .then(json => setCategories(json));
    }, []);

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <Box sx={{ flexGrow: 1, margin: "25px 0" }} color="primary.main">
            <Grid container>
                <Grid item xs={12} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px" }}>
                    <Link to="/all_products">
                        <Typography sx={{ fontSize: "1rem" }}>All products</Typography>
                    </Link>
                    {categories.map((item) => (
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
