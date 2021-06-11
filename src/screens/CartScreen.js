import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = (props) => {
  const productId = props.match.params.id;

  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const dispatch = useDispatch()
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        { cartItems.length === 0 ? <MessageBox>
          Cart is empty. <Link to="/">View products.</Link>
        </MessageBox>
        :
        (
          <ul>
            {
              cartItems.map((item) => (
                <li key={item.product}>

                  <div className="row">
                    {/* display item image */}
                    <div>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="small"      
                      />
                    </div>

                    {/* display item name */}
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    {/* display item quantity */}
                    <div>
                      <select 
                        value={item.qty} 
                        onChange={(event) => 
                          dispatch(
                            addToCart(item.product, Number(event.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map( 
                          (x) => (
                            <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                      </select>
                    </div>

                    {/* display item price */}
                    <div>
                      ${item.price}
                    </div>

                    {/* delete item */}
                    <div>
                      <button 
                        type="button" 
                        onClick={() => removeFromCartHandler(item.product)}>
                        Delete
                      </button>
                    </div>

                  </div>
                </li>
              ))
            }
          </ul>
        )
        }
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((acc, curr_item) => acc + curr_item.qty, 0)} items) : $
                {cartItems.reduce((acc, curr_item) => acc + curr_item.price * curr_item.qty, 0)}
              </h2>
            </li>

            <li>
              <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>Proceed to Checkout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
