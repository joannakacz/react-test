import React from 'react';
import './Product.css';


const Product = (props) => {
  return (
    <span>
      <span className="product__item__name">
        { props.name }
      </span>
      <span className="product__item__price-hld">
        <span className="product__item__price-txt">
          cena:
        </span>
        <span className="product__item__price-val">
          { props.formatter.format(props.price) }
        </span>
      </span>
    </span>
  );
};

export {
  Product
};