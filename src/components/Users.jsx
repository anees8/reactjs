import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsersApi, deleteUser } from "../api/UserApi";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteUserDialog from "./Users/DeleteUserDialog";
import AddUserDialog from "./Users/AddUserDialog";

export default function Users() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const openAddUserDialog = (user) => {
    setEditUser(user);
    setAddUserDialogOpen(true);
  };

  const closeAddUserDialog = () => {
    setEditUser(null);
    setAddUserDialogOpen(false);
  };

  const deleteSingleUser = (id) => {
    dispatch(deleteUser(id));
    setDeleteConfirmation(null);
  };

  const openDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  useEffect(() => {
    dispatch(fetchAllUsersApi());
  }, [dispatch]);

  return (<>
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
      variant="contained"
      color="primary"
     
      onClick={openAddUserDialog}
    >
      Add User
    </Button>
  </div>
    <TableContainer sx={{  width: '100%' }} component={Paper}>
   

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  onClick={() => openAddUserDialog(user)}
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => openDeleteConfirmation(user._id)}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddUserDialog
        open={addUserDialogOpen}
        onClose={closeAddUserDialog}
        user={editUser}
      />
      <DeleteUserDialog
        open={!!deleteConfirmation}
        onClose={closeDeleteConfirmation}
        onDelete={() => deleteSingleUser(deleteConfirmation)}
      />
    </TableContainer>
    </>
  );
}
