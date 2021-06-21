import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { OrderScreen } from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

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
                      <Link to="/orderhistory">Order History</Link>
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
            
          </div>
        </header>
        <main>
          <Route path='/cart/:id?' component={CartScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen} exact></Route>
          <Route path="/signin" component={SigninScreen} exact></Route>
          <Route path="/register" component={RegisterScreen} exact></Route>
          <Route path='/shipping' component={ShippingScreen} exact></Route>
          <Route path='/payment' component={PaymentScreen} exact></Route>
          <Route path='/placeorder' component={PlaceOrderScreen} exact></Route>
          <Route path='/order/:id' component={OrderScreen} exact></Route>
          <Route path='/orderhistory' component={OrderHistoryScreen} exact></Route>
          <Route path='/profile' component={ProfileScreen} exact></Route>
          <Route path='/' component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </Router>
  );
}

export default App;
