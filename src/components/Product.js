import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = (props) => {
  const { product } = props;
  return (
    <div key={product._id} className="card product">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2
            className="subtitle"
            style={{ fontSize: "1.5rem", textAlign: "center" }}
          >
            {product.name}
          </h2>
        </Link>
        <div className="product-info">
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div className="price">${product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
