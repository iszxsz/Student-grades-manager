import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const SuccessAlert = (message) => {
  return (
    <Alert severity="success">{message}</Alert>
  );
}