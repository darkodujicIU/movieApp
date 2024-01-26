import React from "react";
import classes from "./SortedByComp.css";
import Aux from "../../hoc/axxx";
import { IoIosPlay } from "react-icons/io";
//Creation of sorted movie component which has props as parameter and which will be reused in Sorted Container including its onClick function. Inline style of this component has been added including url of an image
const SortedByComp = (props) => {
  return (
    <Aux>
      <div className={classes.SortedByComp}>
        <div
          className={classes.SortedByDetail}
          onClick={props.clicked}
          key={props.id}
          style={{
            background: ` linear-gradient(20deg, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0) 70%) no-repeat center bottom , url(${props.image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <IoIosPlay className={classes.realicon} />
        </div>
        <span className={classes.sale}>HD</span>
        <h3 className={classes.sortedHeaderc}>
          <span className={classes.spanc}>{props.name}</span>
        </h3>
      </div>
    </Aux>
  );
};

export default SortedByComp;
