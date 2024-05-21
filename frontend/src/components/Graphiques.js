import React from "react";
import "../css/Graphique.css";
import { GraphiquesProvider, useGraphiques } from "../data/graData";
import Carte from "./Carte";
const Graphiques = () => {
  return (
    <GraphiquesProvider>
      <MainComponent />
    </GraphiquesProvider>
  );
};

const MainComponent = () => {
  const graphiquesData = useGraphiques();

  return (
    <div>
      <div className="Graphiques">
        <Carte graphiquesData={graphiquesData[0]} />
        <Carte graphiquesData={graphiquesData[1]} />
      </div>
    </div>
  );
};

export default Graphiques;
