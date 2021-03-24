import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  // should be used to indicate a loading screen
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
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
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      process.env.REACT_APP_API_KEY;
    // if it is signin
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        process.env.REACT_APP_API_KEY;
    }
    // no need for an axios instance bc we do not really need a base URL
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((error) => {
        console.error(error);
        authFail(error);
      });
  };
};

export { authStart, auth, authSuccess, authFail };
