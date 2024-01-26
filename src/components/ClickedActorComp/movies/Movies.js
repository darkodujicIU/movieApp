import React from "react";
import classes from "./Movies.css";
import Aux from "../../../hoc/axxx";
//Creation of Movies component which has passed props as parameter
const Movies = (props) => {
  //Inline styles containing URL path that is passed throuh props, and this styles  are passed into rendered component
  let style = {
    backgroundImage: "url(" + props.path,
    backgroundSize: "cover",
  };
  return (
    <Aux>
      <div
        className={classes.card}
        key={props.id}
        style={style}
        onClick={props.clicked}
      >
        <h4 className={classes.movDetHead}>{props.title}</h4>
      </div>
    </Aux>
  );
};

export default Movies;
