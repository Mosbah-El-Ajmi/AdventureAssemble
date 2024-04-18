import React from "react";
import "../css/Container.css";
import Graphique from "./Graphiques";
import Table from "./Table";

function Container() {
  return (
    <div className="dashContainer">
      <h1>DASHBOARD</h1>
      <h3>Graphiques et Statistiques</h3>
      <Graphique />
      <Table />
    </div>
  );
}

export default Container;
