import Aux from "../../hoc/axxx";
import React from "react";
import Header from "../Header/Header";
import Sidedrawer from "../Sidedrawer/Sidedrawer";
//Creation of layoud parent component that gathers Header and Sidedrawer, and any desired children enter through props for better CSS customization
const layout = (props) => {
  return (
    <Aux>
      <div>
        <Header />
        <Sidedrawer />
      </div>
      <main>{props.children}</main>
    </Aux>
  );
};

export default layout;
