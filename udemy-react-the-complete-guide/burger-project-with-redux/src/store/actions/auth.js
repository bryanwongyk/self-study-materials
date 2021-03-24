import * as actionTypes from "./actionTypes";
import axios from "axios";

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

const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    // authenticate the user
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    // if it is signup
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8u6QhYxwdNmAxqfyKnoGQ-duyqu6oiV4";
    // if it is signin
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8u6QhYxwdNmAxqfyKnoGQ-duyqu6oiV4";
    }
    // no need for an axios instance bc we do not really need a base URL
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        authFail(error);
      });
  };
};

export { authStart, auth, authSuccess, authFail };
