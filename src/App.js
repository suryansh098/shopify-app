import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="logo" href="/">shopify</a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signin">Sign in</a>
        </div>
      </header>
      <main>
        <Route path='/product/:id' component={ProductScreen} exact></Route>
        <Route path='/' component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">All rights reserved</footer>
    </div>
    </Router>
  );
}

export default App;
