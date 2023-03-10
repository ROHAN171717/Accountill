import React, { useEffect, useState } from 'react';
import useRedirectLoggedOutUser from '../../customeHook/useRedirectLoggedOutUser';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { delete_Client, get_Client_by_User, selectIsLoading, update_Client } from '../../redux/features/client/client';
import Spinner from '../Spinner/Spinner';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


const columns = [
    { id: 'number', label: 'Number'},
    { id: 'name', label: 'Name'},
    {
      id: 'email',
      label: 'Email',
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'phone',
      label: 'Phone',
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'edit',
      label: 'Edit',
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),

    },
    {
      id: 'delete',
      label: 'Delete',
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),

    },
  ];
  

const Clients = () => {

    useRedirectLoggedOutUser("/login");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [openn, setOpenn] = React.useState(false);

    const handleClickOpen = () => {
      setOpenn(true);
    };

    const handleClickClose = () => {
      setOpenn(false);
    };

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('Profile'));
    const clients = useSelector((state) => state.client.clients);
    const isLoading = useSelector(selectIsLoading);
    const [clientData, setClientData] = useState({ name: '', email: '', phone: '', address: '', userId: ''})

    useEffect(() => {
      dispatch(get_Client_by_User({ search: user?.result?._id}));
    },[location,dispatch])

    const editClient = () => {
        console.log("edit...")
        dispatch(update_Client({ id:clientData._id, formData:clientData }))
        dispatch(get_Client_by_User({ search: user?.result?._id }))
    }

    const deleteClient = (id) => {
      dispatch(delete_Client(id));
      dispatch(get_Client_by_User({ search: user?.result?._id }))
    }

    if(!user){
      navigate('/login');
    }

    if(isLoading) {
      return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
          <Spinner />
      </div>
    }

    if(clients.length === 0) {
      return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
      <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>No customers yet. Click the plus icon to add customer</p>
      </div>
    }

  return (
    <div className='ml-16 pb-4 bg-gray-200' style={{minHeight: "92.7vh"}}>
      <div className='mx-6'>
        <div className='pt-20 px-20'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor: 'white', fontSize:"large", fontWeight:"bold", color: "rgb(67, 65, 65)", }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((client, index) => {
                return (
                  <TableRow tabIndex={-1} key={client._id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell onClick={() =>{
                      setClientData(client)
                      handleClickOpen()
                    }} style={{cursor:"pointer"}}>
                        <ModeEditIcon/>
                    </TableCell>
                    <TableCell onClick={() => deleteClient(client._id)}>
                        <DeleteIcon/>
                    </TableCell>
                  </TableRow>
                );
              })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10, 25, 100]}
              component="div"
              count={clients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{color:"black", fontWeight:"bold"}}
            />
          </Paper>
        </div>
        <Dialog
        open={openn}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{backgroundColor:"#1976D2", color:"white"}}>
          {"New Customer"}
        </DialogTitle>
        <DialogContent sx={{marginTop:"10px"}}>
          <TextField
          label="Name"
          type="text"
          variant="filled"
          sx={{width:"100%"}}
          value={clientData.name}
          onChange={(e) => setClientData({...clientData, name: e.target.value})} 
        />
          <TextField
          label="Email"
          type="text"
          variant="filled"
          sx={{width:"100%"}}
          value={clientData.email}
          onChange={(e) => setClientData({...clientData, email: e.target.value})} 
        />
          <TextField
          label="Phone"
          type="text"
          variant="filled"
          sx={{width:"100%"}}
          value={clientData.phone}
          onChange={(e) => setClientData({...clientData, phone: e.target.value})} 
        />
          <TextField
          label="Address"
          type="text"
          variant="filled"
          sx={{width:"100%"}}
          value={clientData.address}
          onChange={(e) => setClientData({...clientData, address: e.target.value})} 
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} style={{backgroundColor: "#1976D2", color: "white"}}>Close</Button>
          <Button onClick={() => {
            editClient()
            handleClickClose()
          }} autoFocus style={{backgroundColor:"#1976D2", color:"white"}}>
            Save Customer
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}

export default Clients;
