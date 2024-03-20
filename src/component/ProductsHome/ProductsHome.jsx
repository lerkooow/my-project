import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import electBanner from "./elect.webp";
import jewBanner from "./jewelery.jpg";
import mensBanner from "./mensClothing.jpg";
import womensBanner from "./womensClothing.webp";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../../toolkitRedux/storeSlice";

const ProductsHome = () => {
    const [sorting, setSorting] = useState("desc");
    const [limit, setLimit] = useState(4);
    const [disableButton, setDisableButton] = useState(false);
    const [allProducts, setAllProducts] = useState([])

    const { id } = useParams();

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.onlineStore);

    useEffect(() => {
        setLimit(4);
    }, [id]);

    useEffect(() => {
        if (products.length < limit) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [products, limit]);

    const handleSortingChange = (e) => {
        setSorting(e.target.value);
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleLimitProducts = () => {
        setLimit((limit) => limit + 4);
    };

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products?limit=${limit}&sort=${sorting}`)
            .then(res => res.json())
            .then(json => setAllProducts(json))
    }, [limit, sorting]);

    useEffect(() => {
        dispatch(fetchProducts(sorting, id, limit));
    }, [sorting, id, limit, dispatch]);


    const banner = id === "electronics" ? electBanner : id === "jewelery" ? jewBanner : id === "men's clothing" ? mensBanner : id === "women's clothing" ? womensBanner : null;
    const all = id !== products[0]?.category ? true : false;

    return (
        <Box>
            <Box sx={{ position: "relative", textAlign: "center", color: "white" }}>
                <img src={banner} style={{ objectFit: "cover", width: "100%", height: "209px" }} alt="Electronics Banner" />
                <Typography component="div" sx={{ position: "absolute", bottom: "35px", left: "80px", fontSize: "2.25rem" }}>{capitalizeFirstLetter(id)}</Typography>
            </Box>
            <Box sx={{ margin: "0 80px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4} lg={2}>
                        <Typography sx={{ margin: "50px 0 25px 0" }} color="text.secondary">Sorting</Typography>
                        <RadioGroup name="use-radio-group" onChange={handleSortingChange}>
                            <FormControlLabel value="desc" label="Descending" control={<Radio />} sx={{ color: 'text.secondary' }} />
                            <FormControlLabel value="asc" label="Ascending" control={<Radio />} sx={{ color: 'text.secondary' }} />
                        </RadioGroup>
                    </Grid>
                    <Grid container item xs={12} sm={8} md={8} lg={10} spacing={2} sx={{ marginTop: "50px" }}>
                        {all ? (
                            allProducts.map(item => (
                                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                        <div style={{ backgroundImage: `url(${item.image})`, height: 0, paddingTop: '100%', backgroundPosition: "center center", backgroundSize: "contain" }}></div>
                                        <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <div>
                                                <Typography gutterBottom color="text.secondary">
                                                    <Link to={`/${item.category}/${item.id}`} style={{ fontSize: "1.25rem" }}>
                                                        {item.title}
                                                    </Link>
                                                </Typography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.125rem" }}>
                                                    £{item.price}
                                                </Typography>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            products.map(item => (
                                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                        <div style={{ backgroundImage: `url(${item.image})`, height: 0, paddingTop: '100%', backgroundPosition: "center center", backgroundSize: "contain" }}></div>
                                        <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <div>
                                                <Typography gutterBottom color="text.secondary">
                                                    <Link to={`/${item.category}/${item.id}`} style={{ fontSize: "1.25rem" }}>
                                                        {item.title}
                                                    </Link>
                                                </Typography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.125rem" }}>
                                                    £{item.price}
                                                </Typography>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )))
                        }
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex" }}>
                    <Button onClick={handleLimitProducts} disabled={disableButton} sx={{ margin: "50px auto", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px" }}>See more</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default ProductsHome;
