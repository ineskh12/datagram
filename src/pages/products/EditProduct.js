import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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


export default function BasicSelect(props) {
  const classes = useStyles()
  let location = useLocation();

  const [title, setTitle] = useState(location.state.title);
  const [description, setDescription] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [category, setCategory] = useState(location.state.category);
  const [image, setImage] = useState(location.state.image);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true)
    axios.put('https://fakestoreapi.com/products/' + location.state.id, {
      title: title,
      price: parseFloat(price),
      description: description,
      image: image,
      category: category,
    })
      .then(result => {
        if (result.status === 200) {
          setLoading(false)
          alert('Modification successfully completed')
        }

        props.history.push("/products");
      }).catch(err => {


        setLoading(false)
        alert(err)
      })
  };


  return (
    <Container>
      <h1>Edit Product</h1>
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
          /><br />
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
          
        </div>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"

        onClick={handleSubmit}
        >{loading ? <CircularProgress color="inherit" /> : 'Update'}</Button>

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
