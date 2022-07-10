import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import { signout } from "./actions/userActions";

import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import Dropdown from "./components/Dropdown";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const userDropdown = [
    { title: "Profile", path: "/profile" },
    { title: "Orders", path: "/orderhistory" },
    { title: "Sign Out", path: "#signout", onClick: signoutHandler },
  ];

  const adminDropdown = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Products", path: "/productlist" },
    { title: "Orders", path: "/orderlist" },
    { title: "Users", path: "/userlist" },
  ];

  return (
    <Router>
      <div className="grid-container">
        <header>
          <div className="row max-width">
            <div className="logo">
              <Link to="/">
                <h1>Shopify</h1>
              </Link>
            </div>
            <div>
              <Link to="/cart">
                <i className="fas fa-shopping-bag"></i>
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              {userInfo ? (
                <Dropdown
                  title={userInfo.name}
                  titlePath="#"
                  items={userDropdown}
                />
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <Dropdown title="Admin" titlePath="#" items={adminDropdown} />
              )}
            </div>
          </div>
        </header>
        <main>
          {/* Common Routes */}
          <Route path="/cart/:id?" component={CartScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/signin" component={SigninScreen} exact></Route>
          <Route path="/register" component={RegisterScreen} exact></Route>

          {/* Private Routes */}
          <PrivateRoute
            path="/shipping"
            component={ShippingScreen}
            exact
          ></PrivateRoute>
          <PrivateRoute
            path="/payment"
            component={PaymentScreen}
            exact
          ></PrivateRoute>
          <PrivateRoute
            path="/placeorder"
            component={PlaceOrderScreen}
            exact
          ></PrivateRoute>
          <PrivateRoute
            path="/order/:id"
            component={OrderScreen}
            exact
          ></PrivateRoute>
          <PrivateRoute
            path="/orderhistory"
            component={OrderHistoryScreen}
            exact
          ></PrivateRoute>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
            exact
          ></PrivateRoute>

          {/* Admin Routes */}
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/userlist"
            component={UserListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
            exact
          ></AdminRoute>

          {/* Home Route */}
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          &copy; 2021 | All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
