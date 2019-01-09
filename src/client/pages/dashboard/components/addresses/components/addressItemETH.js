import React from 'react';
import {
  Callout
} from "@blueprintjs/core";


export default (props) => {
  const { index, data, loading } = props;
  if (loading) return null;

  return (
    <li>
      <Callout>
        <div><b>Index:</b> {index}</div>
        <div><b>Forwarder address:</b> {data}</div>
      </Callout>
    </li>
  );
};