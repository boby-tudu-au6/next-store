import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

export default function SimpleSnackbar(props) {
  const { title, severity, open, onClose } = props;

  return (
    <div>
      <Snackbar
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }} open={open} autoHideDuration={2000}>
        <Alert variant="filled" severity={severity}>
          { title }
        </Alert>
      </Snackbar>
        {/* <Alert elevation={6} variant="filled" severity="error">hello</Alert> */}
    </div>
  );
}
