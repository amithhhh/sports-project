import { Box } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'

        }}>
            <Box>{children}</Box>
            <Box></Box>
        </Box>
  );
}