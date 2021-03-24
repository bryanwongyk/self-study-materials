import * as actionTypes from "./actionTypes";

const authStart = () => {
  // should be used to indicate a loading screen
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

const auth = (email, password) => {
  return (dispatch) => {
    // authenticate the user
    dispatch(authStart());
  };
};

export { authStart, auth, authSuccess, authFail };
