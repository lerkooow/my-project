/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { deleteToCart, fetchCart, fetchCartUser, updateCart } from "../../features/cart/cartSlice";

const Cart = () => {
    const [totalAmount, setTotalAmount] = useState(0);

    const { cartUser, cart, isLoading } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        if (!cart || !cart.products) return;

        const productIds = cart.products.map(product => product.productId);
        dispatch(fetchCartUser(productIds));
    }, [cart, dispatch]);

    useEffect(() => {
        if (!cartUser || !cart || !cart.products) return;

        const calculateTotalAmount = () => {
            const total = cartUser.reduce((accumulator, product) => {
                const cartProduct = cart.products.find(item => item.productId === product.id);
                const quantity = cartProduct ? cartProduct.quantity : 0;
                const productTotal = quantity * product.price;
                return accumulator + productTotal;
            }, 0);
            setTotalAmount(total);
        };

        calculateTotalAmount();
    }, [cartUser, cart]);

    const handleDeleteClick = (productId) => {
        dispatch(deleteToCart({ productId }))
    };

    const handleDecreaseQuantity = (productId) => {
        const updatedCart = cart.products.map(item => {
            if (item.productId === productId) {
                return {
                    ...item,
                    quantity: Math.max(1, item.quantity - 1)
                };
            }
            return item;
        });
        dispatch(updateCart({ products: updatedCart }));
    };

    const handleIncreaseQuantity = (productId) => {
        const updatedCart = cart.products.map(item => {
            if (item.productId === productId) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });
        dispatch(updateCart({ products: updatedCart }));
    };


    return (
        <Box sx={{ margin: { xs: "20px", sm: "40px", md: "80px 80px 30px 80px", minHeight: "296px" }, color: "primary.main" }}>
            <Grid container sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", borderBottom: "1px solid rgba(77, 77, 77, 0.3)", padding: "10px 0" }}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Product</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>Quantity</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Typography variant="h6" sx={{ textAlign: "end" }}>Total</Typography>
                </Grid>
            </Grid>
            {cartUser && cartUser.map((product) => {
                const cartProduct = cart && cart.products.find(item => item.productId === product.id);
                const quantity = cartProduct ? cartProduct.quantity : 0;
                const total = quantity * product.price;

                return (
                    cart && cart.length !== 0 && isLoading === false ? (
                        <Grid container key={product.id} sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, flexDirection: { xs: "column", sm: "row" }, borderBottom: "1px solid rgba(77, 77, 77, 0.3)", padding: "10px 0" }}>
                            <Grid item xs={12} sm={4} sx={{ display: "flex" }}>
                                <img src={product.image} style={{ minWidth: "50px", height: "50px", textAlign: { xs: "center" } }} alt={product.title} />
                                <Link to={`/${product.category}/${product.id}`}>
                                    <Typography sx={{ ml: "10px" }}>{product.title}</Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={4} sx={{ margin: '0 0 0 auto', display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button variant="outlined" onClick={() => handleDecreaseQuantity(product.id)} disabled={quantity === 1}>-</Button>
                                <Typography sx={{ m: "15px" }}>{quantity}</Typography>
                                <Button variant="outlined" onClick={() => handleIncreaseQuantity(product.id)}>+</Button>
                            </Grid>
                            <Grid item xs={12} sm={4} sx={{ textAlign: "end", margin: '0 0 0 auto' }}>
                                <Typography>£{total.toFixed(2)}</Typography>
                                <DeleteOutlineIcon onClick={() => handleDeleteClick(product.id)} />
                            </Grid>
                        </Grid>
                    ) : (
                        <Box key={product.id} sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                            <CircularProgress />
                        </Box>
                    )
                );
            })}
            <Typography variant="h6" sx={{ margin: "30px 0", textAlign: "end" }}>Subtotal: £{totalAmount.toFixed(2)}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button sx={{ marginTop: "30px", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>
                    Continue
                </Button>
            </Box>
        </Box >
    );

}

export default Cart;