import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

export default function DetailsCart() {
  const [usr, setUser] = useState([])

  
  let location = useLocation();
  //let Varl =[];
  

  useEffect(() => {

    axios.get(`https://fakestoreapi.com/carts/user/${location.state.id}`).then(response => {
      setUser(response.data);
      
        console.log(response.data);
       
       
      })
      }


    , [location.state.id]);
  
  

    

  
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom>
          User where  the Carts linked to it by user id : {location.state.id}
      </Typography>

      <Grid container spacing={2}>
 
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
          {usr.map((row, id) => (
            <Grid item xs   key={id}>

              <Typography gutterBottom variant="subtitle1" component="div">
       
              { moment(row.date).format("DD/MM/YYYY")}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
           
    {row.products.map((row2, id) => (
      <div
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
    Product id : {row2.productId} , Product quantity : {row2.quantity}
  

  
        
   </div>
    ))}

              </Typography>
             
            
               
   
            </Grid>))}
         
          </Grid>
        
        </Grid>
      </Grid>
    </Paper>
  );
}
