import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../toolkitRedux/storeSlice";

import capitalizeFirstLetter from "../capitalizeFirstLetter/capitalizeFirstLetter";

const Category = () => {

    const { categories } = useSelector(state => state.onlineStore);

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
            {categories && categories.map((item) => (
                <Link to={`/${item}`} key={item}>
                    <Typography key={item} variant="subtitle1" sx={{ mb: "10px" }}>{capitalizeFirstLetter(item)}</Typography>
                </Link>
            ))}
        </Box>
    )
}
export default Category;
