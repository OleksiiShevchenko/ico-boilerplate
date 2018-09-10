import React, { Component } from 'react';
import './landing.css';
import { Layout, Button } from 'antd';

const { Header, Content, Footer } = Layout;


export default class Landing extends Component {

  render () {
    return (
    <Layout>
      <Header>
        header
      </Header>
      <Content  class="landing">
        <Button  type="primary" onClick={() => {}}>
          Get Address
        </Button>
      </Content>
      <Footer>
        ICO boilerplate
      </Footer>
    </Layout>
    );

  }
}