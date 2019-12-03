import React from 'react';
import isofetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../redux/user/user.selectors';
import { checkUserSession } from '../redux/user/user.actions';
import getHost from '../utils/get-host';

import WithAuthHoc, { authenticate } from '../utils/auth';
import { auth } from '../firebase/firebase.util';

import Layout from '../components/layout/Layout';

class Index extends React.Component {
  static async getInitialProps(props) {
    // console.log('props', props);
    const { ctx } = props;
    const { store } = ctx;
    const state = await store.getState();
    const { token } = nextCookie(ctx);
    // console.log('state', ctx);
    // const token = authenticate(ctx);
    const apiUrl = `http://localhost:3000/api/home`;
    console.log('url', apiUrl);

    const redirectOnError = () =>
      typeof window !== 'undefined'
        ? Router.push('/login')
        : ctx.res.writeHead(302, { Location: '/login' }).end();

    if (token) {
      return state;
    }
    return redirectOnError();

    // try {
    //   const response = await fetch(apiUrl, {
    //     method: 'post',
    //     credentials: 'include',
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });

    //   if (response.ok) {
    //     const js = await response.json();
    //     console.log('js', js);
    //     return js;
    //   } else {
    //     // https://github.com/developit/unfetch#caveats
    //     console.log('response', response);
    //     return await redirectOnError();
    //   }
    // } catch (error) {
    //   // Implementation or Network error
    //   console.log('server Error', error.error);
    //   return redirectOnError();
    // }
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Layout>
        <h2>Index Page</h2>
      </Layout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthHoc(Index));
