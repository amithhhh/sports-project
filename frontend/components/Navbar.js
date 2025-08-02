"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemButton, ListItemText, Drawer } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import { navbarItems } from '@/constants/constants';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthStore } from '@/store/useAuthStore'

const NavbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 30,
  margin: 5,
  [theme.breakpoints.down("sm")]: {
    padding: 20
  }

}))

export const TitleName = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: "#20C997",
  fontFamily: "roboto",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem"
  }
}))

const ListContainer = styled(Box)(({ theme }) => ({
  flex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 40,
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}))

const IconBox = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    alignItems: 'center',
  },
}));

const CustomMenuIcon = styled(MenuIcon)({
  cursor: 'pointer',
  color: "#20C997",
  width: "5rem",
  height: "3rem"
});




function Navbar() {
  const { authUser, logout } = useAuthStore();
  const router = useRouter();
  const [mobileMenu, setMobilemenu] = useState({ left: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setMobilemenu((prevState) => ({ ...prevState, [anchor]: open }));
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
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
      <Box sx={{
        display: {
          xs: 'none',
          md: 'block'
        },
        flex: 1
      }}><TitleName>SMART SPORTS</TitleName></Box>
      <IconBox>
        <CustomMenuIcon onClick={toggleDrawer('left', true)} />
        <Drawer anchor="left" open={mobileMenu.left} onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </IconBox>
      <ListContainer>
        {
          navbarItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <Typography sx={{
                color: "#20C997",
                fontSize: '1.2rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  textDecoration: 'underline', // or 'none' for no underline
                  transform: 'scale(1.05)', // optional slight zoom effect
                },
              }}>
                {item.name}
              </Typography>
            </Link>
          ))
        }
      </ListContainer>
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row-reverse'
      }}>
        {
          authUser ? (
            <Button variant='outlined'
              onClick={logout}
              sx={{
                color: '#20C997',
                borderColor: '#20C997',
                borderRadius: "45px",
              }}
            >
              Logout
            </Button>
          ) : (
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
          )
        }
      </Box>
    </NavbarContainer>
  )
}

export default Navbar
