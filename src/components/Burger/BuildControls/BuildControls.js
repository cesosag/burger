import React from 'react';
import classes from './BuildControls.sass';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          add={() => props.add(control.type)}
          remove={() => props.remove(control.type)}
          disabled={props.disabled[control.type]} />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>Order now</button>
    </div>
  );
}

export default buildControls;