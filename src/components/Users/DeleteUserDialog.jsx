import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";

export default function DeleteUserDialog({ open, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this user?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
