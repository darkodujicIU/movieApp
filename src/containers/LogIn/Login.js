import React, { Component } from "react";
import classes from "./Login.css";
import LoginComp from "../../components/LoginComp/LoginComp";
//Login container represented as a parent that includes Login Component with its own CSS styles
class Login extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.children !== nextState.children) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className={classes.Login}>
        <LoginComp />
      </div>
    );
  }
}

export default Login;
