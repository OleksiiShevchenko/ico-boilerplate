import React, { Component } from 'react';
import './addresses.scss';
import {
  Card,
  H5
} from "@blueprintjs/core";
import AddressItemBTC from './components/addressItemBTC';
import AddressItemETH from './components/addressItemETH';


export default class Addresses extends Component {

  constructor (props) {
    super(props);
    this.renderMasterAddresses = this.renderMasterAddresses.bind(this);
  }

  componentWillMount () {
    const { getIndex, listAddresses, getMasterAddresses, coin } = this.props;
    getIndex(coin);
    listAddresses(coin);
    getMasterAddresses();
  }

  renderAddressList () {
    const { coin, addressList, loading } = this.props;
    return addressList.map((item, i) => {
      return (coin === 'BTC') ? (<AddressItemBTC key={i} data={item} loading={loading} />) : (<AddressItemETH key={i} data={item} loading={loading} />);
    })
  }

  renderMasterAddresses () {
    const { masterAddresses, coin } = this.props;
    if (coin !== 'ETH') return null;

    return (
      <div styleName="container">
        <H5>Master Addresses</H5>
        <ul>
          {masterAddresses.map(address => {
            return (<li key={address.checksumAddress}>{address.checksumAddress}</li>);
          })}
        </ul>
      </div>
    );
  }

  render () {
    const { derivationIndex } = this.props;
    return (
      <div styleName="addresses">
        <Card elevation={1} interactive={false} >

          {this.renderMasterAddresses()}

          <div styleName="container">
            <H5>Deposit Addresses</H5>
            <div>
              Current Derivation Index: {derivationIndex}
            </div>

            <div styleName="addressListContainer">
              <div styleName="addressList">
                <ul>
                  {this.renderAddressList()}
                </ul>
              </div>
            </div>

          </div>
        </Card>

      </div>
    );

  }
}
