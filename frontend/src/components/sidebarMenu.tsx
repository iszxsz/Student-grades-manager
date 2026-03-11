import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ListItemIcon, ListItemText, MenuItem, MenuList , Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const SidebarMenu = () => {
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
        <MenuItem component={Link} to="/" sx={{
          borderRadius: '0.5rem',
          marginBottom: '0.5rem',
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
        }}>
            <ListItemIcon>
            <DashboardIcon sx={{ color: '#1a355b', fontSize: '1.5rem' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Dashboard" 
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#475569',
              }}
            />
        </MenuItem>
        <MenuItem component={Link} to="/alunos" sx={{
          borderRadius: '0.5rem',
          marginBottom: '0.5rem',
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
        }}>
            <ListItemIcon>
            <GroupsIcon sx={{ color: '#1a355b', fontSize: '1.5rem' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Alunos" 
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#475569',
              }}
            />
        </MenuItem>
        <MenuItem component={Link} to="/novoAluno" sx={{
          borderRadius: '0.5rem',
          marginBottom: '0.5rem',
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
        }}>
            <ListItemIcon>
            <PersonSearchIcon sx={{ color: '#1a355b', fontSize: '1.5rem' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Adicionar Novo Aluno" 
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#475569',
              }}
            />
        </MenuItem>
        </MenuList>
    </Box>
  );
}