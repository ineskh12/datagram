import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';

import Grid from '@mui/material/Grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Card from '@mui/material/Card';
import {  CardContent ,IconButton, MenuItem, TextField, Typography } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Products() {

  const baseUrl='https://fakestoreapi.com/products'
 
  const [prod, setProds] = useState([]);
  const [cat, setCats] = useState([]);
  const [loading, setLoading] = useState(false);

  //const [prodFitred, setProdsFitred] = useState([]);
  useEffect(() => {
    setLoading(true)
    axios.get(baseUrl).then(result => {
      setProds(result.data);
      setLoading(false);

    })
      .catch((err) => {
        setLoading(false)
        alert('error loading product data')
      })

  }, []);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories').then(response => {
      setCats(response.data);
     
       
       
    })
}, []);


const searchFilterFunction = event => {
  //text it contains the selected category
       var text = event.target.value;
       
       console.log(text)

       
   if (text === ""){

    console.log(text)

   
    axios.get((baseUrl)).then(response => {
      setProds(response.data);
      setLoading(false);
        console.log('lol',response.data)
       
       
       
    });


   }
       else{

       console.log(text)
        axios.get((`https://fakestoreapi.com/products/category/${text}`)).then(response => {
          setProds(response.data);
            console.log('ines',response.data);
           
           
        });

       }
      
   
     

};





 
 



  return (
    <div>
  
      <Typography variant="h2" component="h1" gutterBottom>
        Products list
      </Typography>


      <Grid >
   


  
      <TextField
  
    className="form-control" 
    onChange={(val) => searchFilterFunction(val)}
    ame="categorie"
  select 
  label="Category"
  fullWidth
>
  <MenuItem value={''}>filtre by category</MenuItem>


  {cat.map((value,id) => (
            
            <MenuItem value={value} key={id}>
              {value}
            </MenuItem>
          ))}
 
</TextField>               


{/* 
          <select className="form-control" name="categorie" onChange={(val) => searchFilterFunction(val)}   aria-label="Default select example">
                          
                          
                            <option value=""> filtre by category</option>
                         
                       
                            {cat.map((value,id) => (
            
            <option value={value} key={id}>
              {value}
            </option>
          ))}
                          
  </select>
       */}
      
      <IconButton color="primary" aria-label="upload picture" component="span">
        <Link to={`/AddProducts`} className="btn btn-success">
          <AddIcon /> Add new product
        </Link>

      </IconButton>

      </Grid>
      <br />
      {loading ? <CircularProgress /> :
        <Grid container spacing={1} direction="row">

          {prod.map((row,id) => (
            <Grid item xs={4} key={id}>
              <Card>
                <CardMedia
                  component="img"
                  alt="img"
                  height="194"
                  image={row.image}
                />
                <CardContent>
                  <Typography noWrap gutterBottom variant="p" component="div">
                    {row.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {row.price}$
                  </Typography>
                </CardContent>
                <CardActions>



                
                  <Link to={`/Edit/${row.id}`} className="btn btn-success">
                  <ModeEditOutlineIcon />
            </Link>
            
               
                 
                  <Link to={`/Delete/${row.id}`} className="btn btn-success">
                  <DeleteIcon />
            </Link>
                    
                
                  <IconButton color="primary" aria-label="upload picture" component="span">
                  
                
                  <Link to={`/More/${row.id}`} className="btn btn-success">
                    <MoreHorizIcon/>
            </Link>
                  </IconButton>

                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

      }
  
    </div >
  );
}
