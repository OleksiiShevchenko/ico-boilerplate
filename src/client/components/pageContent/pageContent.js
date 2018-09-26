import React, { Component } from 'react';
import './pageContent.scss';

export default class PageContent extends Component {

  render () {
    return (
      <section styleName="pageContent">
        {this.props.children}
      </section>
    );

  }
}
