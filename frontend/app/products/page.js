'use client';

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter, useSearchParams } from "next/navigation";

/* ---------- STYLES ---------- */

const Container = styled(Box)(() => ({
    width: "100%",
    padding: "2rem",
}));

const ProductCard = styled(Box)(() => ({
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

const ProductImage = styled("img")(() => ({
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
}));

const Price = styled(Typography)(() => ({
    fontWeight: "bold",
    color: "#20C997",
    fontSize: "1.2rem",
}));

const ViewButton = styled(Button)(() => ({
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

/* ---------- CONFIG ---------- */

const API_BASE_URL = "http://127.0.0.1:8001";

/* ---------- COMPONENT ---------- */

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = searchQuery
                    ? `${API_BASE_URL}/api/products/?search=${searchQuery}`
                    : `${API_BASE_URL}/api/products/`;

                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch products");

                const data = await response.json();
                console.log(data);
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    return (
        <Container>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                Products {searchQuery && `— "${searchQuery}"`}
            </Typography>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" textAlign="center">
                    {error}
                </Typography>
            )}

            <Grid container spacing={3}>
                {!loading && !error && products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard>
                            <ProductImage
                                src={product.image}
                                alt={product.name}
                            />

                            <Typography fontWeight="bold" sx={{ fontSize: "1rem", mt: 1 }}>
                                {product.name}
                            </Typography>

                            <Price>₹{product.price}</Price>

                            <ViewButton
                                onClick={() => router.push(`/products/${product.id}`)}
                            >
                                View Details
                            </ViewButton>
                        </ProductCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
