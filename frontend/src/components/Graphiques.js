import React from "react";
import "../css/Graphique.css";
import { GraphiquesData } from "../data/graData";
import Carte from "./Carte";
const Graphiques = () => {
  return (
    <div className="Graphiques">
      {GraphiquesData.map((carte, id) => {
        return (
          <div className="parentContainer">
            <Carte
              title={carte.title}
              color={carte.color}
              barValue={carte.barValue}
              value={carte.value}
              png={carte.png}
              series={carte.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Graphiques;
