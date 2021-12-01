import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {

  


    let location = useLocation();

    
  
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
   
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={location.state.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              {location.state.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
              {location.state.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {location.state.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              <Rating
        name="simple-controlled"
        value={location.state.rating.rate} /> {location.state.rating.count}
             
             
           
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
           
            {location.state.price}$
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
