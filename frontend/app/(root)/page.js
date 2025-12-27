"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { styled, keyframes } from "@mui/system";
import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSyncUser } from "@/hooks/useSyncUser";

/* ================= ANIMATION ================= */

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-18px); }
  100% { transform: translateY(0px); }
`;

/* ================= STYLES ================= */

const MainBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  overflow: 'hidden',
  backgroundColor: '#f9fafb',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: 0,
    minHeight: "39rem",
    backgroundColor: '',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url("/background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.8,
      zIndex: -1,
    },
  },
}));

const ContentBox = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: 'center',
  backgroundColor: "#20C997",
  width: "60%",
  height: "38rem",
  padding: "10% 12%",
  gap: 20,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: "20% 12%",
    textAlign: 'center',
  },
}));

const TitleName = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  color: "#fff",
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const ShoeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '38rem',

  animation: `${float} 4s ease-in-out infinite`,

  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

/* ================= COMPONENT ================= */

export default function Home() {
  const { checkUser } = useAuthStore();
  useSyncUser();

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      checkUser(token);
    }
  }, [checkUser]);

  const router = useRouter();

  return (
    <MainBox>

      {/* LEFT CONTENT */}
      <ContentBox>
        <TitleName>
          Boost Your Performance with Smart Sports
        </TitleName>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "1.3rem",
            lineHeight: 1.6,
            maxWidth: 520,
          }}
        >
          Discover the latest technology in sports equipment and gear designed
          to elevate your game
        </Typography>

        <Button
          variant='outlined'
          sx={{
            width: "12rem",
            mt: 2,
            color: '#20C997',
            backgroundColor: "#fff",
            borderColor: '#20C997',
            borderRadius: "45px",
            fontWeight: 600,
            textTransform: 'none',
          }}
          onClick={() => router.push("/predict")}
        >
          Scan Image
        </Button>
      </ContentBox>

      {/* RIGHT IMAGE */}
      <ShoeBox>
        <Image
          src="/shoe.png"
          alt="Smart Sports Shoe"
          width={650}
          height={500}
          priority
        />
      </ShoeBox>

    </MainBox>
  );
}
