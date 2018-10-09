import React from 'react';
import {
  Callout
} from "@blueprintjs/core";

export default (props) => {
  const { i, data: { p2wshAddress, p2shAddress, p2shP2wshAddress }, loading } = props;
  if (loading) return null;
  return (
    <li key={p2wshAddress}>
      <Callout>
        <div><b>Index:</b> {i}</div>
        <div><b>Pay to script hash address:</b> {p2shAddress}</div>
        <div><b>Segwit address:</b> {p2shP2wshAddress}</div>
        <div><b>Segwit nested address:</b> {p2wshAddress}</div>
      </Callout>
    </li>
  );
};