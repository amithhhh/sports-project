import react from 'react';
import {Box, Typography, Container} from '@mui/material';
import styled from '@emotion/styled';


const MainContainer = styled(Box)(({theme}) => ({
    width: '40vh',
    backgroundColor: "#000",
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

const ImageBox = styled(Box)(({theme}) => ({
}))

export default function Product() {
    return (
        <MainContainer>
            <ImageBox>

            </ImageBox>
        </MainContainer>
    )
}