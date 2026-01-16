'use client'

import React, { useState, useEffect } from "react";
import { Box, Typography, InputBase, IconButton, Badge } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import RoomOutlined from "@mui/icons-material/RoomOutlined";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

/* ---------- STYLES ---------- */

const Navbar = styled(Box)(({ theme }) => ({
    width: "100%",
    backgroundColor: "#20C997",
    padding: "0.6rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
}));

const Brand = styled(Typography)(() => ({
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    whiteSpace: "nowrap",
}));

const LocationBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#fff",
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
}));

const SearchInput = styled(InputBase)(() => ({
    flex: 1,
    padding: "5px",
    fontSize: "0.9rem",
}));

const NavItem = styled(Typography)(() => ({
    color: "#fff",
    fontSize: "0.95rem",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "&:hover": {
        textDecoration: "underline",
    },
}));

/* ---------- COMPONENT ---------- */

export default function Productsnavbar() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const { authUser, checkUser } = useAuthStore();
    useEffect(() => {
        checkUser();
    }, [checkUser]);

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push(`/products?search=${encodeURIComponent(query)}`);
    };

    return (
        <Navbar>

            <Brand>Smart Sports</Brand>

            <LocationBox>
                <RoomOutlined fontSize="small" />
                Delivering to {authUser?.city} {authUser?.pincode}
            </LocationBox>

            <SearchContainer>
                <SearchInput
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <IconButton onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
            </SearchContainer>

            <NavItem>Hello, {authUser ? authUser.username : "Sign in"}</NavItem>
            <NavItem>Returns & Orders</NavItem>

            <IconButton sx={{ color: "#fff" }} onClick={() => router.push("/cart")}>
                <Badge badgeContent={2} color="error">
                    <ShoppingCartOutlined />
                </Badge>
            </IconButton>

        </Navbar>
    );
}
