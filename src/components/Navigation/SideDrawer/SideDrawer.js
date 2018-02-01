import React, { Fragment } from 'react';
import classes from './SideDrawer.sass';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  const attachedClasses = [classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ');
  return (
    <Fragment>
      <Backdrop show={props.open} hide={props.closed} />
      <aside className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems items={props.items} />
        </nav>
      </aside>
    </Fragment>
  );
}

export default sideDrawer;