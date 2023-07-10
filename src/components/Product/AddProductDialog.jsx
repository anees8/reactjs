import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { addProductApi, updateProductApi } from "../../api/ProductApi";
import { productError } from "../../store/slices/ProductSlice";

export default function AddProductDialog({ open, onClose, product,limit,page }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  

  const [images, setSelectedImage] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImage(files);
  };

 

  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();





  useEffect(() => {
    if (product?._id) {
      // If user prop is provided, populate the form fields with user data for editing
      setName(product.name);
      setDescription(product.description)
      setPrice(product.price);
      
    } else {
      resetForm();
    }
  }, [product]);

  const handleClose = () => {
    onClose();
    resetForm();
    dispatch(productError(null));
  };

  const handleAddProduct = () => {
    const productData = {
      name,
      description,
      price,   
      images  
    };

    if (product?._id) {
      // If user prop is provided, update the existing user
      dispatch(updateProductApi(product._id, productData, handleClose,limit,page));
    } else {
      // If user prop is not provided, add a new user
      dispatch(addProductApi(productData, handleClose,limit,page));
    }
  };
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setSelectedImage([]);

   
  };



  return (
    <Dialog       sx={{ '& .MuiDialog-paper': { width: '80%' } }}
    maxWidth="xs"
open={open} onClose={handleClose}>
      <DialogTitle>{product?._id ? "Edit Product" : "Add Product"}</DialogTitle>

      <DialogContent>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ my: 1 }}
          label="Product Name"
          fullWidth
          error={!!error?.name}
          helperText={error?.name || ""}
        />

      <TextField
      fullWidth
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      sx={{ my: 1 }}
      label="Product Description"
      multiline
      rows={4}
      error={!!error?.description}
      helperText={error?.description || ""}
      />

<TextField
      select
      label="Category"
      fullWidth  
    >
      <MenuItem value="option1">Option 1</MenuItem>
      <MenuItem value="option2">Option 2</MenuItem>
      <MenuItem value="option3">Option 3</MenuItem>
    </TextField>
         
      
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ my: 1 }}
          label="Price"
          fullWidth
          error={!!error?.price}
          helperText={error?.price || ""}
        />

          <TextField
          id="outlined-basic"
          label="Images"
          variant="outlined"
          type="file"
          sx={{ my: 1 }}
          fullWidth
          inputProps={{
          multiple: true,
          accept: "image/png, image/jpeg",
          }}  
           onChange={handleFileChange}
          error={!!error?.images}
          helperText={error?.images || ""}
        />
         <div>

          
         {images.map((file, index) => (
       
          <img  key={index} src={URL.createObjectURL(file)} alt={`Preview ${file.name}`} width="80" height="auto"/>
               
       
      ))}
 </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained"  color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddProduct} variant="contained" color="primary">
          {product?._id ? "Update Product" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
