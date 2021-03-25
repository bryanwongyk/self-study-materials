import React, { useEffect } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder.js";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Logout from "./containers/Auth/Logout";
import { Route, Switch } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import { useDispatch } from "react-redux";
import * as actions from "./store/actions/index";

const App = () => {
  // check auth state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.authCheckState());
  });

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
