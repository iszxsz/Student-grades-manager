import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

export const Navbar = () => {
  return (
    <AppBar position="static" sx={{ 
      backgroundColor: '#1a355b',
      boxShadow: 'none',
    }}>
        <Toolbar sx={{ padding: '1rem 1.5rem' }}>
            <SchoolIcon sx={{ 
              marginRight: 2, 
              width: '1.25em', 
              height: '1.25em',
              color: '#ffffff',
            }} />
            <Typography variant="h6" component="div" sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              fontSize: '1rem',
              color: '#ffffff',
            }}>
            Portal do Professor
            </Typography>
        </Toolbar>
    </AppBar>
  );
};