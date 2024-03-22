/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Cart = ({ userId }) => {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cartProducts, setCartProducts] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/carts/${userId}`)
            .then(res => res.json())
            .then(json => {
                setCart(json);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cart:', error);
                setIsLoading(false);
            });
    }, [userId]);

    useEffect(() => {
        if (!cart || !cart.products) return;

        const productIds = cart.products.map(product => product.productId);

        const fetchProducts = async () => {
            try {
                const promises = productIds.map(productId =>
                    fetch(`https://fakestoreapi.com/products/${productId}`).then(res => res.json())
                );
                const products = await Promise.all(promises);
                setCartProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [cart]);

    useEffect(() => {
        if (!cartProducts) return;

        const total = cartProducts.reduce((accumulator, product) => {
            const quantity = cart.products.find(item => item.productId === product.id).quantity;
            const productTotal = quantity * product.price;
            return accumulator + productTotal;
        }, 0);

        setTotalAmount(total);
    }, [cartProducts, cart]);

    if (isLoading || !cart) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box sx={{ margin: { xs: "20px", sm: "40px", md: "80px" } }} color="primary.main">
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
            {cartProducts && cartProducts.map((product) => {
                const quantity = cart.products.find(item => item.productId === product.id).quantity;
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
                    sx={{ marginTop: "30px", backgroundColor: "background.button", color: 'text.accent1', width: "126px", height: "56px", borderRadius: "0" }}>
                    Continue
                </Button>
            </Box>
        </Box >
    );
}

export default Cart;
