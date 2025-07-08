import { MainContainer, TitleHead, AuthButton, SignInBox, SignInComponent, Description, StyledInput } from "../login/page";
import { registerFields } from "@/constants/constants";
import { Box } from "@mui/material";
import { LinkedIn, Facebook, Google } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';

const Register = () => {
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

            }}>
                {
                    registerFields.map((item, index) => (
                        <StyledInput
                            type={item.type}
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
                            }} key={index} />
                    ))
                }
                <AuthButton fullWidth>Sign Up</AuthButton>
            </Box>

        </MainContainer>
    )
}

export default Register;