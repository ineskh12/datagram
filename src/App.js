import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Carts, Home, Login, Users, Products } from './pages'
import AddProducts from './pages/products/AddProducts'
import EditProduct from './pages/products/EditProduct'
import { Header, ContentAndFooter } from './components';

import { useCookies } from 'react-cookie';
import Details from './pages/products/Details';
import DetailsCart from './pages/carts/DetailsCart';
import UserDetails from './pages/users/UserDetails';
import DeleteProducts from './pages/products/DeleteProducts';

function App() {
  const [token, setToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token && cookies.token === "eyJr389hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
      setToken(cookies.token);


  }, [cookies.token])


  function HandleAuth(logged, token) {
    // console.log({ logged, token });
    setCookie('token', token, { path: '/', maxAge: 3600 });
    setToken(token)
  }

  function logout() {
    setToken(null);
    removeCookie('token');
  }

  return (
    <div className="App">
      {token ?
        <>
          <Header logout={logout} />
          <ContentAndFooter >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/carts" component={Carts} />

              <Route exact path="/products" component={Products} />
              <Route exact path="/AddProducts" component={AddProducts} />
              <Route exact path="/Delete/:id" component={DeleteProducts} />
              <Route exact path="/Edit/:id" component={EditProduct} />
              <Route exact path="/More/:id" component={Details} />
              <Route exact path="/Morecart/:id" component={DetailsCart} />
              <Route exact path="/MoreUser/:id"   component={UserDetails} />
              <Route exact path="/EditProduct" component={EditProduct} />
            </Switch>
          </ContentAndFooter>
        </>
        :
        <Login HandleAuth={HandleAuth} />
      }
    </div>
  );
}

export default App;