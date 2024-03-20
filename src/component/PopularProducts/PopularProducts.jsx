import { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent, Button } from '@mui/material';

const PopularProducts = () => {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/category/products/electronics")
            .then(res => res.json())
            .then(json => setPopular(json));
    }, []);

    return (
        <Box sx={{ flexGrow: 1, margin: { xs: "30px 25px", md: "30px 80px" } }} color="text.primary">
            <Typography sx={{ margin: "100px 0 36px 0", fontSize: "2rem" }}>Our popular products</Typography>
            <Grid container spacing={3}>
                {popular.map((item) => (
                    <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <div style={{ backgroundImage: `url(${item.image})`, height: 0, paddingTop: '100%', backgroundPosition: "center center", backgroundSize: "contain" }}></div>
                            <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Typography gutterBottom color="text.secondary" sx={{ fontSize: "1.25rem" }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.125rem" }}>
                                    £{item.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: "flex" }}>
                <Button sx={{ margin: "0 auto", marginTop: "30px", backgroundColor: "background.button", color: " text.accent1", width: "200px", height: "56px" }}>See more</Button>
            </Box>
        </Box>
    )
}

export default PopularProducts;
