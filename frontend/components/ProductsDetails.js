import React,{useState,useEffect} from "react";
import Link from "next/link";
import { Box, Typography, Container } from "@mui/material";
import { styled } from '@mui/system';
import Product from "./Product";

const MainContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '20px'
}))

const ChildBox = styled(Box)(({theme}) => ({
    width: '300px',
    height: '200px'
}))


function ProductsDetails(){
    
    const products = [
        {
            id: 1,
            image: 'alt',
            title: 'cricket bat',
            price: '10'
        },
        {
            id: 1,
            image: 'alt',
            title: 'cricket bat',
            price: '10'
        },
        {
            id: 1,
            image: 'alt',
            title: 'cricket bat',
            price: '10'
        },
        {
            id: 1,
            image: 'alt',
            title: 'cricket bat',
            price: '10'
        }
    ]        
    

    return(
        <MainContainer>
            <Product />
        </MainContainer>
    )

}

export default ProductsDetails;