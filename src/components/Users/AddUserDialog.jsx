import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addUserApi, updateUserApi } from "../../api/UserApi";
import { usersError } from "../../store/slices/UserSlice";
export default function AddUserDialog({ open, onClose, user,limit,page }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      // If user prop is provided, populate the form fields with user data for editing
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    } else {
      resetForm();
    }
  }, [user]);

  const handleClose = () => {
    onClose();
    resetForm();
    dispatch(usersError(null));
  };

  const handleAddUser = () => {
    const userData = {
      name,
      email,
      phone,
      password
    };

    if (user?._id) {
      // If user prop is provided, update the existing user
      dispatch(updateUserApi(user._id, userData, handleClose,limit,page));
    } else {
      // If user prop is not provided, add a new user
      dispatch(addUserApi(userData, handleClose,limit,page));
    }
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Dialog       sx={{ '& .MuiDialog-paper': { width: '80%' } }}
    maxWidth="xs"
open={open} onClose={handleClose}>
      <DialogTitle>{user?._id ? "Edit User" : "Add User"}</DialogTitle>

      <DialogContent>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ my: 1 }}
          label="Name"
          fullWidth
          error={!!error?.name}
          helperText={error?.name || ""}
        />
          {!user?._id && (<>

        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ my: 1 }}
          label="Email"
          fullWidth
          error={!!error?.email}
          helperText={error?.email || ""}
        />
       
        <TextField
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ my: 1 }}
          label="Phone"
          fullWidth
          error={!!error?.phone}
          helperText={error?.phone || ""}
        />
       
        <TextField
        
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ my: 1 }}
          label="Password"
          fullWidth
          type={showPassword ? "text" : "password"}
          error={!!error?.password}
          helperText={error?.password || ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        /> 
        </>)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained"  color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddUser} variant="contained" color="primary">
          {user?._id ? "Update User" : "Add User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
