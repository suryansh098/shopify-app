import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ title, titlePath, items }) => {
  const [showItems, setShowItems] = useState(false);

  const handleItemsVisibility = () => {
    setShowItems((prev) => !prev);
  };

  return (
    <div className="dropdown">
      <Link to={titlePath} onClick={handleItemsVisibility}>
        {title} <i className="fa fa-caret-down"></i>
      </Link>
      {showItems && (
        <ul className="dropdown-content">
          {items.map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={item.onClick}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
