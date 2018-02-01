import React, { Fragment } from 'react';
import classes from './Modal.sass';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
  <Fragment>
    <Backdrop show={props.show} hide={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(-50%)': 'translateY(-100vh)',
        opacity: props.show ? '1': '0'
      }}>
      {props.children}
    </div>
  </Fragment>
);

export default modal;