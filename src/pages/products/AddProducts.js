import React,{useEffect,useState} from 'react'

import axios from "axios";

import { Button, MenuItem, Paper, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';


function AddProducts(props) {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [prod, setProds] = useState([]);
  
  useEffect(() => {
         axios.get('https://fakestoreapi.com/products/categories').then(response => {
             setProds(response.data);
             console.log(response.data);
            
            
         })
     }, [prod]);
  const handleSubmit = (e) => {
    e.preventDefault();

  
    axios.post('https://fakestoreapi.com/products', {
      title: title,
      price: parseFloat(price),
      description: description,
      image: image,
      category: category,
    })
      .then(result => {
        if (result.status === 200) {
          setLoading(false)
          alert('Add it   with success')
        }

        props.history.push("/products");
      }).catch(err => {


        setLoading(false)
        // console.log(err);
        alert(err)
      })
  };
  const handleCancelPost = () => {
    props.history.push("/products");

}


  return (
   

      <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
       <div className='container'>
     
        <h5 className="card-header">Mise à jour </h5>
        
                
            
                <div className="form-group">
                <form onSubmit={handleSubmit}>
    
            <div className="form-row">
                <div className="form-group">
                
                    <TextField fullWidth  label="Title" type="text" 
                            className="form-control" 
                            name="title"
                            value={title}
                            style={{marginBottom:"30px"}}
                            onChange={(e)=> setTitle(e.target.value)}
                           />
                </div>

                <div className="form-group ">
                   
                    <TextField fullWidth label="Price"
                            type="text" 
                            className="form-control" 
                            name="price"
                            value={price}
                            style={{marginBottom:"30px"}}
                            onChange={(e)=> setPrice(e.target.value)}
                          />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group ">
               
                    <TextField fullWidth label="Image URL" 
                     style={{marginBottom:"30px"}}
                            type="text" 
                            className="form-control" 
                            name="imageURL"
                            value={image}
                            onChange={(e)=> setImage(e.target.value)}
                           />
                </div>
            </div>


            <div className="form-row">
                <div className="form-group ">
               
                    <TextField fullWidth label="Description" 
                     style={{marginBottom:"30px"}}
                            type="text" 
                            className="form-control" 
                            name="description"
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                           />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group ">
                 
                <TextField
    value={category}
    className="form-control" 
    onChange={(e)=> setCategory(e.target.value)}
  select 
  label="Category"
  fullWidth
>
  <MenuItem value={'electronics'}>electronics</MenuItem>
    <MenuItem value={'jewelery'}>jewelery</MenuItem>
    <MenuItem value={'men clothing'}>men's clothing</MenuItem>
    <MenuItem value={'women clothing'}>women's clothing</MenuItem>
</TextField>               


                </div>
            </div>
            <br/>
            <br/>

            <Button   variant="outlined"  onClick={handleCancelPost} startIcon={<ArrowBackIcon />}>
             Cancel
             </Button>
             
                
              <Button variant="outlined" type="submit" style={{marginLeft:'50px'}}   startIcon={<AddIcon />}>
             Save
             </Button>
          
        </form>
        </div>
        </div>
   
        
        
    </Paper>
  );
}

export default AddProducts;