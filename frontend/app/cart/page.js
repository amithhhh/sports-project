'use client';

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Divider,
  Fade,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const API_BASE_URL = "http://127.0.0.1:8001";

/* ================= STYLES ================= */

const PageWrapper = styled(Box)({
  backgroundColor: "#f1f3f6",
  minHeight: "100vh",
  padding: "2rem 0",
});

const Container = styled(Box)({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
});

const CartCard = styled(Paper)({
  padding: "1.5rem",
  marginBottom: "1.2rem",
  borderRadius: "10px",
});

const CartItemBox = styled(Box)({
  display: "flex",
  gap: "1.5rem",
  alignItems: "center",
});

const ProductImage = styled("img")({
  width: 140,
  height: 140,
  objectFit: "contain",
  backgroundColor: "#fafafa",
  borderRadius: 8,
  border: "1px solid #eee",
});

const QuantityBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  marginTop: "0.6rem",
});

const Price = styled(Typography)({
  fontWeight: 700,
  color: "#20C997",
  fontSize: "1.2rem",
});

const SummaryBox = styled(Paper)({
  padding: "1.8rem",
  borderRadius: 12,
  position: "sticky",
  top: "1rem",
});

/* ================= COMPONENT ================= */

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("authToken");

  const fetchCart = async () => {
    if (!token) {
      setCart({ items: [] });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/cart/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      const data = await res.json();
      setCart(data);
    } catch {
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;

    await fetch(`${API_BASE_URL}/api/cart/update/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ item_id: itemId, quantity }),
    });

    fetchCart();
  };

  const removeItem = async (itemId) => {
    await fetch(`${API_BASE_URL}/api/cart/remove/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ item_id: itemId }),
    });

    fetchCart();
  };

  if (loading) {
    return (
      <PageWrapper>
        <Container sx={{ textAlign: "center", mt: 10 }}>
          <CircularProgress />
        </Container>
      </PageWrapper>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <PageWrapper>
        <Container sx={{ textAlign: "center", mt: 10 }}>
          <Typography variant="h5">Your cart is empty 🛒</Typography>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <Fade in>
      <PageWrapper>
        <Container>
          <Typography variant="h4" fontWeight="bold" mb={3}>
            My Cart ({cart.items.length})
          </Typography>

          <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }} gap={3}>

            {/* LEFT - CART ITEMS */}
            <Box>
              {cart.items.map((item) => (
                <CartCard key={item.id}>
                  <CartItemBox>
                    <ProductImage
                      src={`${API_BASE_URL}${item.product.image}`}
                    />

                    <Box flex={1}>
                      <Typography fontWeight="600">
                        {item.product.name}
                      </Typography>

                      <Typography variant="body2" color="gray">
                        Brand: {item.product.brand || "N/A"}
                      </Typography>

                      <Box mt={1}>
                        <Price>₹{item.total_price}</Price>
                      </Box>

                      <QuantityBox>
                        <IconButton
                          size="small"
                          disabled={item.quantity === 1}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Typography>{item.quantity}</Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <AddIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => removeItem(item.id)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </QuantityBox>

                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <LocalShippingIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          Delivery in 2–4 days
                        </Typography>
                      </Box>
                    </Box>
                  </CartItemBox>
                </CartCard>
              ))}
            </Box>

            {/* RIGHT - SUMMARY */}
            <SummaryBox>
              <Typography variant="h6" fontWeight="bold">
                Price Details
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography>Total Price</Typography>
                <Typography>₹{cart.cart_total}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography>Delivery</Typography>
                <Typography color="green">FREE</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight="bold">Amount Payable</Typography>
                <Price>₹{cart.cart_total}</Price>
              </Box>

              <Button
                fullWidth
                sx={{
                  mt: 3,
                  backgroundColor: "#fb641b",
                  color: "#fff",
                  fontWeight: "bold",
                  py: 1.4,
                  "&:hover": { backgroundColor: "#e85b19" },
                }}
              >
                PLACE ORDER
              </Button>
            </SummaryBox>
          </Box>
        </Container>
      </PageWrapper>
    </Fade>
  );
}
