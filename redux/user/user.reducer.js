import UserActionTypes from './user.types';
import { login, logout } from '../../utils/auth';

let INITIAL_STATE = {
  currentUser: null,
  error: null
};

// if (typeof localStorage !== 'undefined') {
//   const authCookie = getCookie('auth');
//   if (authCookie) {
//     INITIAL_STATE = JSON.parse(decodeURIComponent(authCookie));
//   } else {
//     INITIAL_STATE = {
//       currentUser: null,
//       error: null
//     };
//   }
// } else {
//   INITIAL_STATE = {
//     currentUser: null,
//     error: null
//   };
// }

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      state = {
        ...state,
        currentUser: action.payload,
        error: null
      };
      login(state.currentUser);
      return state;
    case UserActionTypes.SIGN_OUT_SUCCESS:
      logout();
      return {
        ...state,
        currentUser: null,
        error: null
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
