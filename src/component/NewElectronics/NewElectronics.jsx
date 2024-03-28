/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";

const NewCategoryComponent = ({ category }) => {
    const [newComponent, setNewComponent] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/category/${category}?limit=4`);
                setNewComponent(response.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        }
        fetchData();
    }, [category]);

    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <Box sx={{ flexGrow: 1, margin: { xs: "30px 25px", md: "30px 80px" } }} color="text.primary">
            <Typography sx={{ margin: "100px 0 36px 0", fontSize: "2rem" }}>New {capitalizeFirstLetter(category)}</Typography>
            <Grid container spacing={3}>
                {newComponent && newComponent.map((item, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <div style={{ backgroundImage: `url(${item.image})`, height: 0, paddingTop: '100%', backgroundPosition: "center center", backgroundSize: "contain" }}></div>
                            <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Link to={`/${category}/${item.id}`}>
                                    <Typography gutterBottom color="text.secondary" sx={{ fontSize: "1.25rem" }}>
                                        {item.title}
                                    </Typography>
                                </Link>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.125rem" }}>
                                    £{item.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: "flex" }}>
                <Button sx={{ margin: "0 auto", marginTop: "30px", backgroundColor: "background.button", color: "text.accent1", width: "200px", height: "56px", '&:hover': { color: '#FFF', backgroundColor: 'background.accent3' } }}>
                    <Link to={`/${category}`}>
                        See more
                    </Link>
                </Button>
            </Box>
        </Box>
    )
}

export default NewCategoryComponent;
