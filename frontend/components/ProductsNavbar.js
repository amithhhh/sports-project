'use client'

import React from "react";
import { Box, Typography, InputBase, IconButton, Badge } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import RoomOutlined from "@mui/icons-material/RoomOutlined";

const Navbar = styled(Box)(({ theme }) => ({
    width: "100%",
    backgroundColor: "#20C997",
    padding: "0.6rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    boxSizing: "border-box",
    [theme.breakpoints.down('sm')]: {
        padding: "0.5rem",
        flexWrap: "wrap",
    }
}));

const Brand = styled(Typography)(({ theme }) => ({
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "Roboto",
    whiteSpace: "nowrap",
}));

const LocationBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#fff",
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "6px",
    flex: 1,
    padding: "2px 10px",
    maxWidth: "450px",
    [theme.breakpoints.down('sm')]: {
        order: 3,
        width: "100%",
        marginTop: "8px",
    },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    flex: 1,
    padding: "5px",
    fontSize: "0.9rem",
}));

const NavItem = styled(Typography)(({ theme }) => ({
    color: "#fff",
    fontSize: "0.95rem",
    fontFamily: "Roboto",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "&:hover": {
        textDecoration: "underline",
    },
}));

export default function Productsnavbar() {
    return (
        <Navbar>
            
            {/* Logo */}
            <Brand>Smart Sports</Brand>

            {/* Delivering Location */}
            <LocationBox>
                <RoomOutlined fontSize="small" />
                Delivering to Kannur 670006
            </LocationBox>

            {/* Search Bar */}
            <SearchContainer>
                <SearchInput placeholder="Search products..." />
                <IconButton type="button">
                    <SearchIcon />
                </IconButton>
            </SearchContainer>

            {/* Sign In */}
            <NavItem>Hello, Sign in</NavItem>

            {/* Orders */}
            <NavItem>Returns & Orders</NavItem>

            {/* Cart */}
            <IconButton sx={{ color: "#fff" }}>
                <Badge badgeContent={2} color="error">
                    <ShoppingCartOutlined />
                </Badge>
            </IconButton>

        </Navbar>
    );
}
