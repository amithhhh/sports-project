"use client";
import { useAuthRedirect } from "@/hooks/usAuthRedirect";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { styled } from "@mui/system";
import { Box, Container, Typography, Button } from "@mui/material";
// import {shoeImage} from '@/assets/images/shoe.png'
import Image from "next/image";
import { useRouter } from "next/navigation";



const MainBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(2),
  zIndex: 1, // Ensure content is above overlay
  overflow: 'hidden',

  // Responsive
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: 0,
    height: "39rem",
      '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.8, // Controls image visibility
    zIndex: -1, // Put behind content
  },
  },

  // Pseudo-element for background overlay

}));



const ContentBox = styled(Container)(({theme}) => ({
  display: "flex",
  flexDirection: "column",
 backgroundColor: "#20C997",
  margin: 0,
  width: "60%",
  height: "38rem",
  padding: "10% 20% 10%",
  gap: 10,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: "20% 15% 20% 10%"
  }
}))
const TitleName = styled(Typography)(({ theme }) => ({
    fontSize: '3rem',
    fontWeight: 'bold',
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
        fontSize: "2rem"
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
  const router = useRouter();
  return (
      <MainBox>
        <ContentBox>
          <TitleName>Boost Your Performance with Smart Sports</TitleName>
          <Typography sx={{
            color: "#fff",
            fontSize: "1.5rem"
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
                        fontWeight: "1rem"
                    }}
                    onClick={() => router.push("/predict")}
                >
                    Scan Image
                </Button>
        </ContentBox>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
                      display: {
              xs: 'none',
              lg: 'block'
            },
            height: {
              lg: '38rem',
              xs: "12rem"
            },
        }}>
          <Image src="/shoe.png" alt="alt text" width={650} height={500} sx={{

          }} />
        </Box>
      </MainBox>
  );
}
