import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import axios from 'axios';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  const { id } = useParams();
    const [prod, setProds] = useState();
   

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then(result => {
         console.log('hi ines',result.data)
         setProds(result.data);
       
     
     
      
 
    })
}, [id]);
  
    
  
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
  product id :{prod?.id}
   
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={prod?.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              {prod?.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
              {prod?.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {prod?.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <Rating
        name="simple-controlled"
        value={Number(prod?.rating.rate)}
        /> 
         {prod?.rating.count} 
             
       
           
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
           
            {prod?.price}$
            </Typography>
          </Grid>
        </Grid>
      </Grid> 
    </Paper>
  );
}

