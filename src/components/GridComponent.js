import React from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export class GridComponent extends React.Component {
  state = {
    openDialog: false,
    selectedSlot: null,
    slots: Array(6).fill(null)
  };

  handleClickOpen = (i) => {
    this.setState({
      openDialog: true,
      selectedSlot: i
    });
  };

  handleClose = () => {
    this.setState({
      openDialog: false
    });
  };

  handleItemSelect = (item) => {
    const newSlots = [...this.state.slots];
    newSlots[this.state.selectedSlot] = item;
    this.setState({
      slots: newSlots,
      openDialog: false
    });

    this.props.onItemSelect(item, this.state.selectedSlot); // modified line
  };

  handleItemRemove = (i) => {
    const item = this.state.slots[i];
    const newSlots = [...this.state.slots];
    newSlots[i] = null;
    this.setState({
      slots: newSlots
    });

    if (item) {
      this.props.onItemRemove(item, i); // modified line
    }
  };

  render() {
    const { items } = this.props;
    const { slots } = this.state;

    return (
      <div>
        <Grid container spacing={1} direction="row">
          {slots.map((slot, i) => (
            <Grid key={i} item xs={4}>
              <Button variant="outlined" onClick={() => this.handleClickOpen(i)}>
                {slot ? (
                  <>
                    {slot.name}
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.handleItemRemove(i);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </>
                ) : `Slot ${i + 1}`}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Dialog open={this.state.openDialog} onClose={this.handleClose}>
          <DialogTitle>Select an Item</DialogTitle>
          <DialogContent>
            {items.map((item, i) => (
              <Typography key={i} onClick={() => this.handleItemSelect(item)}>
                {item.name}
              </Typography>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
