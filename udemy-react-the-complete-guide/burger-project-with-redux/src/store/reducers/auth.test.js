import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    // execute our reducer, passing in initially undefined state, and an empty action
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(reducer({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: "/",
      }, {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'some-token',
          userId: 'some-user-id'
      }).toEqual({
        idToken: 'some-token',
        userId: 'some-user-id'
        error: null,
        loading: false,
        authRedirectPath: "/",
      });
  })
});
