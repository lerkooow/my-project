/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchCartUser } from "../../toolkitRedux/storeSlice";

const Cart = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);

    const { cartUser, cart } = useSelector(state => state.onlineStore)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart(userId));
        setIsLoading(false);
    }, [userId]);

    useEffect(() => {
        if (!cart || !cart.products) return;

        const productIds = cart.products.map(product => product.productId);
        dispatch(fetchCartUser(productIds));
    }, [cart]);

    useEffect(() => {
        if (!cartUser) return;

        const calculateTotalAmount = () => {
            const total = cartUser.reduce((accumulator, product) => {
                const cartProduct = cart.products.find(item => item.productId === product.id);
                const quantity = cartProduct ? cartProduct.quantity : 0;
                const productTotal = quantity * product.price;
                return accumulator + productTotal;
            }, 0);
            console.log("🚀 ~ total ~ cartUser:", cartUser)
            setTotalAmount(total);
        };

        calculateTotalAmount();
    }, [cartUser, cart]);

    if (isLoading) {
        return (
            <Box sx={{ height: "407px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontSize: "2rem" }}>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ margin: { xs: "20px", sm: "40px", md: "80px 80px 30px 80px" } }} color="primary.main">
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
                const cartProduct = cart.products.find(item => item.productId === product.id);
                const quantity = cartProduct ? cartProduct.quantity : 0;
                const total = quantity * product.price;

                return (
                    <Grid container key={product.title} sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, flexDirection: { xs: "column", sm: "row" }, borderBottom: "1px solid rgba(77, 77, 77, 0.3)", padding: "10px 0" }}>
                        <Grid display={{ display: "flex" }} item xs={12} sm={4}>
                            <img src={product.image} style={{ width: "50px", height: "50px", marginRight: "10px", textAlign: { xs: "center" } }} alt={product.title} />
                            <Typography>{product.title}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: "center", margin: '0 0 0 auto' }}>
                            <Typography>{quantity}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: "end", margin: '0 0 0 auto' }}>
                            <Typography>£{total.toFixed(2)}</Typography>
                        </Grid>
                    </Grid>
                );
            })}
            <Typography variant="h6" sx={{ margin: "30px 0", textAlign: "end" }}>Subtotal: £{totalAmount.toFixed(2)}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    sx={{ backgroundColor: "background.button", color: 'text.accent1', width: "126px", height: "56px", borderRadius: "0" }}>
                    Continue
                </Button>
            </Box>
        </Box >
    );
}

export default Cart;