import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios";
import {useHistory} from "react-router-dom"
import { Button, Paper, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
const EditProduct = (props) => {
    const history=useHistory()
    const {id}=useParams()
    const [title,setTitle]=useState("")
    const [price,setPrice]=useState("");
    const [img,setImage]=useState("");
    const [category,setCategory]=useState("");
    useEffect(()=>{
        axios.get(`https://fakestoreapi.com/products/${id}`).then(res => {

         console.log(res);
         setTitle(res.data.title)
            setPrice(res.data.price)
            setImage(res.data.image)
            setCategory(res.data.category)
            
        }).catch(err => console.log(err))
    },[id])

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(title === "" || price === "" || img === "" || category === "") return
        const updatedMovie={
            id,
            title,
            price,
            imageURL:img,
            category
        }
        axios.put(`https://fakestoreapi.com/products/${id}`,updatedMovie)
        .then(res =>
          alert('Updated  with  success'),
          history.push("/products")
        ).catch(err => console.log(err))
     
    }
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
                            value={img}
                            onChange={(e)=> setImage(e.target.value)}
                           />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group ">
                 
                    <TextField fullWidth label="Category"  
 style={{marginBottom:"30px"}}
                            className="form-control" 
                            name="category" 
                            value={category}
                            onChange={(e)=> setCategory(e.target.value)}
                           />
                </div>
            </div>


            
            <br/>
            <br/>

            <Button   variant="outlined"  onClick={handleCancelPost} startIcon={<ArrowBackIcon />}>
             Cancel
             </Button>
             
                
              <Button variant="outlined" type="submit" style={{marginLeft:'50px'}}   startIcon={<ModeEditOutlineIcon />}>
             Update
             </Button>
          
        </form>
        </div>
        </div>
   
        
        
    </Paper>
    )
}

export default EditProduct