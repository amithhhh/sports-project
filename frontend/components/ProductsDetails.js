'use client';

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Rating,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import Cookies from "js-cookie";

const BASE_URL = "http://127.0.0.1:8001";

/* ================= STYLES ================= */

const PageWrapper = styled(Box)({
  backgroundColor: "#f1f3f6",
  minHeight: "100vh",
  padding: "2rem 0",
});

const Card = styled(Paper)({
  padding: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
  borderRadius: "10px",
});

const ProductImage = styled("img")({
  width: "100%",
  maxWidth: "420px",
  height: "420px",
  objectFit: "contain",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eee",
});

const Price = styled(Typography)({
  fontSize: "2.2rem",
  fontWeight: 700,
  color: "#20C997",
});

const OldPrice = styled("span")({
  textDecoration: "line-through",
  color: "#777",
  marginLeft: "1rem",
  fontSize: "1.1rem",
});

const Discount = styled(Chip)({
  backgroundColor: "#ffefc5",
  color: "#c88700",
  fontWeight: 600,
});

const SectionTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: "1rem",
});

const SpecRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0.6rem 0",
  borderBottom: "1px solid #eee",
});

/* ================= COMPONENT ================= */

export default function ProductsDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/${productId}/`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [productId]);

  const handleAddToCart = async () => {
    const token = Cookies.get("authToken");
    if (!token) return alert("Login required");

    setAdding(true);
    await fetch(`${BASE_URL}/api/cart/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
        price: product.discount_price || product.price,
      }),
    });
    setAdding(false);
    alert("Added to cart");
  };

  if (!product) return null;

  return (
    <PageWrapper>
      <Card>
        <Grid container spacing={4}>

          {/* LEFT IMAGE */}
          <Grid item xs={12} md={5} textAlign="center">
            <ProductImage src={product.image} />
          </Grid>

          {/* RIGHT DETAILS */}
          <Grid item xs={12} md={7}>
            <Typography variant="h5" fontWeight="600">
              {product.name}
            </Typography>

            <Box display="flex" alignItems="center" mt={1}>
              <Rating value={product.rating} readOnly precision={0.5} />
              <Typography ml={1} color="gray">
                {product.reviews_count} Ratings
              </Typography>
              <VerifiedIcon sx={{ color: "#2874f0", ml: 1 }} />
            </Box>

            <Box mt={2} display="flex" alignItems="center" gap={2}>
              <Price>₹{product.discount_price || product.price}</Price>
              {product.discount_price && (
                <>
                  <OldPrice>₹{product.price}</OldPrice>
                  <Discount label="Special Price" />
                </>
              )}
            </Box>

            <Typography color="green" mt={1}>
              {product.is_available ? "In Stock" : "Out of Stock"}
            </Typography>

            {/* OFFERS */}
            <Box mt={3}>
              <SectionTitle>Available Offers</SectionTitle>
              <Typography>🏷 Bank Offer: 10% off on credit cards</Typography>
              <Typography>🏷 Free delivery on orders above ₹499</Typography>
            </Box>

            {/* DELIVERY */}
            <Box mt={3} display="flex" alignItems="center" gap={1}>
              <LocalShippingIcon color="action" />
              <Typography>
                Delivery in 2–4 days | Free Delivery
              </Typography>
            </Box>

            {/* BUTTONS */}
            <Box mt={4} display="flex" gap={2}>
              <Button
                variant="contained"
                size="large"
                disabled={!product.is_available || adding}
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: "#ff9f00",
                  color: "#000",
                  fontWeight: 600,
                  px: 5,
                }}
              >
                ADD TO CART
              </Button>

              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#fb641b",
                  fontWeight: 600,
                  px: 5,
                }}
              >
                BUY NOW
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* DETAILS SECTION */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <SectionTitle>Product Highlights</SectionTitle>
            <Typography>• Brand: {product.brand}</Typography>
            <Typography>• Category: {product.category}</Typography>
            <Typography>• Material: {product.material}</Typography>
            <Typography>• Color: {product.color}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <SectionTitle>Specifications</SectionTitle>
            <SpecRow>
              <Typography>Weight</Typography>
              <Typography>{product.weight}</Typography>
            </SpecRow>
            <SpecRow>
              <Typography>Stock</Typography>
              <Typography>{product.stock}</Typography>
            </SpecRow>
          </Grid>
        </Grid>
      </Card>
    </PageWrapper>
  );
}
