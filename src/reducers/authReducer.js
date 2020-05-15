import { SIGN_IN, SIGN_IN_ERROR, SIGN_OUT } from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: null,
  username: null,
  error: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { isSignedIn: true, username: action.payload };
    case SIGN_IN_ERROR:
      return { isSignedIn: false, error: action.payload };
    case SIGN_OUT:
      return { isSignedIn: false, username: null };
    default:
      return state;
  }
};
