import React, { Component } from "react";
import Aux from "../hoc/axxx";
import ErrorHandCont from "../components/errorHand/errorHand";
import classes from "./errorWithHandler.css";

//Creating and exporting error handler in order to use it as a parent of Trailer component if Youtube trailer does not exist
const errorWithHandler = (WrappedComponent, axios) => {
  return class extends Component {
    //Delcaring initial error state
    state = {
      error: null,
    };

    componentWillMount() {
      this.req = axios.interceptors.request.use((el) => {
        this.setState({ error: null });
        return el;
      });

      this.res = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.req);
      axios.interceptors.response.eject(this.res);
    }

    changeError = () => {
      this.setState({ error: null });
    };

    render() {
      //Render Error Handler which includes error message if error is true or null if error does not exist
      return (
        <Aux>
          <ErrorHandCont clicked={this.state.error}>
            {this.state.error ? this.state.error.message : null}
            <button className={classes.Buton} onClick={this.changeError}>
              Remove Error
            </button>
          </ErrorHandCont>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default errorWithHandler;
