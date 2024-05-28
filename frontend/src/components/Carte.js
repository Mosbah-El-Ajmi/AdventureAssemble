import React, { useState, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../css/Carte.css";
import { GrClose } from "react-icons/gr";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Carte = ({ graphiquesData }) => {
  const [expanded, setExpanded] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const selectedPlayerId = localStorage.getItem("joueur_id");

  useEffect(() => {
    if (selectedPlayerId) {
      // Fetch player name based on selected player ID
      axios
        .get(
          `https://backendgg.ddns.net/joueurs/id/${selectedPlayerId}/${localStorage.getItem(
            "auth_token"
          )}`
        )
        .then((response) => {
          if (response.data.length > 0) {
            setPseudo(response.data[0].pseudo);
          }
        })
        .catch((error) => {
          console.error("Error fetching player name:", error);
        });

      // Fetch player history based on selected player ID
      axios
        .get(
          `https://backendgg.ddns.net/history/${localStorage.getItem("auth_token")}`
        )
        .then((response) => {
          if (response.data.length > 0) {
            const fetchedTimestamps = response.data.map(
              (item) => item.timestamp
            );
            setTimestamps(fetchedTimestamps);
          }
        })
        .catch((error) => {
          console.error("Error fetching player history:", error);
        });
    }
  }, [selectedPlayerId]);

  return (
    <LayoutGroup>
      {expanded ? (
        <ExpandedCard
          param={graphiquesData}
          setExpanded={() => setExpanded(false)}
          pseudo={pseudo}
          timestamps={timestamps}
        />
      ) : (
        <CompactCard
          param={graphiquesData}
          setExpanded={() => setExpanded(true)}
          pseudo={pseudo}
        />
      )}
    </LayoutGroup>
  );
};

function CompactCard({ param, setExpanded, pseudo }) {
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
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
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
          <span>{pseudo}</span>
        </div>
      </motion.div>{" "}
    </LayoutGroup>
  );
}

function ExpandedCard({ param, setExpanded, pseudo, timestamps }) {
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
        categories: param.series[0].data.map((_, index) => {
          // Assuming the timestamps array is correctly ordered
          const timestamp = new Date();
          timestamp.setHours(timestamp.getHours() + index);
          return timestamp.toISOString();
        }),
      },
      yaxis: {
        min: undefined,
        max: undefined,
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
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
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
      <span>{pseudo}</span>
    </motion.div>
  );
}

export default Carte;
