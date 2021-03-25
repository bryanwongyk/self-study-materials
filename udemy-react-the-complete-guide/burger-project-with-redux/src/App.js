import React, { useEffect } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder.js";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Logout from "./containers/Auth/Logout";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions/index";

const App = () => {
  // check auth state
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(actions.authCheckState());
  });

  // non authenticated routes
  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      {/* needs to be exactly /, otherwise they will reach here first before the redirect */}
      <Route path="/" exact component={BurgerBuilder} />
      {/* for any other route, redirect them back to home page */}
      <Redirect to="/" />
    </Switch>
  );

  if (!!isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        {/* Redirect any unknown link to the home page */}
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default App;
