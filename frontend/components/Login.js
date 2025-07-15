import { MainContainer, TitleHead, AuthButton, SignInBox, SignInComponent, Description, StyledInput } from "@/components/Register";
import { loginFields } from "@/constants/constants";
import { Box, Typography } from "@mui/material";
import { LinkedIn, Facebook, Google } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const Login = () => {
    let state = false;
    const router = useRouter();
    const { login, getUser, user } = useAuthStore();
    const [userData, setUserData] = useState({
            username: '',
            password: ''
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
            state = await login(userData);
            if (state) {
                router.push('/');
            }
        }
    

    return (
        <MainContainer>
            <Box>
                <TitleHead>Sign in to SmartSports</TitleHead>
            </Box>
            <SignInBox>
                <SignInComponent><Google /></SignInComponent>
                <SignInComponent><Facebook /></SignInComponent>
                <SignInComponent><LinkedIn /></SignInComponent>
            </SignInBox>
            <Box>
                <Description>Or use your Email Account</Description>
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
            
                        }} component='form' method="POST" onSubmit={handleSubmit}>
                                {
                                loginFields.map((item, index) => (
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
                            <AuthButton fullWidth>Sign in</AuthButton>
                        </Box>
            

        </MainContainer>
    )
}

export default Login;