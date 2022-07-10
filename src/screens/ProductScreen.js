import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { fetchProductDetails } from "../actions/productActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Price from "../components/Price";
import Quantity from "../components/Quantity";
import Rating from "../components/Rating";

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const inStock = product?.countInStock > 0;
  const showQuantity = product?.countInStock > 10 ? 10 : product?.countInStock;
  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart(productId, qty));
  };

  return (
    <div className="max-width">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row top gap-2 h-100">
            <div className="col-2 bg-white">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-2">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>

                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                    size="lg"
                  />
                </li>

                <li className="line" />

                <li>
                  <Price price={product.price} size="lg" />
                </li>
              </ul>

              <div className="card card-body">
                <ul>
                  <li>
                    <div className="product-desc">
                      <strong>Product Details</strong>
                      <p>{product.description}</p>
                    </div>
                  </li>
                  <li>
                    <div className="product-desc">
                      <strong>Size & Fit</strong>
                      <p>
                        Tailored fit The model (height 6'1" and shoulders 17")
                        is wearing a size 39
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="product-desc">
                      <strong>Material & Care</strong>
                      <p style={{ marginBottom: 0 }}>Cotton</p>
                      <p style={{ marginTop: 0 }}>Machine wash cold</p>
                    </div>
                  </li>

                  {inStock && (
                    <li>
                      <span>Quantity: </span>
                      <span>
                        <Quantity
                          value={qty}
                          total={showQuantity}
                          onChange={(event) => setQty(event.target.value)}
                        />
                      </span>
                    </li>
                  )}

                  <li>
                    {inStock ? (
                      <span className="success">
                        Hurry up! Only {product.countInStock} left.
                      </span>
                    ) : (
                      <span className="danger">
                        This product is currently sold out
                      </span>
                    )}
                  </li>

                  <li className="mb-0">
                    <button
                      disabled={!inStock}
                      onClick={addToCartHandler}
                      className="primary block"
                    >
                      <i
                        className="fas fa-shopping-bag"
                        style={{ marginRight: "1rem" }}
                      ></i>{" "}
                      Add to bag
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
