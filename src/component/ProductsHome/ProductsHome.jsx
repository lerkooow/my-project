import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import electBanner from "./elect.jpg";
import jewBanner from "./jew.jpg";
import mensBanner from "./mens.jpg";
import womensBanner from "./womens.jpg";
import allBanner from "./all.jpg";
import { Link, useParams } from "react-router-dom";

import capitalizeFirstLetter from "../capitalizeFirstLetter/capitalizeFirstLetter";
import { useFetchProductsQuery } from "../../features/api/apiSlice";

const ProductsHome = () => {
    const [sorting, setSorting] = useState("");
    const [limit, setLimit] = useState(4);
    const [disableButton, setDisableButton] = useState(false);

    const { category } = useParams();

    const categoryUrl = category === "all products" ? "" : "category";
    const categoryProducts = category === "all products" ? "" : category;

    const { data = [], isLoading } = useFetchProductsQuery({ sorting, categoryProducts, limit, categoryUrl })

    useEffect(() => {
        setLimit(4);
    }, [category]);

    useEffect(() => {
        if (data.length < limit) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [data, limit]);

    const handleSortingChange = (e) => setSorting(e.target.value);

    const handleLimitProducts = () => setLimit((limit) => limit + 4);


    const banner = category === "electronics" ? electBanner :
        category === "jewelery" ? jewBanner :
            category === "men's clothing" ? mensBanner :
                category === "women's clothing" ? womensBanner :
                    category === "all products" ? allBanner : null;

    return (
        <Box>
            <Box sx={{ position: "relative", textAlign: "center", color: "white", minHeight: "223px" }}>
                <img src={banner} style={{ objectFit: "cover", width: "100%", height: "209px" }} alt={category} />
                <Typography sx={{ position: "absolute", bottom: "35px", left: "80px" }} variant="h3">{capitalizeFirstLetter(category)}</Typography>
            </Box>
            <Box sx={{ m: "0 80px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4} lg={2}>
                        <Typography sx={{ m: "50px 0 25px 0" }} color="text.secondary">Sorting</Typography>
                        <RadioGroup name="use-radio-group" onChange={handleSortingChange}>
                            <FormControlLabel value="desc" label="Descending" control={<Radio />} color='text.secondary' />
                            <FormControlLabel value="asc" label="Ascending" control={<Radio />} color='text.secondary' />
                        </RadioGroup>
                    </Grid>
                    <Grid container item xs={12} sm={8} md={8} lg={10} spacing={2} sx={{ mt: "50px" }}>
                        {isLoading ? (
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                    <CircularProgress />
                                </Box>
                            </Grid>
                        ) : (
                            data.length > 0 && data.map(item => (
                                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} sx={{ mb: "20px" }}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                        <Box sx={{ backgroundImage: `url(${item.image})`, height: 0, paddingTop: '100%', backgroundPosition: "center center", backgroundSize: "contain" }}></Box>
                                        <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Link to={`/${item.category}/${item.id}`}>
                                                    <Typography gutterBottom color="text.secondary" variant="h5">
                                                        {item.title}
                                                    </Typography>
                                                </Link>
                                            </Box>
                                            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography color="text.secondary" variant="h6">
                                                    £{item.price}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex" }}>
                    <Button onClick={handleLimitProducts} sx={{ display: disableButton ? "none" : "block", m: "50px auto", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>See more</Button>                </Box>
            </Box>
            <Box>
                <Typography variant="h6" sx={{ textAlign: "center", mb: "30px" }}>Products: 1 - {limit}</Typography>
            </Box>
        </Box>
    );
}

export default ProductsHome;
