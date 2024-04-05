import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import capitalizeFirstLetter from "../capitalizeFirstLetter/capitalizeFirstLetter";
import { fetchCategories } from "../../features/products/productsSlice";

const Category = () => {
    const { categories } = useSelector(state => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <Box sx={{ flexGrow: 1, m: "25px 0", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", borderBottom: "1px solid rgba(77, 77, 77, 0.3)" }} color="primary.main">
            <Typography variant="subtitle1" sx={{ mb: "10px" }}>
                <Link to="/all products">
                    All products
                </Link>
            </Typography>
            {categories && categories.map((item, index) => (
                <Link to={`/${item}`} key={index}>
                    <Typography variant="subtitle1" sx={{ mb: "10px" }}>{capitalizeFirstLetter(item)}</Typography>
                </Link>
            ))}
        </Box>
    )
}
export default Category;
