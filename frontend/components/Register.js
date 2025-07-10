'use client'
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import { LinkedIn, Facebook, Google } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { inputFields } from '@/constants/constants';
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from "next/navigation";

export const MainContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    gap: '1rem'
}))
export const TitleHead = styled(Typography)(({ theme }) => ({
    fontSize: '3rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: "#20C997",
    [theme.breakpoints.down("sm")]: {
        fontSize: "2rem"
    }
}))

export const SignInBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    [theme.breakpoints.down("xs")]: {
        gap: '2rem'
    }
}))

export const SignInComponent = styled(Box)(({ theme }) => ({
    width: "3rem",
    height: "3rem",
    display: 'flex',
    justifyContent: 'center',
    'alignItems': 'center',
    borderRadius: "70%",
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
}))

export const Description = styled(Typography)(({ theme }) => ({
    color: 'gray',
    textAlign: 'center',
    wordSpacing: '2px'
}))

export const StyledInput = styled(TextField)(({ theme }) => ({
    backgroundColor: "#f4f8f7",
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: '#2ec4b6',
        },
        '&.Mui-focused fieldset': {
            borderColor: "#2ec4b6"
        }
    }
}))

export const AuthButton = styled('button')(({ theme }) => ({
    width: '100%',
    padding: '0.75rem 2rem',
    backgroundColor: '#20C997',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#17b089'
    }
}));

const Login = () => {
    let state = false;
    const router = useRouter();
    const { register } = useAuthStore();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    })
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        state = await register(userData);
        if (state) {
            router.push("/")
        }
    }

    return (
        <MainContainer>
            <Box>
                <TitleHead>Create Account</TitleHead>
            </Box>
            <SignInBox>
                <SignInComponent><Google /></SignInComponent>
                <SignInComponent><Facebook /></SignInComponent>
                <SignInComponent><LinkedIn /></SignInComponent>
            </SignInBox>
            <Box>
                <Description>Use your email for registrations.</Description>
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: '2rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                gap: '1rem'

            }} component='form' onSubmit={handleSubmit}>
                    {
                    inputFields.map((item, index) => (
                        <StyledInput
                            key={index}
                            name={item.name}
                            type={item.type}
                            value={userData[item.name]}
                            placeholder={item.placeholder} variant="outlined"
                            fullWidth
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            {item.icon}
                                        </InputAdornment>
                                    )
                                }
                            }}
                             required
                             onChange={handleChange}
                             />
                    ))
                }
                <AuthButton fullWidth>Sign Up</AuthButton>
            </Box>

        </MainContainer>
    )
}

export default Login;