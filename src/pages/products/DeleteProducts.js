import React, { useState, useEffect } from 'react';
import {  useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '40%',
    maxHeight: '40%',
  });
  
const DeleteProducts= (props) => {
    const { id } = useParams();
    const [prod, setProd] = useState();


  

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`).then(result => {
            setProd(result.data);
        })
    }, [id]);

    const handleRemovePost = () => {
        axios.delete(`https://fakestoreapi.com/products/${id}`).then(result => {

       
           console.log(result.data)
            props.history.push("/products");
            
        }).catch((err) => {
            
            alert('error when  deleting the  product data')
          })
    }


    const handleCancelPost = () => {
          props.history.push("/products");
    
    }


    return (

      


 <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom>
  
    
      </Typography>

      <Grid container spacing={2}>
       
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>

            <Typography gutterBottom variant="subtitle1" component="div">
            <Img alt="complex" src={prod?.image} />
              
               </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
            
              Product id :{prod?.id} 
              </Typography>
           
           
              <Typography gutterBottom variant="subtitle1" component="div">
                Product Title:{prod?.title} 
            
              </Typography>
           
               
              <Typography gutterBottom variant="subtitle1" component="div">
              
             Product Price: {prod?.price} 
              </Typography>



              <Typography gutterBottom variant="subtitle1" component="div">
              
              Product Category: {prod?.category} 
               </Typography>



              <Typography gutterBottom variant="subtitle1" component="div">
              
              Product Description: {prod?.description} 
               </Typography>

              <Typography gutterBottom variant="subtitle1" component="div">


              <Button   variant="outlined"  onClick={handleCancelPost} startIcon={<ArrowBackIcon />}>
             Cancel
             </Button>
             
             
              <Button variant="outlined" style={{marginLeft:'50px'}} onClick={handleRemovePost}  startIcon={<DeleteIcon />}>
             Delete
             </Button>
               
              </Typography>
            </Grid>
           
          </Grid>
        
        </Grid>
      </Grid>
    </Paper>
    );
}

export default DeleteProducts;
