import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';



const UserDetails = () => {
    const { id } = useParams();
    const [usr, setUsr] = useState();


    useEffect(() => {
        axios.get(`https://fakestoreapi.com/users/${id}`).then(result => {
             console.log('hi ines',result.data)
             setUsr(result.data);
         
         
          
     
        })
    }, [id]);

    return (

      


 <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom>
     user id  : {usr?.id}<br/>

    
      </Typography>

      <Grid container spacing={2}>
       
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              {usr?.name.firstname}  {usr?.name.lastname}
            
              </Typography>
           
           
              <Typography gutterBottom variant="subtitle1" component="div">
              {usr?.email}
            
              </Typography>
           
               
              <Typography gutterBottom variant="subtitle1" component="div">
              {usr?.phone}
            
              </Typography>

              <Typography gutterBottom variant="subtitle1" component="div">
               {usr?.address.city}       {usr?.address.street}  {usr?.address.number} 
               {usr?.address.zipcode}      
            
              </Typography>
            </Grid>
         
          </Grid>
        
        </Grid>
      </Grid>
    </Paper>
    );
}

export default UserDetails;
