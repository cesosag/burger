import React from 'react';
import classes from './Toolbar.sass';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

export const items = [
  {url: '/', label: 'Burger builder', active: true},
  {url: '/checkout', label: 'Checkout'}
]

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <button onClick={props.openDrawer} className={classes.Menu}>
      <div></div>
      <div></div>
      <div></div>
    </button>
    <Logo />
    <nav className={classes.DesktopOnly}>
      <NavigationItems items={items} />
    </nav>
  </header>
);

export default toolbar;