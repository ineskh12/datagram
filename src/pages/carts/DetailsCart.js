import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

export default function DetailsCart() {
  const [usr, setUser] = useState("")
  let location = useLocation();
 
  

  useEffect(() => {

    axios.get(`https://fakestoreapi.com/users/${location.state.userId}`).then(response => {
      setUser(response.data.name);
      
        //console.log(response.data.name);
       
       
    })
  
   }
  
   , [location.state.userId]);





    
  
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom>
      Detail cart by user id 
      </Typography>

      <Grid container spacing={2}>
       
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              {usr.firstname}   {usr.lastname}
            
              </Typography>
              <Typography variant="body2" gutterBottom>
              { moment(location.state.date).format("DD/MM/YYYY")}
            
              </Typography>
             
              <Typography variant="body2" gutterBottom>
              Total of products: { location.state.products.length}
            
              </Typography>
          
               
             
            </Grid>
         
          </Grid>
        
        </Grid>
      </Grid>
    </Paper>
  );
}
