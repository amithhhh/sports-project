'use client'

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Rating } from "@mui/material";
import { styled } from "@mui/system";

const BASE_URL = "http://127.0.0.1:8001";

const Container = styled(Box)({
  width: "100%",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
});

const ImageSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const MainImage = styled("img")({
  width: "450px",
  height: "450px",
  objectFit: "contain",
  borderRadius: "10px",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
});

const DetailsSection = styled(Box)({
  padding: "1rem 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "500px",
});

const Price = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#20C997",
});

export default function ProductsDetails({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productId) return;

    fetch(`${BASE_URL}/api/products/${productId}/`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Failed to load product", err));
  }, [productId]);

  if (!product) {
    return (
      <Container>
        <Typography>Loading product...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={4}>

        {/* IMAGE */}
        <Grid item xs={12} md={6}>
          <ImageSection>
            <MainImage
              src={product.image}
              alt={product.name}
            />
          </ImageSection>
        </Grid>

        {/* DETAILS */}
        <Grid item xs={12} md={6}>
          <DetailsSection>

            <Typography variant="h4" fontWeight="bold">
              {product.name}
            </Typography>

            <Rating value={4.5} readOnly />

            <Price>₹{product.price}</Price>

            <Typography color="gray">
              {product.description || "No description available"}
            </Typography>

            <Box sx={{ display: "flex", gap: "1rem", mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#20C997",
                  "&:hover": { backgroundColor: "#17b089" },
                }}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#20C997",
                  color: "#20C997",
                }}
              >
                Buy Now
              </Button>
            </Box>

          </DetailsSection>
        </Grid>

      </Grid>
    </Container>
  );
}
