'use client'

import React from "react";
import { Box, Typography, Container, Input } from "@mui/material";
import { flex, styled } from "@mui/system";


const MainContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#20C997",
    margin: 0,
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '7vh',
}))

const ChildBox = styled(Box)(({theme}) => ({
    color: "#fff",
    flex: 1,
}))


export default function Productsnavbar() {
    return (
        <MainContainer>
            <ChildBox>
                <Typography sx={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 20}}>Smart Sports</Typography>
            </ChildBox>
            <ChildBox sx={{fontFamily: 'sans-serif', fontWeight: 'semi-bold', fontSize: 15}}>Delivering to kannur 670006</ChildBox>
            <ChildBox><Input size="50"/></ChildBox>
            <ChildBox sx={{fontFamily: 'sans-serif', fontWeight: 'semi-bold', fontSize: 15, cursor: 'pointer'}}>Hello, Sign in</ChildBox>
            <ChildBox sx={{fontFamily: 'sans-serif', fontWeight: 'semi-bold', fontSize: 15, cursor: 'pointer'}}>Returns & Orders</ChildBox>
            <ChildBox sx={{fontFamily: 'sans-serif', fontWeight: 'semi-bold', fontSize: 15, cursor: 'pointer'}}>Carts</ChildBox>
        </MainContainer>
    )
}