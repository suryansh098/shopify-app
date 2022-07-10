import React from "react";

const Quantity = ({ value, total, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {[...Array(total).keys()].map((x) => (
        <option key={x + 1} value={x + 1}>
          {x + 1}
        </option>
      ))}
    </select>
  );
};

export default Quantity;
