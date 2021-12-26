import * as actionTypes from "./actionTypes";

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

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// MIDDLEWARE / THUNKS
const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    // after the token expires, log the user out
    // not setTimeout expects to get milliseconds, and expirationTime is in seconds
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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

        // get current time, and add expiration time (converted from milliseconds to seconds). Then wrap it all to return a Date object.
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

// e.g. check state if the user closes the tab and returns to the website
const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    // if we are not logged in, remove tokens thorugh logout()
    if (!token) {
      dispatch(logout());
    } else {
      // if we are logged in, check the expiration
      // note: returning anything from localStorage will be given as a string, so we must convert it back into a Date.
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      // if the current date is past the expiration date, then log out. Otherwise,
      // successfully authenticate user with their token (from localStorage) and userId (get from firebase)
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userId));
        // set time out to log the user out after the remaining time. Get the difference between the expiration date in milliseconds, and the current date in milliseconds.
        // convert it to seconds
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export {
  authStart,
  auth,
  authSuccess,
  authFail,
  checkAuthTimeout,
  logout,
  setAuthRedirectPath,
  authCheckState,
};
