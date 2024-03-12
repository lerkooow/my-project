import { Box, Grid, Typography } from "@mui/material";

/* eslint-disable react/no-unescaped-entities */
const Category = () => {
    return (
        <Box sx={{ flexGrow: 1, marginTop: "25px" }}>
            <Grid container>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", color: "#726E8D" }}>
                    <Typography sx={{ fontSize: "16px" }}>Men's clothing</Typography>
                    <Typography sx={{ fontSize: "16px" }}>Women's clothing</Typography>
                    <Typography sx={{ fontSize: "16px" }}>Electronics</Typography>
                    <Typography sx={{ fontSize: "16px" }}>Jewelery</Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Category;