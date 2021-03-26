// need to import react since we are using JSX (i.e. our components)
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// we have to import the components we want to render
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

// to connect enzyme
configure({ adapter: new Adapter() });

// render a NavigationItem and look into it
// shallow : most common method you should use. It renders the component but without deeply rendering any of its child components (ensure we are only
// testing the component as an isolated unit).

describe("<NavigationItems />", () => {
  let wrapper;
  // function that will run before each of our tests.
  // we can make a new wrapper each time since we are using it in all our tests
  beforeEach(() => {
    const wrapper = shallow(<NavigationItems />);
  });
  it("should render two <NavigationItem /> elements if not authenticated", () => {
    // find() lets us look inside the wrapper/component
    // then we use jest's utility methods
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> elements if authenticated", () => {
    // just pass in isAuth for it to be true
    wrapper.setProps({ isAuth: true });
    // find() lets us look inside the wrapper/component
    // then we use jest's utility methods
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
