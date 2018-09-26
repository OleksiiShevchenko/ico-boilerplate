import React, { Component } from 'react';
import './addresses.scss';
import {
  Card,
  Classes,
  H5,
  Button,
  TextArea,
  Intent,
  HTMLTable,
  Alert,
  OL,
  Collapse,
  Callout
} from "@blueprintjs/core";

export default class Addresses extends Component {

  constructor (props) {
    super(props);
    this.handleToggleAddresses = this.handleToggleAddresses.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentWillMount () {
    const { getIndex, listAddresses, coin } = this.props;
    getIndex(coin);
    listAddresses(coin);
  }

  handleToggleAddresses () {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  renderAddressList () {
    const { addressList } = this.props;

    return addressList.map((item, i) => {
      return (
        <li key={item.p2wshAddress}>
          <Callout>
            <div><b>Index:</b> {i}</div>
            <div><b>Pay to script hash address:</b> {item.p2shAddress}</div>
            <div><b>Segwit address:</b> {item.p2shP2wshAddress}</div>
            <div><b>Segwit nested address:</b> {item.p2wshAddress}</div>
          </Callout>
        </li>
      );
    })
  }

  render () {
    const { derivationIndex } = this.props;
    return (
      <div styleName="addresses">
        <Card elevation={1} interactive={false} >
          <div styleName="container">
            <H5>Deposit Addresses</H5>

            <div>
              Current Derivation Index: {derivationIndex}
            </div>

            <div styleName="addressListContainer">
              <Button onClick={this.handleToggleAddresses}>
                {this.state.isOpen ? "Hide addresses" : "Show addresses"}
              </Button>

              <div styleName="addressList">
                <Collapse isOpen={this.state.isOpen}
                          keepChildrenMounted={false}>
                  <ul>
                    {this.renderAddressList()}
                  </ul>
                </Collapse>
              </div>
            </div>

          </div>
        </Card>

      </div>
    );

  }
}
