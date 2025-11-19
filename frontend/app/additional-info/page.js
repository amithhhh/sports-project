'use client'

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export default function AddInfo() {
  const [formData, setFormData] = useState({
    mobile: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Info:", formData);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        mt: 5,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Complete Your Profile
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Before you start shopping, please provide your contact and address details.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          multiline
          rows={3}
          value={formData.address}
          onChange={handleChange}
          margin="normal"
        />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            fontSize: "1rem",
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "#20C997",
            "&:hover": {
              bgcolor: "#1ab386",
            },
          }}
        >
          Save & Continue
        </Button>
      </Box>
    </Paper>
  );
}
