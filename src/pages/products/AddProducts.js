import React, { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Select from '@mui/material/Select';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function AddProducts(props) {
  const classes = useStyles()

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

    setLoading(true)
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
          alert('Ajout effectué avec succès')
        }

        props.history.push("/products");
      }).catch(err => {


        setLoading(false)
        // console.log(err);
        alert(err)
      })
  };


  return (
    <Container>
      <h1>Add New Product</h1>
      <form className={classes.root} onSubmit={handleSubmit}>

        <div>
          <TextField
            name="title"
            label="title"
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br />
          <TextField
            name="price"
            label="price"
            variant="filled"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <TextField
            name="category"
            label="category"
            variant="filled"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          
          
          
         






                                    <Select name="category" >
                        <option value="">Choose a category</option>
                        {prod.map((value) => (
                            <option value={value.id} key={value.id}>
                                {value}
                            </option>
                        ))}
                    </Select>
          
          <br />
          <TextField
            name="description"
            label="description"
            variant="filled"
            multiline

            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /><br />
          <TextField
            name="image"
            label="Image URL"
            variant="filled"
            multiline

            value={image}
            onChange={(e) => setImage(e.target.value)}
          /><br />
          {/* <Input accept="image/jpg, image/jpeg, image/png" type="file"  name="image" onChange={(e) => setSelectedFile(e.target.files[0]) }  /> */}
        </div>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"

          onClick={handleSubmit}
        >{loading ? <CircularProgress color="inherit" /> : 'Save'}</Button>

        {loading ? null : <Button
          className={classes.button}
          variant="contained"
          color="default"
          type="submit"

          onClick={() => props.history.push("/products")}
        >Cancel</Button>}
      </form>
    </Container>
  );
}

export default AddProducts;