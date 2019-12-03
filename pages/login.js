import React, { Component } from 'react';
import Head from 'next/head';

import Layout from '../components/layout/Layout';
import SignIn from '../components/sign-in/sign-in-component';

class logIn extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <div>
          <Head>
            <title>SignIn</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout>
            <div className="container">
              <SignIn />
            </div>
          </Layout>
        </div>
      </div>
    );
  }
}

export default logIn;
