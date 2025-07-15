"use client";
import { useAuthRedirect } from "@/hooks/usAuthRedirect";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { styled } from "@mui/system";
import { Box, Container, Typography, Button } from "@mui/material";
// import {shoeImage} from '@/assets/images/shoe.png'
import Image from "next/image";


const MainBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: 2,
  
}))

const ContentBox = styled(Container)(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#20C997",
  margin: 0,
  width: "60%",
  height: "38rem",
  padding: "10% 20% 10%",
  gap: 10
}))
const TitleName = styled(Typography)(({ theme }) => ({
    fontSize: '3rem',
    fontWeight: 'bold',
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem"
    }
}))


export default function Home() {
  useAuthRedirect();
  const { checkUser, authUser } = useAuthStore();
  useEffect(() => {
      const token = Cookies.get('authToken');
      if (token) {
        checkUser(token);
      }
  },[checkUser]);

  return (
      <MainBox>
        <ContentBox>
          <TitleName>Boost Your Performance with</TitleName>
          <TitleName sx={{
            marginBottom: 1
          }}>Smart Sports</TitleName>
          <Typography sx={{
            color: "#fff",
            fontSize: "1rem"
          }}>
            Discover the latest technology in sports equipment and gear designed to elevate your game
          </Typography>
                          <Button variant='outlined'
                    sx={{
                      width: "10rem",
                        color: '#20C997',
                        fontSize: "bold",
                        backgroundColor: "#fff",
                        borderColor: '#20C997',
                        borderRadius: "45px",
                    }}
                >
                    Scan Image
                </Button>
        </ContentBox>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image src="/shoe.png" alt="alt text" width={650} height={500} />
        </Box>
      </MainBox>
  );
}
