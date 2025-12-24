import React from 'react';
import { MainContainer, TitleHead } from '@/components/Register';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import BoxSx from '@/components/UploadBox';

function page() {
  return (
    <MainContainer sx={{
    }}>
      <TitleHead>Upload the Image</TitleHead>
      <BoxSx />
    </MainContainer>
  )
}

export default page
