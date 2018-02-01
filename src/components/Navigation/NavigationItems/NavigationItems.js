import React from 'react';
import classes from './NavigationItems.sass';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  const items = props.items.map((li, i) => <NavigationItem key={i} link={li.url} active={li.active}>{li.label}</NavigationItem>);
  return (
    <ul className={classes.Navigation}>
      {items}
    </ul>
  )
};

export default navigationItems;