import { GrScorecard } from "react-icons/gr";
import { GiProgression } from "react-icons/gi";

export const GraphiquesData = [
  {
    title: "Points",
    color: {
      backGround: "linear-gradient(180deg,	#BB67FF 0%, #C484F3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 20,
    value: "4",
    png: GrScorecard,
    series: [
      {
        name: "Points",
        data: [1, 4, 3, 0, 6, 2, 4],
      },
    ],
  },
  {
    title: "Progression",
    color: {
      backGround: "linear-gradient(180deg, #ff919D 0%, #fc929d 100%)",
      boxShadow: "0px 10px 20px 0px #fdc0d7",
    },
    barValue: 80,
    value: "Super",
    png: GiProgression,
    series: [
      {
        name: "Progression",
        data: [10, 100, 50, 70, 80, 30, 80],
      },
    ],
  },
];
