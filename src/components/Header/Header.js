import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import classes from "./Header.css";

//Creation of parent component to wrap big Toolbar component
const header = () => {
  return (
    <header className={classes.Header}>
      <Toolbar />
    </header>
  );
};

export default header;
