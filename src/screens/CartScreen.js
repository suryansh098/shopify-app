import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Quantity from "../components/Quantity";
import Price from "../components/Price";

const CartScreen = (props) => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  const totalMrp = cartItems.reduce((acc, item) => {
    acc += (item.price + 100) * item.qty;
    return acc;
  }, 0);

  const totalDiscount = cartItems.reduce((acc, item) => {
    acc += 100 * item.qty;
    return acc;
  }, 0);

  return (
    <div className="max-width">
      <h1>Shopping Cart</h1>
      <div className="row top gap-2">
        <div className="col-2">
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">View products.</Link>
            </MessageBox>
          ) : (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row top gap-2 card card-body cart-item">
                    <div>
                      <img src={item.image} alt={item.name} className="small" />
                    </div>
                    <div className="col-1">
                      <Link to={`/product/${item.product}`}>
                        <h2 className="subtitle" style={{ margin: 0 }}>
                          {item.name}
                        </h2>
                      </Link>
                      <div>
                        <Price price={item.price} size="lg" />
                      </div>
                      <div>
                        <b style={{ marginRight: "1rem" }}>Qty:</b>
                        <Quantity
                          value={item.qty}
                          total={item.countInStock}
                          onChange={(event) => {
                            dispatch(
                              addToCart(
                                item.product,
                                Number(event.target.value)
                              )
                            );
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-1 cart-price">
          <div className="card card-body">
            <h2 className="subtitle" style={{ margin: 0 }}>
              Price Details ({cartItems.length} Items)
            </h2>
            <ul>
              <li>
                <div className="row">
                  <span>Total MRP</span>
                  <span>${totalMrp}</span>
                </div>
              </li>
              <li>
                <div className="row">
                  <span>Discount on MRP</span>
                  <span>- ${totalDiscount}</span>
                </div>
              </li>
              <li className="line" />
              <li>
                <div className="row">
                  <b>Subtotal</b>
                  <b>${totalMrp - totalDiscount}</b>
                </div>
              </li>
              <li className="mb-1">
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="primary block"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
