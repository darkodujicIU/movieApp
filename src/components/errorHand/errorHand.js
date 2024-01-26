import React from "react";
import Aux from "../../hoc/axxx";
import classes from "./errorHand.css";

//Error handler component with props as parameter which is used to show when clicked if there is a error or not. Classes are changed based on that also
const errorHand = (props) => {
  return (
    <Aux>
      <div className={classes.mark} clicked={props.clicked}>
        {props.clicked ? (
          <div className={classes.error}>{props.children}</div>
        ) : null}
      </div>
    </Aux>
  );
};

export default errorHand;
