import React, { Component } from 'react';
import './dashboard.scss';
import Navbar from '../../components/navbar';
import { Route } from 'react-router-dom';
import Keys from './components/keys';
import Addresses from './components/addresses';
import Transactions from './components/transactions';
import { Classes } from "@blueprintjs/core";
import Container from '../../components/pageContent';
import CoinTabs from '../../components/coinTabs';


export default class Dashboard extends Component {

  render () {
    return (
      <main styleName="dashboard" className={Classes.DARK}>
        <Navbar/>
        <Container>
          <CoinTabs/>
          <Route path="/dashboard/keys" component={Keys}/>
          <Route path="/dashboard/addresses" component={Addresses}/>
          <Route path="/dashboard/transactions" component={Transactions}/>
        </Container>
      </main>
    );

  }
}
