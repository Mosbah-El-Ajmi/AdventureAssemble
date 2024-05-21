import React, { createContext, useContext, useState, useEffect } from "react";
import { GrScorecard } from "react-icons/gr";
import { GiProgression } from "react-icons/gi";
import axios from "axios";

const GraphiquesContext = createContext();

export const useGraphiques = () => {
  return useContext(GraphiquesContext);
};

export const GraphiquesProvider = ({ children }) => {
  const [graphiquesData, setGraphiquesData] = useState([
    {
      title: "Points",
      color: {
        backGround: "linear-gradient(180deg, blueviolet 0%, blueviolet 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: "",
      value: "",
      png: GrScorecard,
      series: [
        {
          name: "Points",
          data: [],
        },
      ],
    },
    {
      title: "Progression",
      color: {
        backGround:
          "linear-gradient(rgb(255, 158, 2) 0%, rgb(255, 158, 2) 100%)",
        boxShadow: "0px 10px 20px 0px #f9d59b",
      },
      barValue: "",
      value: "",
      png: GiProgression,
      series: [
        {
          name: "Progression",
          data: [],
        },
      ],
    },
  ]);

  useEffect(() => {
    const fetchLatestPoints = async () => {
      try {
        // Fetch data from backend API
        const response = await axios.get(
          "http://localhost:3001/joueur/history" +
            "/" +
            localStorage.getItem("auth_token")
        );
        let totalPoints = 0;
        let totalGames = 0;
        let previousPoints = 0;

        // Clear the existing data arrays
        const newGraphiquesData = [...graphiquesData];
        newGraphiquesData[0].series[0].data = [];
        newGraphiquesData[1].series[0].data = [];

        // Loop through the response data
        response.data.forEach((item) => {
          // Update totalPoints with points from each id_partie
          totalPoints += item.points;
          totalGames++;
          newGraphiquesData[0].series[0].data.push(item.points); // Push points to the data array

          const currentProgress = (item.points / 500) * 100; // Percentage of points out of maximum possible score (500)
          const progression = currentProgress - previousPoints;
          previousPoints = currentProgress;

          // Push progression to the series array for the second object in GraphiquesData
          newGraphiquesData[1].series[0].data.push(progression);
        });

        const averageScore = totalPoints / totalGames;

        // Find the latest id_partie
        const latestPartie = response.data.reduce((latest, item) => {
          return item.id_partie > latest.id_partie ? item : latest;
        }, response.data[0]);

        const latestPoints = latestPartie.points;
        const valuePut = latestPoints.toString();

        // Update first object
        newGraphiquesData[0].value = valuePut;
        const percentage = (latestPoints / 1000) * 100;
        newGraphiquesData[0].barValue = percentage;

        // Update the second object
        const averageScorePercentage = Math.round((averageScore / 500) * 100);
        newGraphiquesData[1].barValue = averageScorePercentage;
        newGraphiquesData[1].value = categorizeValue(averageScorePercentage);

        setGraphiquesData(newGraphiquesData);
      } catch (error) {
        console.error("Error fetching latest points:", error);
      }
    };

    fetchLatestPoints();
  }, []);

  const categorizeValue = (percentage) => {
    if (percentage < 25) {
      return "Décollage!";
    } else if (percentage >= 25 && percentage < 50) {
      return "Allez!";
    } else if (percentage >= 50 && percentage < 80) {
      return "Formidable!";
    } else {
      return "Super!";
    }
  };

  return (
    <GraphiquesContext.Provider value={graphiquesData}>
      {children}
    </GraphiquesContext.Provider>
  );
};
