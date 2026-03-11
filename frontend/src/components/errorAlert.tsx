import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const ErrorAlert = (message) => {
  return (
    <Alert severity="error">{message}</Alert>
  );
}