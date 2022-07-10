import React from "react";

const Rating = (props) => {
  const { rating, numReviews, size = "sm" } = props;
  const reviews =
    numReviews < 1000 ? numReviews : `${(numReviews / 1000).toFixed(1)}k`;
  return (
    <div className="rating">
      <span>
        <strong>{rating}</strong>{" "}
        <i className="fas fa-star" style={{ color: "var(--light-teal)" }}></i>
      </span>
      <span>
        <strong>{reviews}</strong> {size === "lg" && "Ratings"}
      </span>
    </div>
  );
};

export default Rating;
