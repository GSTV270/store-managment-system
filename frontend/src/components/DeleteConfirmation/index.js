import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import { Container } from './styles';

export default function DeleteConfirmation({
  open,
  toggleDeleteDialog,
  itemType,
  item,
  onDeletion,
}) {
  return (
    <Dialog
      open={open}
      onClose={toggleDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Você tem certeza que deseja excluir esse {itemType}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDeleteDialog} color="primary">
          Cancelar
        </Button>
        <Button onClick={onDeletion} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDeleteDialog: PropTypes.func.isRequired,
  itemType: PropTypes.string.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
};
