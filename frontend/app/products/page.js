'use client'

import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "2rem",
}));

const ProductCard = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    transition: "0.3s ease",
    cursor: "pointer",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
    }
}));

const ProductImage = styled("img")(({ theme }) => ({
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
}));

const Price = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    color: "#20C997",
    fontSize: "1.2rem",
}));

const ViewButton = styled(Button)(({ theme }) => ({
    marginTop: "0.5rem",
    padding: "0.5rem",
    borderRadius: "6px",
    textTransform: "none",
    fontWeight: "bold",
    backgroundColor: "#20C997",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#17b089",
    },
}));

export default function ProductsPage() {

    // Example product data — Replace with API or state later
    const products = [
        {
            id: 1,
            name: "Premium Football",
            price: "₹1299",
            image: "/images/ball1.jpg"
        },
        {
            id: 2,
            name: "Cricket Bat",
            price: "₹1999",
            image: "/images/bat1.jpg"
        },
        {
            id: 3,
            name: "Basketball",
            price: "₹999",
            image: "/images/basket.jpg"
        },
        {
            id: 4,
            name: "Badminton Racket",
            price: "₹1499",
            image: "/images/racket.jpg"
        },
        {
            id: 5,
            name: "Tennis Ball Pack (6 pcs)",
            price: "₹299",
            image: "/images/tennisball.jpg"
        },
    ];

    return (
        <Container>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                Products
            </Typography>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard>
                            <ProductImage src={product.image} alt={product.name} />

                            <Typography
                                fontWeight="bold"
                                sx={{ fontSize: "1rem", mt: 1 }}
                            >
                                {product.name}
                            </Typography>

                            <Price>{product.price}</Price>

                            <ViewButton>
                                View Details
                            </ViewButton>
                        </ProductCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
