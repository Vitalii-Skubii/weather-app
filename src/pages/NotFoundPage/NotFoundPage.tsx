import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%',
      }}>
      <SearchIcon sx={{ fontSize: '80px', color: 'GrayText' }} />
      <Typography variant='h2' color='text.secondary' >
        Page not found
      </Typography>
    </Box>
  );
};
 