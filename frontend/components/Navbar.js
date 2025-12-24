"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer
} from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import { navbarItems } from '@/constants/constants';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthStore } from '@/store/useAuthStore'

/* ================= STYLES ================= */

const NavbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 32px",
  width: '100%',
  boxSizing: 'border-box',
  [theme.breakpoints.down("sm")]: {
    padding: "16px 20px",
  }
}));

export const TitleName = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: "#20C997",
  fontFamily: "Roboto",
  whiteSpace: 'nowrap',
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem"
  }
}));

const LeftSection = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
}));

const CenterSection = styled(Box)(({ theme }) => ({
  flex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 40,
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

const RightSection = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}));

const CustomMenuIcon = styled(MenuIcon)({
  cursor: 'pointer',
  color: "#20C997",
  width: "2.4rem",
  height: "2.4rem"
});

/* ================= COMPONENT ================= */

function Navbar() {
  const { authUser, logout } = useAuthStore();
  const router = useRouter();
  const [mobileMenu, setMobilemenu] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setMobilemenu((prev) => ({ ...prev, [anchor]: open }));
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {navbarItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => router.push(item.path)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <NavbarContainer>

      {/* LEFT */}
      <LeftSection>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <TitleName>SMART SPORTS</TitleName>
        </Box>

        <IconBox>
          <CustomMenuIcon onClick={toggleDrawer('left', true)} />
          <Drawer
            anchor="left"
            open={mobileMenu.left}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </IconBox>
      </LeftSection>

      {/* CENTER */}
      <CenterSection>
        {navbarItems.map((item, index) => (
          <Link key={index} href={item.path} style={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: "#20C997",
                fontSize: '1.1rem',
                fontWeight: 500,
                transition: 'all 0.25s ease',
                '&:hover': {
                  textDecoration: 'underline',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {item.name}
            </Typography>
          </Link>
        ))}
      </CenterSection>

      {/* RIGHT */}
      <RightSection>
        {authUser ? (
          <Button
            variant='outlined'
            onClick={logout}
            sx={{
              color: '#20C997',
              borderColor: '#20C997',
              borderRadius: "45px",
              px: 3,
              fontWeight: 600,
              textTransform: 'none'
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant='outlined'
            onClick={() => router.push('/authenticate')}
            sx={{
              color: '#20C997',
              borderColor: '#20C997',
              borderRadius: "45px",
              px: 3,
              fontWeight: 600,
              textTransform: 'none'
            }}
          >
            Login
          </Button>
        )}
      </RightSection>

    </NavbarContainer>
  );
}

export default Navbar;
