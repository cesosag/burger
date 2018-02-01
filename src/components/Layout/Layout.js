import React, { Fragment, PureComponent } from 'react';
import classes from './Layout.sass';
import Toolbar, { items } from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends PureComponent {
  state = {
    showSideDrawer: false
  }

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true});
  }

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  render() {
    return (
      <Fragment>
        <Toolbar openDrawer={this.sideDrawerOpenHandler} />
        <SideDrawer items={items} open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default Layout;