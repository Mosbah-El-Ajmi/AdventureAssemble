import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../css/Carte.css";
import { GrClose } from "react-icons/gr";
import ReactApexChart from "react-apexcharts";

const Carte = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <LayoutGroup>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </LayoutGroup>
  );
};

function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <LayoutGroup>
      <motion.div
        className="CompactCard"
        style={{
          background: param.color.backGround,
          boxShadow: param.color.boxShadow,
        }}
        onClick={setExpanded}
      >
        <div className="radialBar">
          <CircularProgressbar
            value={param.barValue}
            text={`${param.barValue}%`}
          />
          <span>{param.title}</span>
        </div>
        <div className="detail">
          <Png />
          <span>{param.value}</span>
          <span>Dernier Partie</span>
        </div>
      </motion.div>{" "}
    </LayoutGroup>
  );
}

function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2024-04-15T00:00:00.000Z",
          "2024-04-15T01:30:00.000Z",
          "2024-04-15T02:30:00.000Z",
          "2024-04-15T03:30:00.000Z",
          "2024-04-15T04:30:00.000Z",
          "2024-04-15T05:30:00.000Z",
          "2024-04-15T06:30:00.000Z",
        ],
      },
    },
  };
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
    >
      <div
        style={{
          alignSelf: "flex-end",
          cursor: "pointer",
          color: "white",
        }}
      >
        <GrClose onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <ReactApexChart
          series={param.series}
          options={data.options}
          type="area"
        />
      </div>
      <span>Dernier Partie</span>
    </motion.div>
  );
}

export default Carte;
