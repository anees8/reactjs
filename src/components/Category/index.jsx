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
  TextField
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategoriesApi, deleteCategoryApi } from "../../api/CategoryApi";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";

import AddIcon from "@mui/icons-material/Add";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import AddCategoryDialog from "./AddCategoryDialog";
import { BASE_URL } from "../../config/constant/apiConstant";
import { setOrderBy } from "../../store/slices/CategorySlice";

const Category  = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const limit = useSelector((state) => state.categories.limit);
  const page = useSelector((state) => state.categories.page);
  const totalRow = useSelector((state) => state.categories.totalRow);
  const orderBy = useSelector((state) => state.categories.orderBy);


  const handleSort = (column) => {
    if (orderBy === column) {
      dispatch(setOrderBy(`-${column}`));
      dispatch(fetchAllCategoriesApi(limit, page + 1, `-${column}`));
    } else if (orderBy === `-${column}`) {
      dispatch(setOrderBy(null));
      dispatch(fetchAllCategoriesApi(limit, page + 1));
    } else {
      dispatch(setOrderBy(column));
      dispatch(fetchAllCategoriesApi(limit, page + 1, column));
    }
  };

  const handleSearchChange = (event) => {
    dispatch(fetchAllCategoriesApi(limit,1, orderBy,event.target.value));
  };

  const handleChangePage = (event, newPage) => {
    dispatch(fetchAllCategoriesApi(limit, newPage + 1, orderBy));
  };

  const handleChangeLimit = (event) => {
    dispatch(fetchAllCategoriesApi(event.target.value, 0, orderBy));
  };

  const openAddCategoryDialog = (category) => {
    setEditCategory(category);
    setAddCategoryDialogOpen(true);
  };

  const closeAddCategoryDialog = () => {
    setEditCategory(null);
    setAddCategoryDialogOpen(false);
  };

  const deleteSingleCategory = (id) => {
    dispatch(
      deleteCategoryApi(
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
    dispatch(fetchAllCategoriesApi(limit, page + 1, orderBy));
  }, [dispatch]);

  return (
    <>
     
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
           
          }}
        >
          <div><TextField
            type="search"
            sx={{ my: 1 }}
            label="Search"
            fullWidth
            size="small"
            onChange={handleSearchChange}
          /></div> {/* Empty div for spacing */}
          <Button
            variant="outlined"
            color="primary"
            onClick={openAddCategoryDialog}
          >
            <AddIcon /> Category
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
                <TableCell onClick={() => handleSort("name")}>
                  Category Name{" "}
                  {orderBy === "name" ? (
                    <ArrowDropDownIcon />
                  ) : orderBy === "-name" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <UnfoldMoreOutlinedIcon style={{ opacity: 0.5 }} />
                  )}
                </TableCell>
                <TableCell onClick={() => handleSort("description")}>
                  Description{" "}
                  {orderBy === "description" ? (
                    <ArrowDropDownIcon />
                  ) : orderBy === "-description" ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <UnfoldMoreOutlinedIcon style={{ opacity: 0.5 }} />
                  )}
                </TableCell>
                
                <TableCell>Image</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No records found.</TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category._id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      {" "}
                      {category.images.map((image, index) => (
                        <img
                          // crossOrigin="anonymous"
                          key={index}
                          src={BASE_URL + image}
                          width={50}
                          alt="Category Image"
                        />
                      ))}
                    </TableCell>
                    <TableCell>{category.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ margin: "2px" }}
                        onClick={() => openAddCategoryDialog(category)}
                      >
                        {" "}
                        <EditOutlinedIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ margin: "2px" }}
                        onClick={() => openDeleteConfirmation(category._id)}
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
          <AddCategoryDialog
            open={addCategoryDialogOpen}
            onClose={closeAddCategoryDialog}
            category={editCategory}
            limit={limit}
            page={page + 1}
          />
          <DeleteCategoryDialog
            open={!!deleteConfirmation}
            onClose={closeDeleteConfirmation}
            onDelete={() => deleteSingleCategory(deleteConfirmation)}
          />
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100, { value: -1, label: "All" }]}
          component="div"
          count={totalRow}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeLimit}
          showFirstButton={true}
          showLastButton={true}
        />
      
    </>
  );
};

export default Category;
