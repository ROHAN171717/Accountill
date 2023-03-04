import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useRedirectLoggedOutUser from '../../customeHook/useRedirectLoggedOutUser';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';


import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 100 },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'paymentMethod',
      label: 'Payment Method',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'note',
      label: 'Note',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),

    },
  ];
  
  function createData(name, date, amount, paymentMethod, note) {
    return { name, date, amount, paymentMethod, note };
  }

// const columns = [
//     { id: 'name', label: 'Name', minWidth: 170 },
//     { id: 'category', label: 'Category', minWidth: 100 },
//     {
//       id: 'price',
//       label: 'Price',
//       minWidth: 170,
//       align: 'left',
//       format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//       id: 'quantity',
//       label: 'Quantity',
//       minWidth: 170,
//       align: 'left',
//       format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//       id: 'value',
//       label: 'Value',
//       minWidth: 170,
//       align: 'left',
//       format: (value) => value.toFixed(2),
//     },
//     {
//       id: 'action',
//       label: 'Action',
//       minWidth: 170,
//       align: 'left',
//       format: (value) => value.toFixed(2),
//     },
//   ];


//   function createData(name, category, price, quantity) {
//     const value = quantity * price;
//     return { name, category, price, quantity, value };
//   }

//   let data=[];
//   data.push()
  
  const rows = [
    createData('India the great', 'IN', 1324171354, 3287263, "hello", "hello"),
    createData('China', 'CN', 1403500365, 9596961, "hello"),
    createData('Italy', 'IT', 60483973, 301340, "hello"),
    createData('United States', 'US', 327167434, 9833520, "hello"),
    createData('Canada', 'CA', 37602103, 9984670, "hello"),
    createData('Australia', 'AU', 25475400, 7692024, "hello"),
    createData('Germany', 'DE', 83019200, 357578, "hello"),
    createData('Ireland', 'IE', 4857000, 70273, "hello"),
    createData('Mexico', 'MX', 126577691, 1972550, "hello"),
    createData('Japan', 'JP', 126317000, 377973, "hello"),
    createData('France', 'FR', 67022000, 640679, "hello"),
    createData('United Kingdom', 'GB', 67545757, 242495, "hello"),
    createData('Russia', 'RU', 146793744, 17098246, "hello"),
    createData('Nigeria', 'NG', 200962417, 923768, "hello"),
    createData('Brazil', 'BR', 210147125, 8515767, "hello"),
  ];



const Dashboard = () => {

  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();


    // data=products;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };


    var data = [
        {
            bgColor:"rgb(105, 142, 236)",
            key:"Payment Received",
            value: 1494.8,
            icon: <TaskAltIcon style={{fontSize:"30px", color:"blue"}}/>

        },
        {
            bgColor:"white",
            key:"Pending Amount",
            value: 10,
            icon: <AccountBalanceWalletIcon style={{fontSize:"30px", color:"green"}}/>

        },
        {
            bgColor:"white",
            key:"Total Amount",
            value: 1504.8,
            icon: <AccountBalanceIcon style={{fontSize:"30px", color:"rgb(105, 142, 236)"}}/>

        },
        {
            bgColor:"white",
            key:"Total Invoices",
            value: 2,
            icon: <PaymentIcon style={{fontSize:"30px", color:"green"}}/>

        },
        {
            bgColor:"rgb(121, 220, 121)",
            key:"Paid Invoices",
            value: 1,
            icon: <TaskAltIcon style={{fontSize:"30px", color:"green"}}/>


        },
        {
            bgColor:"white",
            key:"Partially Paid Invoices",
            value: 1,
            icon: <DescriptionIcon style={{fontSize:"30px", color:"green"}}/>

        },
        {
            bgColor:"white",
            key:"Unpaid Invoices",
            value: 0,
            icon: <SentimentVeryDissatisfiedIcon style={{fontSize:"30px", color:"red"}}/>

        },
        {
            bgColor:"white",
            key:"Overdue",
            value: 2,
            icon: <AccessTimeIcon style={{fontSize:"30px", color:"red"}}/>

        },
    ]

  return (
    <div className='ml-16 pb-4 bg-gray-200' style={{minHeight: "92.7vh"}}>
      <div className='mx-6'>
      <div class="grid grid-cols-5 gap-2 p-2">
        
            {data.map((x) => (
                <div className='flex p-6 items-center justify-between rounded-xl' style={{backgroundColor:x.bgColor}}>
                <div>
                    <h1 className='text-3xl' style={{color: x.bgColor === 'white' ? "black" : "white"}}>{x.value}</h1>
                    <p className='text-md' style={{color: x.bgColor === 'white' ? "gray" : "white"}}>{x.key}</p>
                </div>
                <div>
                    {x.icon}
                </div>
            </div>
            ))}

        </div>
        <h1 className='text-center my-4 text-2xl font-medium'>Recent Payments</h1>

        <div>
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
                  {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{color:"black", fontWeight:"bold"}}
            />
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
