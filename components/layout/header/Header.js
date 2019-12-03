import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../../firebase/firebase.util';
import CartIcon from '../../cart-icon/cart-icon-component';
import CartDropdown from '../../cart-dropdown/cart-dropdown-component';
import { selectCartHidden } from '../../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { signOutStart } from '../../../redux/user/user.actions';
import { logout } from '../../../utils/auth';

import { GiLaurelCrown } from 'react-icons/gi';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer href="/">
      <GiLaurelCrown style={{ fontSize: '36px' }} />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink href="/shop">SHOP</OptionLink>
      <OptionLink href="/shop">CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={signOutStart}>
          logout
        </OptionLink>
      ) : (
        <OptionLink href="/login">login</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
