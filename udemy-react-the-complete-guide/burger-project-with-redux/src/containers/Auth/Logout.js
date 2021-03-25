import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  // dispatch log out as soon as user is navigated to this page
  // execute on first render
  useEffect(() => {
    dispatch(actions.logout());
    console.log("dispatched logout");
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Logout;
