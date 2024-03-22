/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewMen = () => {

    const [mens, setMens] = useState([]);
    useEffect(() => {
        const fetchDataMens = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products/category/men\'s clothing');
                setMens(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataMens();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, margin: { xs: "30px 25px", md: "30px 80px" } }} color="text.primary">
            <Typography sx={{ margin: "100px 0 36px 0", fontSize: "2rem" }}>New Men's clothing</Typography>
            <Grid container spacing={3}>
                {mens.map(item => (
                    <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <div style={{ backgroundImage: `url(${item.image})`, height: 0, paddingTop: '100%', backgroundPosition: "center center", backgroundSize: "contain" }}></div>
                            <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <Typography gutterBottom color="text.secondary" sx={{ fontSize: "1.25rem" }}>
                                        <Link to={`/men's clothing/${item.id}`}>
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
                }
            </Grid >
            <Box sx={{ display: "flex" }}>
                <Button sx={{ margin: "0 auto", marginTop: "30px", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>
                    <Link to="/men's clothing">
                        See more
                    </Link>
                </Button>
            </Box>
        </Box >
    )
}

export default NewMen;

