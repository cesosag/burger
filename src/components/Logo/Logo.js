import React from 'react';
import classes from './Logo.sass';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
  <figure className={classes.Logo}>
    <img src={burgerLogo} alt='Burger logo'/>
  </figure>
);

export default logo;