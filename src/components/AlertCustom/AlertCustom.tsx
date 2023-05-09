import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface IAlertCustom {
  handleClose: () => void;
  open: boolean;
  message: string;
}

export const AlertCustom = (props: IAlertCustom) => {
  const { handleClose, open, message } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={{ position: 'absolute', width: '100%' }}>
      <Alert
        severity='warning'
        onClose={handleClose}
        sx={{ position: 'absolute', top: 25, left: -25 }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
