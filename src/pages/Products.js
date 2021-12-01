import React, { useState, useEffect } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';

import Grid from '@mui/material/Grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Card from '@mui/material/Card';
import { Button, CardContent, Dialog, DialogActions, DialogTitle, IconButton, Typography } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Products() {

  const baseUrl='https://fakestoreapi.com/products'
  const [open, setOpen] = React.useState(false);
  const [prod, setProds] = useState([]);
  const [cat, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idTodelete, setIdTodelete] = useState(null);
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





  const handleClickOpen = (id) => {
    setOpen(true);
    setIdTodelete(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitDelete = () => {

    handleClose();
    setLoading(true);
    axios.delete('https://fakestoreapi.com/products/' + idTodelete).then(result => {
    
      setLoading(false);
      alert('Product with ' + idTodelete + ' was deleted');
    })
      .catch((err) => {
        setLoading(false)
        alert('error loading product data')
      })
  }


  return (
    <div>
  
      <Typography variant="h2" component="h1" gutterBottom>
        Products list
      </Typography>


      <Grid >
   



          <select className="form-control" name="categorie" onChange={(val) => searchFilterFunction(val)}   aria-label="Default select example">
                          
                          
                            <option value=""> filtre by category</option>
                         
                       
                            {cat.map((value,id) => (
            
            <option value={value} key={id}>
              {value}
            </option>
          ))}
                          
  </select>
      
      
      <IconButton color="primary" aria-label="upload picture" component="span">
        <Link to={`/AddProducts`} className="btn btn-success">
          <AddIcon />
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



                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <Link to={{
                      pathname: '/EditProduct',
                      state: row
                    }} >
                      <ModeEditOutlineIcon />
                    </Link>

                  </IconButton>
                  <IconButton onClick={() => handleClickOpen(row.id)} color="primary" aria-label="upload picture" component="span">
                  
                    <DeleteIcon />
                 
                  </IconButton>
                
                  <IconButton color="primary" aria-label="upload picture" component="span">
                  

                  <Link to={{
                      pathname: '/More',
                      state: row
                    }} >
                                
                                   <MoreHorizIcon/>    </Link>
                  </IconButton>

                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete this product"}
        </DialogTitle>
     
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => submitDelete()} >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
