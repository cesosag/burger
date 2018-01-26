import React, { Fragment } from 'react';
import classes from './OrderSummary.sass';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li className={classes['Summary-ingredient']} key={igKey}>
        <span>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total price: <strong>${props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCanceled}>Cancel</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
    </Fragment>
  )
}

export default orderSummary;