import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ListItemIcon, ListItemText, MenuItem, MenuList , Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const SidebarMenu = () => {
  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100%' }}>
        <Typography variant="h6" component="div" sx={{ padding: 2, fontSize: 12, color: 'gray' }}>GESTÃO</Typography>
        <MenuList>   
        <MenuItem component={Link} to="/">
            <ListItemIcon>
            <DashboardIcon sx={{ color: '#00162cff' }} />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/alunos">
            <ListItemIcon>
            <GroupsIcon sx={{ color: '#00162cff' }} />
            </ListItemIcon>
            <ListItemText>Alunos</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/novoAluno">
            <ListItemIcon>
            <PersonSearchIcon sx={{ color: '#00162cff' }} />
            </ListItemIcon>
            <ListItemText>Adicionar Novo Aluno</ListItemText>
        </MenuItem>
        </MenuList>
    </Box>
  );
}