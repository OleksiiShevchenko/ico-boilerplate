import React, { Component } from 'react';
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
  Icon
} from "@blueprintjs/core";


export default class Nav extends Component {

  render () {
    return (
      <Navbar className={Classes.DARK} styleName="mainNav">
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>ICO Boilerplate</NavbarHeading>
          <NavbarDivider />
          <NavLink to="/dashboard/keys"
                   className={cn(Classes.MINIMAL, Classes.BUTTON)}
                   styleName="navButton"
                   role="button" >
            <Icon icon="key" styleName="navIcon"/>Keys
          </NavLink>
          <NavLink to="/dashboard/addresses"
                   className={cn(Classes.MINIMAL, Classes.BUTTON)}
                   styleName="navButton"
                   role="button">
            <Icon icon="bank-account" styleName="navIcon"/>Addresses
          </NavLink>
          <NavLink to="/dashboard/transactions"
                   className={cn(Classes.MINIMAL, Classes.BUTTON)}
                   styleName="navButton"
                   role="button" >
            <Icon icon="exchange" styleName="navIcon"/>Transactions
          </NavLink>
        </NavbarGroup>
      </Navbar>
    );

  }
}
