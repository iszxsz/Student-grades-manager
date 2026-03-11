import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { TextFieldVariants } from '@mui/material/TextField';

interface BasicTextFieldsProps {
  label?: string;
  variant: TextFieldVariants;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  type?: string;
  error?: boolean;
  helperText?: string;
  min?: number;
  max?: number;
}

export default function BasicTextFields({ label, variant, value, onChange, fullWidth = false, type, error = false, helperText, min, max }: BasicTextFieldsProps) {
  return (
    <Box component="form" sx={{ '& > :not(style)': { m: fullWidth ? 0 : 1, width: fullWidth ? '100%' : '25ch' }, width: fullWidth ? '100%' : 'auto' }} noValidate autoComplete="off">
      <TextField 
        id="outlined-basic" 
        label={label} 
        variant={variant} 
        value={value} 
        onChange={onChange} 
        type={type} 
        fullWidth={fullWidth}
        error={error}
        helperText={helperText}
        inputProps={{
          min: min,
          max: max,
        }}
      />
    </Box>
  );
}