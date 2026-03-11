import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { TextFieldVariants } from '@mui/material/TextField';

interface BasicTextFieldsProps {
  label: string;
  variant: TextFieldVariants;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicTextFields({ label, variant, value, onChange }: BasicTextFieldsProps) {
  return (
    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <TextField id="outlined-basic" label={label} variant={variant} value={value} onChange={onChange} />
    </Box>
  );
}