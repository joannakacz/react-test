import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import './Counter.css';

const Counter = (props) => {
  const itemMin = props.min || 1;
  const itemMax = props.max || Number.MAX_SAFE_INTEGER;

  const [count, setCount] = useState(itemMin);

  const updateValue = (value) => {
    const diff = value - count;
    setCount(value);
    props.updateTotal(Math.round(diff * props.price * 100) / 100);
  }

  const checkCountDebounced = useCallback(
		debounce((quantity, viewValid) => {
      let apiValid = false;
      axios.post('/api/product/check', {
        pid: props.pid,
        quantity: quantity
      })
      .then(function (response) {
        if(response.data.success) {
          apiValid = true;
        } else {
          apiValid = false;
        }
      })
      .catch(function () {
        apiValid = false
      })
      .then(function() {
        if (viewValid && !apiValid) {
          updateValue(itemMin);
        }
        if (!viewValid && apiValid) {
          updateValue(quantity);
        }
      });
    }, 1000),
		[],
  );

  let updateCount = (add) => {
    let counterToCheck = add ? count + 1 : count - 1;
    let viewValid = false;

    if(add) {
      if (count < itemMax) {
        viewValid = true;
      }
    } else {
      if (count > itemMin) {
        viewValid = true;
      }
    }

    if (viewValid) {
      updateValue(counterToCheck);
    }
    checkCountDebounced(counterToCheck, viewValid);
  }

  return (
    <div className="product__item__counter-hld">
      <button className="product__item__counter-plus" onClick={() => updateCount(true)} disabled={props.isBlocked}>
        +
      </button>
      <button className="product__item__counter-minus" onClick={() => updateCount(false)} disabled={props.isBlocked}>
        -
      </button>
      <div className="product__item__counter-info">
        Obecnie masz <span>{ count }</span> sztuk produktu
      </div>
    </div>
  );
};

export {
  Counter
};