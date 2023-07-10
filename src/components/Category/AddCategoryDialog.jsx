import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,Switch,FormControlLabel
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { addCategoryApi, updateCategoryApi } from "../../api/CategoryApi";
import { categoryError } from "../../store/slices/CategorySlice";

export default function AddProductDialog({
  open,
  onClose,
  category,
  limit,
  page
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [images, setSelectedImage] = useState("");

  const handleFileChange = (event) => {
    const files = event.target.files[0];
    setSelectedImage(files);
  };

  const error = useSelector((state) => state.categories.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category?._id) {
      // If user prop is provided, populate the form fields with user data for editing
      setName(category.name);
      setDescription(category.description);
      setStatus(category.status);
    } else {
      resetForm();
    }
  }, [category]);

  const handleClose = () => {
    onClose();
    resetForm();
    dispatch(categoryError(null));
  };

  const handleAddCategory = () => {
    const categoryData = {
      name,
      description,
      status,
      images
    };

    if (category?._id) {
      // If user prop is provided, update the existing user
      dispatch(
        updateCategoryApi(category._id, categoryData, handleClose,limit, page)
      );
    } else {
      // If user prop is not provided, add a new user
      dispatch(addCategoryApi(categoryData, handleClose,limit, page));
    }
  };
  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus(true);
    setSelectedImage("");
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {category?._id ? "Edit Category" : "Add Category"}
      </DialogTitle>

      <DialogContent>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ my: 1 }}
          label="Category Name"
          fullWidth
          error={!!error?.name}
          helperText={error?.name || ""}
        />

        <TextField
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ my: 1 }}
          label="Category Description"
          multiline
          rows={4}
          error={!!error?.description}
          helperText={error?.description || ""}
        />

        <TextField
          id="outlined-basic"
          label="Images"
          variant="outlined"
          type="file"
          sx={{ my: 1 }}
          fullWidth
          inputProps={{
            accept: "image/png, image/jpeg"
          }}
          onChange={handleFileChange}
          error={!!error?.images}
          helperText={error?.images || ""}
        />
        <div>
          {images.name && (
            <img
              src={URL.createObjectURL(images)}
              alt={`Preview ${images.name}`}
              width="80"
              height="auto"
            />
          )}
        </div>
  
        <FormControlLabel control={<Switch
    
      checked={status}
      onChange={(event) => setStatus(event.target.checked)}
      inputProps={{ 'aria-label': 'controlled' }}
      />}
      label="Status" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddCategory} variant="contained" color="primary">
          {category?._id ? "Update Category" : "Add Category"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
