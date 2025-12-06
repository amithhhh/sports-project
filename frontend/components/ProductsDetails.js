'use client'

import React, { useState } from "react";
import { Box, Typography, Button, Grid, Rating } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
}));

const ImageSection = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
}));

const MainImage = styled("img")(({ theme }) => ({
    width: "450px",
    height: "450px",
    objectFit: "contain",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",

    [theme.breakpoints.down("sm")]: {
        width: "300px",
        height: "300px",
    },
}));

const ThumbnailRow = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "1rem",
}));

const Thumbnail = styled("img")(({ selected }) => ({
    width: "70px",
    height: "70px",
    borderRadius: "8px",
    cursor: "pointer",
    border: selected ? "3px solid #20C997" : "2px solid #ddd",
    objectFit: "cover",
    transition: "0.2s ease",
}));

const DetailsSection = styled(Box)(({ theme }) => ({
    padding: "1rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "500px",
}));

const Price = styled(Typography)(({ theme }) => ({
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#20C997",
}));

const ActionButton = styled(Button)(({ theme }) => ({
    padding: "0.75rem",
    borderRadius: "8px",
    fontWeight: "bold",
    textTransform: "none",
    fontSize: "1rem",
}));

export default function ProductsDetails() {

    // Demo product
    const product = {
        name: "Premium Football",
        description:
            "High-quality stitched football suitable for all weather conditions. Perfect for training and matches.",
        price: 1299,
        rating: 4.4,
        images: [
            "/images/ball1.jpg",
            "/images/ball2.jpg",
            "/images/ball3.jpg",
            "/images/ball4.jpg",
        ],
    };

    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <Container>

            <Grid container spacing={4}>

                {/* LEFT SECTION: IMAGES */}
                <Grid item xs={12} md={6}>
                    <ImageSection>
                        <MainImage src={selectedImage} alt="product" />

                        <ThumbnailRow>
                            {product.images.map((img, i) => (
                                <Thumbnail
                                    key={i}
                                    src={img}
                                    selected={img === selectedImage}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </ThumbnailRow>
                    </ImageSection>
                </Grid>

                {/* RIGHT SECTION: DETAILS */}
                <Grid item xs={12} md={6}>
                    <DetailsSection>
                        <Typography variant="h4" fontWeight="bold">
                            {product.name}
                        </Typography>

                        <Rating
                            value={product.rating}
                            readOnly
                            precision={0.5}
                            size="medium"
                        />

                        <Price>₹{product.price}</Price>

                        <Typography color="gray">
                            {product.description}
                        </Typography>

                        <Box sx={{ display: "flex", gap: "1rem", mt: 2 }}>
                            <ActionButton
                                variant="contained"
                                sx={{ backgroundColor: "#20C997", "&:hover": { backgroundColor: "#17b089" } }}
                            >
                                Add to Cart
                            </ActionButton>

                            <ActionButton variant="outlined" sx={{ borderColor: "#20C997", color: "#20C997" }}>
                                Buy Now
                            </ActionButton>
                        </Box>
                    </DetailsSection>
                </Grid>

            </Grid>

        </Container>
    );
}
