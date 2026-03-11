import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ListItemIcon, ListItemText, MenuItem, MenuList , Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export const SidebarMenu = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: DashboardIcon },
    { path: '/alunos', label: 'Alunos', icon: GroupsIcon },
    { path: '/novoAluno', label: 'Adicionar Novo Aluno', icon: PersonSearchIcon }
  ];

  return (
    <Box sx={{ 
      width: 250, 
      bgcolor: '#ffffff', 
      height: '100%',
      borderRight: '1px solid #e2e8f0',
    }}>
        <Box sx={{ padding: '1.5rem' }}>
          <Typography variant="body2" sx={{ 
            fontSize: '0.75rem', 
            fontWeight: 600,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            GESTÃO
          </Typography>
        </Box>
        <MenuList sx={{ padding: '0 0.5rem' }}>   
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <MenuItem 
              key={item.path}
              component={Link} 
              to={item.path} 
              sx={{
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                backgroundColor: isActive ? '#e0f2fe' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive ? '#bae6fd' : '#f1f5f9',
                },
              }}
            >
              <ListItemIcon>
                <Icon sx={{ 
                  color: isActive ? '#0369a1' : '#1a355b', 
                  fontSize: '1.5rem' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0369a1' : '#475569',
                }}
              />
            </MenuItem>
          );
        })}
        </MenuList>
    </Box>
  );
}