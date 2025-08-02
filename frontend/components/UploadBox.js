'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#20C997',
    },
  },
});

export default function BoxSx() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          border: '1px dashed',
          borderColor: 'primary.main',
          width: {lg: '80vh', xs: '60vh'},
          height: '55vh',
          paddingTop: 6
        }}
      >
        <Typography sx={{
                    color: "gray",
                    fontSize: "1.5rem"
                  }}>
                    Choose a file or drag & drop it here
                  </Typography>
      </Box>
    </ThemeProvider>
  );
}
