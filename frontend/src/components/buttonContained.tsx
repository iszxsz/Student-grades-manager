import { Button } from "@mui/material";

interface ButtonContainedProps {
  value: string;
  onClick?: () => void;
}

export const ButtonContained = ({ value, onClick }: ButtonContainedProps) => {
  return (
    <Button 
      variant="contained" 
      onClick={onClick} 
      sx={{
        backgroundColor: '#1a355b',
        margin: '20px 0px',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#142a47',
          boxShadow: 'none'
        }
      }}
    >
      {value}
    </Button>
  );
};