import React from 'react';
import {
  Callout
} from "@blueprintjs/core";

export default (props) => {
  const { index, data: { addresses }, loading } = props;
  if (loading) return null;
  return (
    <li >
      <Callout>
        <div><b>Index:</b> {index}</div>
        <div><b>Pay to script hash address:</b> {addresses.p2shAddress}</div>
        <div><b>Segwit address:</b> {addresses.p2wshAddress}</div>
        <div><b>Segwit nested address:</b> {addresses.p2shP2wshAddress}</div>
      </Callout>
    </li>
  );
};