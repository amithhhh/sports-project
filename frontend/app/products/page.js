'use client'
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from '@mui/system';
import ProductsDetails from "@/components/ProductsDetails";
import FilterBox from "@/components/FilterBox";

const MainContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row'
}))

const page = () => {
    return (
        <MainContainer>
            <FilterBox />
            <ProductsDetails />
        </MainContainer>
    )
}

export default page;