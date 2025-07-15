"use client";

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';

const NavbarContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
    margin: 5

}))

const TitleName = styled(Typography)(({ theme }) => ({
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: "#20C997",
    fontFamily: "roboto",
    [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem"
    }
}))

const ListContainer = styled(Box)(({theme}) => ({
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
}))




function Navbar() {
    const router = useRouter();
    return (
        <NavbarContainer>
            <Box sx={{
                display: {
                    xs: 'none',
                    md: 'block'
                },
                flex: 1
            }}><TitleName>SMART SPORTS</TitleName></Box>
            <ListContainer>
                <Box sx={{color: "#20C997", fontSize: "1rem", fontStyle: "bold"}}>home</Box>
                <Box sx={{color: "#20C997"}}>About</Box>
                <Box sx={{color: "#20C997"}}>Contact us</Box>
            </ListContainer>
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row-reverse'
            }}>
                <Button variant='outlined'
               onClick={() => router.push('/authenticate')}
                    sx={{
                        color: '#20C997',
                        borderColor: '#20C997',
                        borderRadius: "45px",
                    }}
                >
                    Login
                </Button>
            </Box>
        </NavbarContainer>
    )
}

export default Navbar
