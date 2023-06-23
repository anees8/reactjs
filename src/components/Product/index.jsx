import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Container
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsApi,deleteProduct } from "../../api/ProductApi";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteProductDialog from "./DeleteProductDialog";
import AddProductDialog from "./AddProductDialog";
import { BASE_URL } from "../../config/constant/apiConstant";

const Product = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const limit = useSelector((state) => state.products.limit);
  const page = useSelector((state) => state.products.page);
  const totalRow = useSelector((state) => state.products.totalRow);
  const handleChangePage = (event, newPage) => {
    dispatch(fetchAllProductsApi(limit, newPage + 1));
  };

  const handleChangeLimit = (event) => {
    dispatch(fetchAllProductsApi(event.target.value, 0));
  };

  const openAddProductDialog = (product) => {
    setEditProduct(product);
    setAddProductDialogOpen(true);
  };

  const closeAddProductDialog = () => {
    setEditProduct(null);
    setAddProductDialogOpen(false);
  };

  const deleteSingleProduct = (id) => {
    dispatch(
      deleteProduct(
        id,
        limit,
        Math.round(totalRow / ((page + 1) * limit)) == page ? page + 1 : page
      )
    );
    setDeleteConfirmation(null);
  };

  const openDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };
  useEffect(() => {
    dispatch(fetchAllProductsApi(limit, page+1));
  }, [dispatch]);

  return (
    <>
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          marginBottom: "10px"
        }}
      >
        <div></div> {/* Empty div for spacing */}
        <Button
          variant="outlined"
          color="primary"
          onClick={openAddProductDialog}
        >
          <AddIcon /> Product
        </Button>
      </div>

      <TableContainer
       sx={{
        maxHeight: "calc(100vh - 250px)",
        width: "100%",
        overflow: "auto",
        scrollbarWidth: "auto",
        scrollbarColor: "#888888 #ffffff", // Adjust colors as needed
        "&::-webkit-scrollbar": {
          width: "2px", // Adjust the width as needed
          height: "2px" 
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888888" // Adjust color as needed
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ffffff" // Adjust color as needed
        }
      }}
        component={Paper}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {products.length === 0 ? (
  <TableRow>
    <TableCell colSpan={5}>No records found.</TableCell>
  </TableRow>
) : (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
              <TableCell> {product.images.map((image,index) => (
              <img crossOrigin="anonymous" key={index} src={BASE_URL+image} width={50} alt="Product Image" />
              ))}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ margin: "2px" }}
                    onClick={() => openAddProductDialog(product)}
                  >
                    {" "}
                    <EditOutlinedIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ margin: "2px" }}
                    onClick={() => openDeleteConfirmation(product._id)}
                  >
                    {" "}
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
              ))
              )}
              
          </TableBody>
        </Table>
        <AddProductDialog
          open={addProductDialogOpen}
          onClose={closeAddProductDialog}
          product={editProduct}
          limit={limit}
          page={page + 1}
        />
        <DeleteProductDialog
          open={!!deleteConfirmation}
          onClose={closeDeleteConfirmation}
          onDelete={() => deleteSingleProduct(deleteConfirmation)}
          
        />
      </TableContainer>
      <TablePagination
      rowsPerPageOptions={[5, 10, 25, 100 , { value: -1, label: 'All' }]}
        component="div"
        count={totalRow}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeLimit}
        showFirstButton={true}
        showLastButton={true}
      />
    </Container>
  </>
  )
}

export default Product