import { Button } from "@mui/material";

interface ButtonContainedProps {
  value: string;
  onClick?: () => void;
}

export const ButtonContained = ({ value, onClick }: ButtonContainedProps) => {
  return (
    <Button variant="contained" onClick={onClick} sx={{backgroundColor: '#00162cff', margin:'20px 0px' }}>{value}</Button>
  );
};