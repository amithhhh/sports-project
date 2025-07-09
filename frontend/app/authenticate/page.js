'use client';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import Login from '@/components/Login';
import Register from '@/components/Register';

const AuthenticatePage = () => {

    const [isSignIn, setIsSignIn] = useState(true);
    return(
            <Box sx={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.6s ease-in-out'
            }}>
                <Box
                    sx={{
                        width: "50%",
                        height: "100%",
                        backgroundColor: "#20C997",
                        color: 'white',
                        padding: 4,
                        display: {
                            xs: 'none',
                            sm: 'flex'
                        },
                        flexDirection: 'column',
                        justifyContent: 'center',
                        'alignItems': 'center',
                        transition: 'transform 0.6s ease',
                        transform: isSignIn ? 'translateX(0%)' : 'translateX(100%)',
                        zIndex: 1
                    }}
                >
                    <Typography variant='h4' fontWeight="bold" mb={2}>
                        {isSignIn ? 'To keep connected with us please login with your personal info' : 'Enter your personal details and start your journey with us'}
                    </Typography>
                    <Button variant='outlined'
                    onClick={() => setIsSignIn((prev) => !prev)}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            color: '#20C997'
                        }
                    }}
                    >
                        {isSignIn ? 'SIGN UP' : 'SIGN IN'}
                    </Button>
                </Box>
                <Box sx={{
                    width: {
                        xs: "100%",
                        sm: "50%"
                    },
                    height: "100%",
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                    transition: 'transform 0.6s ease',
                    transform: isSignIn ? 'translateX(0%)' : 'translateX(-100%)',
                    zIndex: 2,
                }}>
                    {isSignIn ? <Login /> : <Register />}
                    
                </Box>
            </Box>
    )
}

export default AuthenticatePage;