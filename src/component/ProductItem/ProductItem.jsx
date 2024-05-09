import { Box, Button, Fade, Grid, Modal, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { addToCart } from "../../features/cart/cartSlice";

const ProductItem = () => {

    const [productItem, setProductItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { userId } = useSelector(state => state.user);
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
    }, [id]);

    if (!productItem) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        )
    }

    const handleAddToCart = () => {
        if (userId !== "no user") {
            dispatch(addToCart({
                productId: productItem.id,
                quantity: quantity
            }));
            setAddedToCart(true);
        } else {
            handleOpen();
        }
    };


    const handleIncrease = () => setQuantity(quantity + 1);

    const handleDecrease = () => setQuantity(quantity - 1);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Box sx={{ flexGrow: 1, m: { xs: "0", md: "30px 80px" }, color: "text.primary" }}>
            <Grid container key={productItem.title}>
                <Grid item md={5} xs={12}>
                    <div style={{ backgroundImage: `url(${productItem.image})`, height: "100%", backgroundPosition: "center center", backgroundSize: "contain", m: "0 30px", minHeight: "300px" }} data-testid="image-item"></div>
                </Grid>
                <Grid item xs={12} md={7} sx={{ height: "100%" }}>
                    <Box sx={{ p: "20px", backgroundColor: "background.accent4" }}>
                        <Box sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, display: "flex", alignItems: "center" }}>
                            <Rating name="read-only" value={productItem.rating.rate} readOnly data-testid="rating" />
                            <Typography sx={{ ml: "10px" }} >{productItem.rating.rate}</Typography>
                        </Box>
                        <Typography>
                            Sold: {productItem.rating.count}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, pb: "10px" }} data-testid="title-item">
                            {productItem.title}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, pb: "10px" }}>
                            £{productItem.price}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.125rem" }, pb: "10px" }}>
                            Description
                        </Typography>
                        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.125rem" }, pb: "20px" }} data-testid="description">
                            {productItem.description}
                        </Typography>
                        <Box sx={{ display: { xs: "block", sm: "flex" }, justifyContent: "space-between", alignItems: "flex-end" }}>
                            <Box>
                                <Typography sx={{ marginBottom: "20px" }}>
                                    Quantity
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Button variant="outlined" disabled={quantity === 1} onClick={handleDecrease}>-</Button>
                                    <Typography sx={{ m: "0 15px" }} data-testid="quantity">{quantity}</Typography>
                                    <Button variant="outlined" onClick={handleIncrease}>+</Button>
                                </Box>
                            </Box>
                            <Button onClick={handleAddToCart} sx={{ mt: "25px", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>
                                Add to cart
                            </Button>
                            <Modal
                                data-testid="modal"
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                slotProps={{
                                    backdrop: {
                                        timeout: 500,
                                    },
                                }}
                            >
                                <Fade in={open}>
                                    <Box sx={style}>
                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                            You are not authorized
                                        </Typography>
                                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                            You must login to add item to cart
                                        </Typography>
                                    </Box>
                                </Fade>
                            </Modal>
                        </Box>
                        {addedToCart && <Typography sx={{ color: "green", textAlign: "center", mt: "30px" }} variant="h5">Added to cart</Typography>}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProductItem;
