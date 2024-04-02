import React from "react";
import "../css/Container.css";
import MainContainer from "./MainContainer";
import TopContainer from "./TopContainer";

function Container() {
  return (
    <div className="dashContainer">
      <TopContainer />
      <MainContainer />
    </div>
  );
}

export default Container;