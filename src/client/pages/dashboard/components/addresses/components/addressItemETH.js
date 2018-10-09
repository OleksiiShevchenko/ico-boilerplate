import React from 'react';
import {
  Callout
} from "@blueprintjs/core";


export default (props) => {
  const { i, data, loading } = props;
  if (loading) return null;

  return (
    <li key={i}>
      <Callout>
        <div><b>Index:</b> {i}</div>
        <div><b>Forwarder address:</b> {data}</div>
      </Callout>
    </li>
  );
};