import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import { signout } from './actions/userActions';

import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems} = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="logo" to="/">shopify</Link>
          </div>
          <div>
            <Link to="/cart">Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to='#'>
                    { userInfo.name } <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Orders</Link>
                    </li>
                    <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign in</Link>
              )
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to='/userlist'>Users</Link>
                    </li>
                  </ul>
                </div>
              )
            }
            
          </div>
        </header>
        <main>
          {/* Common Routes */}
          <Route path='/cart/:id?' component={CartScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen} exact></Route>
          <Route path="/signin" component={SigninScreen} exact></Route>
          <Route path="/register" component={RegisterScreen} exact></Route>

          {/* Private Routes */}
          <PrivateRoute path='/shipping' component={ShippingScreen} exact></PrivateRoute>
          <PrivateRoute path='/payment' component={PaymentScreen} exact></PrivateRoute>
          <PrivateRoute path='/placeorder' component={PlaceOrderScreen} exact></PrivateRoute>
          <PrivateRoute path='/order/:id' component={OrderScreen} exact></PrivateRoute>
          <PrivateRoute path='/orderhistory' component={OrderHistoryScreen} exact></PrivateRoute>
          <PrivateRoute path='/profile' component={ProfileScreen} exact></PrivateRoute>

          {/* Admin Routes */}
          <AdminRoute path='/productlist' component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path='/product/:id/edit' component={ProductEditScreen} exact></AdminRoute>
          <AdminRoute path='/orderlist' component={OrderListScreen} exact></AdminRoute>

          {/* Home Route */}
          <Route path='/' component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </Router>
  );
}

export default App;
