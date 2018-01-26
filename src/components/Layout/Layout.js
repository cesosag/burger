import React, { Fragment } from 'react';
import classes from './Layout.sass';

const layout = (props) => (
  <Fragment>
    <header>
      Toolbar, SideDrawer, Backdrop
    </header>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout;