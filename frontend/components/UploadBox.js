'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Typography, Input } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useRef, useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#20C997',
    },
  },
});

export default function BoxSx() {

  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const tempFile = event.target.files[0];
    setFile(tempFile)
    console.log('selected file: ', file)
  }

  const handlePredict = () => {
    window.alert('You just clicked predict button')
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          alignItems: "center",
          flexDirection: "column",
          border: '1px dashed',
          borderColor: 'primary.main',
          width: {lg: '80vh', xs: '60vh'},
          height: '55vh',
          paddingTop: 6,
          borderRadius: "20px",
          gap: 2
        }}
      >
        <Box>
          <UploadFileIcon width={50} />
        </Box>
        <Typography sx={{
                    color: "gray",
                    fontSize: "1.3rem",
                    fontWeight: "bold"
                  }}>
                    Choose a file or drag & drop it here
                  </Typography>
                  <Typography sx={{
                    color: "gray",
                    fontSize: "1rem",
                  }}>JPEG, PNG formats, Uo to 4MB</Typography>
                                     {
                    file && ( <Typography sx={{
                      color: 'primary.main'
                    }}>{`Selected Image: ${file.name}`}</Typography> )
                   }
                  <Box sx={{
                    display: 'flex',
                    gap: 2
                     }} component="form"
                     onSubmit={handlePredict}>
                   <input type='file' ref={fileInputRef} onChange={handleFileChange} style={{display: 'none'}} />
                   <Button variant='contained' onClick={handleButtonClick}>Upload File</Button>
                   <Button variant='contained' type='submit'>Predict Image</Button>
                  </Box>
      </Box>
    </ThemeProvider>
  );
}
