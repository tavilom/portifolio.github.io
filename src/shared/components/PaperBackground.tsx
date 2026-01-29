import React from 'react';
import { Paper } from '@mui/material';
import type { ReactNode } from 'react';

interface PaperBackgroundProps {
  children: ReactNode;
}

const PaperBackground: React.FC<PaperBackgroundProps> = ({ children }) => {
  return (
    <Paper 
      elevation={3}
      sx={{
        m: 1,
        p: 5,
        borderRadius: 5,               
      }}
    >
      {children}
    </Paper>
  );
};

export default PaperBackground;