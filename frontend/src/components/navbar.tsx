import { AppBar, Toolbar, Typography } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

export const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#00162cff' }}>
        <Toolbar>
            <SchoolIcon sx={{ paddingRight: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Portal do professor
            </Typography>
        </Toolbar>
    </AppBar>
  );
};