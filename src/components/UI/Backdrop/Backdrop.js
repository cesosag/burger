import React from 'react';
import classes from './Backdrop.sass';
import Transition from 'react-transition-group/Transition';

const transitionStyles = {
  entering: {opacity: 0},
  entered: {opacity: 1},
};

const backdrop = (props) => (
  <Transition in={props.show} timeout={300} mountOnEnter={true} unmountOnExit={true} >
    {(state) => (
      <div className={classes.Backdrop} style={transitionStyles[state]} onClick={props.hide}></div>
    )}
  </Transition>
);

export default backdrop;