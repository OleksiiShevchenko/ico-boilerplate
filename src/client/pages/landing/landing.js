import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './landing.css';

export default class Landing extends Component {

  static propTypes = {
    getAddress: PropTypes.func.isRequired,
  };

  componentDidMount () {
    this.props.getAddress();
  }

  render () {
    const { address: { btcAddresses, ethAddresses } } = this.props;

    return (
      <main>
        <h1>Yet another ICO</h1>
        <div>
          <h3>We appreciate your bitcoin donations to</h3> <br/>
          P2SH Address: {btcAddresses && btcAddresses.addresses.p2shAddress} <br/>
          Segwit Address: {btcAddresses && btcAddresses.addresses.p2wshAddress} <br/>
          Segwit Nested Address: {btcAddresses && btcAddresses.addresses.p2shP2wshAddress} <br/>
        </div>

        <div>
          <h3>We appreciate your ether donations to</h3> <br/>
          {ethAddresses && ethAddresses.forwarderAddress}
        </div>
      </main>
    );

  }
}