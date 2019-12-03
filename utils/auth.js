import { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../redux/user/user.selectors';
import { checkUserSession } from '../redux/user/user.actions';

export const login = ({ token }) => {
  cookie.set('token', token, { expires: 1 });
  Router.push('/');
};

export const authenticate = ctx => {
  const { token } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return;
  }

  if (!token) {
    Router.push('/login');
  }

  return token;
};

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/login');
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

export const withAuthSync = (WrappedComponent, props) => {
  return class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      //const token = auth(ctx);
      console.log('ctx', props);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      // return { ...componentProps, token };
      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

// const withAuthSync = WrappedComponent => props => {
//   const Wrapper = props => {
//     const syncLogout = event => {
//       if (event.key === 'logout') {
//         console.log('logged out from storage!');
//         Router.push('/login');
//       }
//     };

//     useEffect(() => {
//       window.addEventListener('storage', syncLogout);

//       return () => {
//         window.removeEventListener('storage', syncLogout);
//         window.localStorage.removeItem('logout');
//       };
//     }, []);

//     return <WrappedComponent {...props} />;
//   };

//   Wrapper.getInitialProps = async ctx => {
//     const token = auth(ctx);

//     const componentProps =
//       WrappedComponent.getInitialProps &&
//       (await WrappedComponent.getInitialProps(ctx));

//     return { ...componentProps, token };
//   };

//   return <Wrapper {...props} />;
// };

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(withAuthSync(WrappedComponent));
