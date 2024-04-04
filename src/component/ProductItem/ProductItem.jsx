import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../../toolkitRedux/storeSlice";
import CircularProgress from '@mui/material/CircularProgress';

const ProductItem = () => {

    const [productItem, setProductItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const userId = localStorage.getItem("userId");

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProductItem(response.data);
            } catch (error) {
                console.error('Error fetching product item:', error);
            }
        }
        fetchData();
    }, [dispatch, id]);

    if (!productItem) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        )
    }

    const handleAddToCart = () => {
        if (userId) {
            dispatch(addToCart({
                productId: productItem.id,
                quantity: quantity
            }));
            setAddedToCart(true);
        } else {
            alert("Please login to add to cart");
        }
    };


    const handleIncrease = () => setQuantity(quantity + 1);

    const handleDecrease = () => setQuantity(quantity - 1);

    return (
        <Box sx={{ flexGrow: 1, m: { xs: "0", md: "30px 80px" }, color: "text.primary" }}>
            <Grid container key={productItem.title}>
                <Grid item md={5} xs={12}>
                    <div style={{ backgroundImage: `url(${productItem.image})`, height: "100%", backgroundPosition: "center center", backgroundSize: "contain", m: "0 30px", minHeight: "300px" }}></div>
                </Grid>
                <Grid item xs={12} md={7} sx={{ height: "100%" }}>
                    <Box sx={{ p: "20px", backgroundColor: "background.accent4" }}>
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, display: "flex", alignItems: "center" }}>
                            <Rating name="read-only" value={productItem.rating.rate} readOnly />
                            <Typography sx={{ ml: "10px" }}>{productItem.rating.rate}</Typography>
                        </Typography>
                        <Typography>
                            Sold: {productItem.rating.count}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, pb: "10px" }}>
                            {productItem.title}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, pb: "10px" }}>
                            £{productItem.price}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.125rem" }, pb: "10px" }}>
                            Description
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.125rem" }, pb: "20px" }}>
                            {productItem.description}
                        </Typography>
                        <Box sx={{ display: { xs: "block", sm: "flex" }, justifyContent: "space-between", alignItems: "flex-end" }}>
                            <Box>
                                <Typography sx={{ marginBottom: "20px" }}>
                                    Quantity
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Button variant="outlined" disabled={quantity === 1} onClick={handleDecrease}>-</Button>
                                    <Typography sx={{ m: "0 15px" }}>{quantity}</Typography>
                                    <Button variant="outlined" onClick={handleIncrease}>+</Button>
                                </Box>
                            </Box>
                            <Button onClick={handleAddToCart} sx={{ mt: "25px", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>
                                Add to cart
                            </Button>
                        </Box>
                        {addedToCart && <Typography sx={{ color: "green", textAlign: "center", mt: "30px" }} variant="h5">Added to cart</Typography>}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProductItem;
