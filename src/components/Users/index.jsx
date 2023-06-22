import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,TablePagination, Container
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsersApi, deleteUser } from "../../api/UserApi";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteUserDialog from "./DeleteUserDialog";
import AddUserDialog from "./AddUserDialog";

export default function Users() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const limit = useSelector((state) => state.users.limit);
  const page = useSelector((state) => state.users.page);
  const totalRow = useSelector((state) => state.users.totalRow);
  
  const handleChangePage = (event, newPage) => {

    dispatch(fetchAllUsersApi(limit,newPage+1));
  };

  const handleChangeLimit = (event) => {
  
    dispatch(fetchAllUsersApi(event.target.value,0));

  };

  const openAddUserDialog = (user) => {
    setEditUser(user);
    setAddUserDialogOpen(true);
  };

  const closeAddUserDialog = () => {
    setEditUser(null);
    setAddUserDialogOpen(false);
  };

  const deleteSingleUser = (id) => {
   
    dispatch(deleteUser(id,limit,(Math.round(totalRow / ((page + 1) * limit))==page)?page+1:page));
    setDeleteConfirmation(null);
  };

  const openDeleteConfirmation = (id) => {
    setDeleteConfirmation(id);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

 
  

  useEffect(() => {
   
    dispatch(fetchAllUsersApi(limit,page));
  }, [dispatch]);

  return (<>
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
     
      onClick={openAddUserDialog}
    >
      <AddIcon/> User
    </Button>
  </div>

    <TableContainer sx={{maxHeight:'calc(100vh - 250px)', width: '100%',overflow: 'auto',
        scrollbarWidth: 'auto',
        scrollbarColor: '#888888 #ffffff', // Adjust colors as needed
        '&::-webkit-scrollbar': {
          width: '2px' // Adjust the width as needed
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888888' // Adjust color as needed
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#ffffff' // Adjust color as needed
        }
 }} component={Paper}> 
      <Table size="small">
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
              <Button variant="outlined" color="secondary" sx={{marginLeft:"1rem" }}  onClick={() => openAddUserDialog(user)} > <EditOutlinedIcon  /></Button>
              <Button variant="outlined" color="error" sx={{marginLeft:"1rem" }}  onClick={() => openDeleteConfirmation(user._id)}> <DeleteOutlineOutlinedIcon /></Button>
               
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddUserDialog
        open={addUserDialogOpen}
        onClose={closeAddUserDialog}
        user={editUser}
        limit={limit}
        page={page+1}
      />
      <DeleteUserDialog
        open={!!deleteConfirmation}
        onClose={closeDeleteConfirmation}
        onDelete={() => deleteSingleUser(deleteConfirmation)}
        
      />
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
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
  );
}
