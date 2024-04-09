import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import capitalizeFirstLetter from "../capitalizeFirstLetter/capitalizeFirstLetter";
import { useFetchCategoriesQuery } from "../../features/api/apiSlice";

const Category = () => {
    const { data = [] } = useFetchCategoriesQuery();

    return (
        <Box sx={{ flexGrow: 1, m: "25px 0", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", borderBottom: "1px solid rgba(77, 77, 77, 0.3)" }} color="primary.main">
            <Typography variant="subtitle1" sx={{ mb: "10px" }}>
                <Link to="/all products">
                    All products
                </Link>
            </Typography>
            {data && data.map((item, index) => (
                <Link to={`/${item}`} key={index}>
                    <Typography variant="subtitle1" sx={{ mb: "10px" }}>{capitalizeFirstLetter(item)}</Typography>
                </Link>
            ))}
        </Box>
    )
}
export default Category;
