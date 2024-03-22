import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import QuantityInput from "./NumberInput";
import { useEffect, useState } from "react";

const ProductItem = () => {

    const { id } = useParams();
    const [productItem, setProductItem] = useState(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => setProductItem(json))
    }, [id]);

    if (!productItem) {
        return null;
    }

    return (
        <Box sx={{ flexGrow: 1, margin: { xs: "0", md: "30px 80px" }, color: "text.primary" }}>
            <Grid container key={productItem.title}>
                <Grid item md={5} xs={12}>
                    <div style={{ backgroundImage: `url(${productItem.image})`, height: "100%", backgroundPosition: "center center", backgroundSize: "contain", marginRight: "30px" }}></div>
                </Grid>
                <Grid item xs={12} md={7} sx={{ height: "100%" }}>
                    <Box sx={{ padding: "20px", backgroundColor: "background.accent4" }}>
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}>
                            <Rating name="read-only" value={productItem.rating.rate} readOnly />
                        </Typography>
                        <Typography>
                            Sold: {productItem.rating.count}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, paddingBottom: "10px" }}>
                            {productItem.title}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, paddingBottom: "10px" }}>
                            £{productItem.price}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.125rem" }, paddingBottom: "10px" }}>
                            Description
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.125rem" }, paddingBottom: "20px" }}>
                            {productItem.description}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box>
                                <Typography sx={{ marginBottom: "20px" }}>
                                    Quantity
                                </Typography>
                                <QuantityInput />
                            </Box>
                            <Button sx={{ marginTop: "30px", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>
                                Add to cart
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProductItem;
