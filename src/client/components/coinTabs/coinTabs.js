import React, { Component } from 'react';
import './coinTabs.scss';
import { Tab, Tabs, Classes } from "@blueprintjs/core";

export default class CoinTabs extends Component {

  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange (selectedTab) {
    this.props.selectCoin(selectedTab);
  }

  render () {
    return (
      <section styleName="coinTabs">
        <Tabs className={Classes.TABS}
              animate={true}
              large={true}
              onChange={this.handleTabChange}
              selectedTabId={this.props.coin}>
          <Tab id="BTC" title="BTC" />
          <Tab id="ETH" title="ETH" />
        </Tabs>
      </section>
    );

  }
}
