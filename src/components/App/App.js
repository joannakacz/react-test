import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../Product/Product';
import { Counter } from '../Counter/Counter';
import './App.css';

const App = () => {
  const [dataItems, setItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    axios.get('/api/cart')
      .then(function (response) {
        setItems(response.data);
        const sumPrice = response.data.reduce((a, b) => a + parseFloat(b.price), 0);
        setTotalValue(Math.round(sumPrice * 100) / 100);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const updateTotalValue = (change) => {
    setTotalValue(totalValue + change);
  }

  const formatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  });

  let getProducts = () => {
    return dataItems.map(function(item) {
      return (
        <li className="product__item" key={ item.pid } >
          <Product name={ item.name } price={ item.price } formatter={ formatter }/>
          <Counter min={ item.min } max={ item.max } isBlocked={ item.isBlocked } pid={ item.pid } price={ item.price } updateTotal={ (change) => updateTotalValue(change) } />
        </li>
      );
    });
  };

  return (
    <div className="container">
      <h3>
        Lista produktów
      </h3>
      <ul className="product__item__ul">
        { getProducts() }
      </ul>
      <div className="summaryProducts">
        Suma produktów w koszyku: <span>{ formatter.format(totalValue) }</span>
      </div>
    </div>
  );
};

export {
    App
};
