import React, { Component } from "react";
import classes from "./LoginComp.css";
import Input from "./Input/Input";
import Aux from "../../hoc/axxx";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Loader } from "react-loader-spinner";
//Forming of Login state and its data including validation of its inputs in order to be submitted properly
class Logincomp extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "Your email",
          type: "email",
        },
        value: "",
        validation: {
          required: true,
          contains: "@",
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          placeholder: "Your password",
          type: "password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
    },
    formValid: false,
  };
  //Function checks true or false for validity of input we are using which can be reused in later functions
  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.contains) {
      isValid = value.includes(rules.contains) && isValid;
    }

    return isValid;
  }
  //Taking value of an input with each change then checkind validity of that value by using previous function. Finally, storing updated data in state
  inputChangeHandler = (id, event) => {
    event.preventDefault();
    const updatedForm = {
      ...this.state.loginForm,
    };

    const updatedAll = {
      ...updatedForm[id],
    };

    updatedAll.value = event.target.value;
    updatedAll.valid = this.checkValidity(
      updatedAll.value,
      updatedAll.validation
    );

    updatedForm[id] = updatedAll;
    updatedAll.touched = true;

    let formIsValid = true;

    for (let formValid in updatedForm) {
      formIsValid = updatedForm[formValid].valid && formIsValid;
    }

    this.setState({ loginForm: updatedForm, formValid: formIsValid });
  };
  //Function which invokes when submit button is pressed, checks if loading state is still on, if not it uses validated input values and login process has been started
  submitHandler = (event) => {
    event.preventDefault();

    if (this.props.loading) {
      return (
        <Loader
          className={classes.loader}
          type="Puff"
          color="#fff"
          height="200"
          width="200"
        />
      );
    }
    setTimeout(() => {
      this.props.onAuthFetch(
        this.state.loginForm.email.value,
        this.state.loginForm.password.value
      );
      this.setState((prevstate) => {
        return (
          (prevstate.loginForm.email.value = ""),
          (prevstate.loginForm.password.value = "")
        );
      });
    }, 1000);

    setTimeout(() => {
      window.location.href = `http://localhost:3000/`;
    }, 1500);
  };

  render() {
    let form = [];
    for (let input in this.state.loginForm) {
      form.push({
        id: input,
        config: this.state.loginForm[input],
      });
    }

    return (
      <Aux>
        <div className={classes.LoginComp}>
          <form className={classes.LoginForm} onSubmit={this.submitHandler}>
            <h2 className={classes.loginHeader}>Login</h2>
            {form.map((el) => {
              return (
                <Input
                  isTouched={el.config.touched}
                  invalid={!el.config.valid}
                  key={el.id}
                  elementType={el.config.elementType}
                  elementConfig={el.config.elementConfig}
                  value={el.config.value}
                  changed={(event) => this.inputChangeHandler(el.id, event)}
                />
              );
            })}
            <button
              disabled={!this.state.formValid}
              className={classes.loginbtn}
            >
              <span className={classes.loginspan}>
                {this.props.token !== null ? "Loagout" : "Login"}
              </span>
            </button>
          </form>
        </div>
      </Aux>
    );
  }
}
//Passing state using props property of React. State includes token, loading phase and error

const stateWithProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};
//Passing authentification dispatch function and its needed parameters

const stateDispatchToProps = (dispatch) => {
  return {
    onAuthFetch: (username, password) =>
      dispatch(actions.AUTH_FETCH(username, password)),
  };
};

export default connect(
  stateWithProps,
  stateDispatchToProps
)(withRouter(Logincomp));
