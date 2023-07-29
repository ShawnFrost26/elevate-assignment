import React from 'react';
import "./Product.css"

const Product = ({ name, price, imageUrl }) => {
  return (
    <div className="product">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Product;
