import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CssBaseline, Typography } from "@mui/material"
import axios from 'axios';




export default function Categories() {
  const [prod, setProds] = useState([]);
  const baseUrl = 'https://fakestoreapi.com/products/categories'
 useEffect(() => {
        axios.get(baseUrl).then(response => {
            setProds(response.data);
            console.log(response.data);
           
           
        })
    }, []);
  return (
    <>
     <CssBaseline />
            <Typography variant="h2" component="h1" gutterBottom>
                Users list 
            </Typography>
    <TableContainer component={Paper}>
    
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
          
  
          
          </TableRow>
        </TableHead>
        <TableBody>
          {prod.map((row,id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row} 
              </TableCell>

              <TableCell component="th" scope="row">
                {row} 
              </TableCell>
         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
