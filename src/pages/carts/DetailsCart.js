import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useParams } from "react-router-dom";
export default function DetailsCart() {
  const [cart, setCart] = useState("")
  const [usrid, setUserId] = useState("")
  const [count, setcount] = useState()

  const [us, setUs] = useState("")
  //let location = useLocation();
  const { id } = useParams();
  


   useEffect(() => {
    axios.get(`https://fakestoreapi.com/carts/${id}`).then(result => {
     
         setCart(result.data);
         setUserId(result.data.userId)
         setcount(result.data.products.length)

         console.log(result.data.products.length)
     
     
      
 
    })

    axios.get(`https://fakestoreapi.com/users/${usrid}`).then(result => {
      console.log('hi ines2',result.data)
      setUs(result.data);
     
  })


}, [id,usrid]);



    
  
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
      {/* Detail cart by user id  :{cart?.userId}<br/> */}
      Date :{ moment(cart?.date).format("DD/MM/YYYY")}<br/>
      cart id :{cart?.id}<br/>
      user id :{us?.id}
    
      </Typography>

      <Grid container spacing={2}>
       
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
            {us?.username} 
            
             
              </Typography>
              <Typography variant="body2" gutterBottom>
  
              Total of products: {count}
              </Typography>
             
              <Typography variant="body2" gutterBottom>

              
            
              </Typography>
          
               
             
            </Grid>
         
          </Grid>
        
        </Grid>
      </Grid>
    </Paper>
  );
}
