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
import moment from 'moment';
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import InputBase from '@mui/material/InputBase';

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

export default function Carts() {


  const baseUrl = 'https://fakestoreapi.com/carts'
  const [users, setUsers] = useState([]);
  const [FiltredUsers, setFiltredUsers] = useState([]);
 
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get(baseUrl).then(result => {
      setUsers(result.data);
      setFiltredUsers(result.data)
    

    })
  }, []);




  const requestSort = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
      FiltredUsers.sort((a, b) => (a.date > b.date) ? 1 : -1);
    } else {
      setSortOrder('asc');
      FiltredUsers.sort((a, b) => (b.date > a.date) ? 1 : -1);
    }
  };



  const requestSort2 = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
      FiltredUsers.sort((a, b) => (a.products.length > b.products.length) ? 1 : -1);
    } else {
      setSortOrder('asc');
      FiltredUsers.sort((a, b) => (b.products.length > a.products.length) ? 1 : -1);
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
      List of Carts 
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
              <TableCell  >
                <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={() => requestSort()}
                >
                Date
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
              <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={() => requestSort2()}
                >
                Count
                </TableSortLabel>
                </TableCell>
              <TableCell align="right">Action</TableCell>
            


            </TableRow>
          </TableHead>
          <TableBody>
            {FiltredUsers.map((row, id) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                { moment(row.date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">
                
                
                { row.products.length}
                
                
                
                </TableCell>
                <TableCell align="right">    <Link to={{
                      pathname: '/Morecart',
                      state: row
                    }} >
                                
                  <MoreHorizIcon/>      
                    </Link></TableCell>
            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
