'use client'

import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Grow
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useRef, useState } from 'react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#20C997',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#374151',
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default function BoxSx() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult('');
    setOpenPopup(false);
  };

  const handlePredict = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:8001/api/predict/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(String(data.result));
      setOpenPopup(true);

    } catch {
      setResult('Server error');
      setOpenPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* PAGE BACKGROUND */}
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2
        }}
      >
        {/* CARD */}
        <Box
          sx={{
            width: 420,
            backgroundColor: 'background.paper',
            borderRadius: 3,
            padding: 4,
            border: '1px solid #e5e7eb',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}
        >
          <UploadFileIcon sx={{ fontSize: 52, color: 'primary.main' }} />

          <Typography
            sx={{
              mt: 1,
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'text.primary',
              letterSpacing: '0.3px'
            }}
          >
            Image Prediction
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.95rem',
              mb: 2,
              lineHeight: 1.6
            }}
          >
            Upload an image and get instant results
          </Typography>

          {preview && (
            <Box
              component="img"
              src={preview}
              sx={{
                width: '100%',
                maxHeight: 180,
                objectFit: 'contain',
                borderRadius: 2,
                mb: 1,
                border: '1px solid #e5e7eb'
              }}
            />
          )}

          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mb: 1,
              fontWeight: 600,
              textTransform: 'none'
            }}
            onClick={() => fileInputRef.current.click()}
          >
            Upload Image
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{
              fontWeight: 600,
              textTransform: 'none'
            }}
            disabled={!file || loading}
            onClick={handlePredict}
          >
            {loading ? <CircularProgress size={22} /> : 'Predict'}
          </Button>
        </Box>
      </Box>

      {/* RESULT POPUP */}
      <Grow in={openPopup}>
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1300,
          }}
        >
          <Box
            sx={{
              width: 360,
              backgroundColor: '#ffffff',
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.18)',
              border: '1px solid #e5e7eb',
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.3rem',
                color: '#20C997',
                mb: 1,
                letterSpacing: '0.4px'
              }}
            >
              Prediction Result
            </Typography>

            <Typography
              sx={{
                color: 'text.primary',
                fontSize: '1.05rem',
                fontWeight: 600,
                mb: 2,
                lineHeight: 1.6
              }}
            >
              {result}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                fontWeight: 600,
                textTransform: 'none'
              }}
              onClick={() => setOpenPopup(false)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Grow>
    </ThemeProvider>
  );
}
