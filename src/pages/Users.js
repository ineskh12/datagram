import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { CssBaseline, Typography } from "@mui/material"
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Users() {


  const baseUrl = 'https://fakestoreapi.com/users'
  
  const [users, setUsers] = useState([]);
  const [FiltredUsers, setFiltredUsers] = useState([]);

  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get(baseUrl).then(result => {
      setUsers(result.data);
      setFiltredUsers(result.data)
      // console.log('test',result.data);


    })
  }, []);




  const requestSort = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
      FiltredUsers.sort((a, b) => (a.name.firstname > b.name.firstname) ? 1 : -1);
    } else {
      setSortOrder('asc');
      FiltredUsers.sort((a, b) => (b.name.firstname > a.name.firstname) ? 1 : -1);
    }
  };



  const requestSort2 = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
      FiltredUsers.sort((a, b) => (a.name.email > b.name.email) ? 1 : -1);
    } else {
      setSortOrder('asc');
      FiltredUsers.sort((a, b) => (b.name.email > a.name.email) ? 1 : -1);
    }
  };



  const requestSearch = (e) => {
    if (e.target.value !== '') {
      var result = users.filter((element) => {
        return element.name.firstname.toLowerCase().includes(e.target.value.toString().toLowerCase())
          || element.name.lastname.toLowerCase().includes(e.target.value.toString().toLowerCase())
      })
      console.log(result);
      setFiltredUsers(result);
    } else {
      setFiltredUsers(users)
    }



 
  }


  return (
    <>
      <CssBaseline />
      <Typography variant="h2" component="h1" gutterBottom>
        Users list
      </Typography>
     

      <Search>
       
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={requestSearch}
        />
      </Search>
      <TableContainer component={Paper} style={{ marginTop: 25 }}>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="right">Id</TableCell>
              <TableCell  >
                <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={() => requestSort()}
                >
                  Full Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
              <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={() => requestSort2()}
                >
                Email
                </TableSortLabel>
                </TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Action</TableCell>
             

            </TableRow>
          </TableHead>
          <TableBody>
            {FiltredUsers.map((row, id) => (
              
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">
                
                
                {row.id}
                
                
                
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name.firstname}  {row.name.lastname}
                </TableCell>
                <TableCell align="right">
                
                
                {row.email}
                
                
                
                </TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.address.city} {row.address.city} {row.address.street} {row.address.number}   </TableCell>
                <TableCell align="right">   
                 {/* <Link to={{
                      pathname: '/MoreUser',
                      state: row
                    }} >
                                
                        
                    </Link> */}
                  
                    
                    <Link to={`/MoreUser/${row.id}`} className="btn btn-success">
                    <MoreHorizIcon/>
            </Link>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
