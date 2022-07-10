import React from "react";

const Price = ({ price, size = "sm" }) => {
  const mrp = price + 100;
  const discountPercent = 100 - ((price / mrp) * 100).toFixed(0);

  return (
    <div
      className="price-wrapper"
      style={{ marginBlock: size === "lg" ? "2rem" : 0 }}
    >
      <p className="price">
        <strong className="sp">${price}</strong>
        <span className="mrp">${mrp}</span>
        <span className="discount">({discountPercent}% OFF)</span>
      </p>
      {size === "lg" && <p className="price-info">inclusive of all taxes</p>}
    </div>
  );
};

export default Price;
