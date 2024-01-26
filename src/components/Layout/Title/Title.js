import React from "react";
import classes from "./Title.css";
import HeadingHead from "./HeadingHead";
//Creating reusable title component with passed class and lav props
const title = (props) => {
  return (
    <HeadingHead classes={classes.header2} lav={classes.lav}></HeadingHead>
  );
};

export default title;
