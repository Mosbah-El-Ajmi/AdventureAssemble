import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  GiBarbedStar,
  GiBeveledStar,
  GiCursedStar,
  GiJusticeStar,
  GiMoebiusStar,
  GiStaryu,
} from "react-icons/gi";
import Confetti from "react-confetti";
import "../css/Rewards.css";

const Recompense = () => {
  const [history, setHistory] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [nextReward, setNextReward] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rewardMessage, setRewardMessage] = useState("");
  const [claimedRewards, setClaimedRewards] = useState(
    JSON.parse(localStorage.getItem("claimedRewards")) || {}
  );
  const selectedPlayerId = localStorage.getItem("joueur_id");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/history/${localStorage.getItem("auth_token")}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = useMemo(() => {
    if (!selectedPlayerId) return history;
    return history.filter(
      (item) => item.id_joueur === parseInt(selectedPlayerId)
    );
  }, [history, selectedPlayerId]);

  useEffect(() => {
    const totalPoints = filteredHistory.reduce(
      (total, item) => total + item.points,
      0
    );
    setTotalPoints(totalPoints);
    calculateRewards(totalPoints);
  }, [filteredHistory]);

  const calculateRewards = (points) => {
    const availableRewards = [
      {
        pointsThreshold: 1000,
        reward: "Bronze Star",
        icon: <GiBarbedStar />,
        color: "bronze",
      },
      {
        pointsThreshold: 2000,
        reward: "Silver Star",
        icon: <GiBeveledStar />,
        color: "silver",
      },
      {
        pointsThreshold: 3000,
        reward: "Gold Star",
        icon: <GiCursedStar />,
        color: "gold",
      },
      {
        pointsThreshold: 4000,
        reward: "Platinum Star",
        icon: <GiJusticeStar />,
        color: "platinum",
      },
      {
        pointsThreshold: 5000,
        reward: "Diamond Star",
        icon: <GiMoebiusStar />,
        color: "diamond",
      },
      {
        pointsThreshold: 6000,
        reward: "Legendary Star",
        icon: <GiStaryu />,
        color: "legendary",
      },
    ];

    const earnedRewards = availableRewards.filter(
      (reward) => points >= reward.pointsThreshold
    );
    const nextReward = availableRewards.find(
      (reward) => points < reward.pointsThreshold
    );

    setRewards(earnedRewards);
    setNextReward(nextReward);
  };

  const handleReceiveReward = (pointsThreshold) => {
    setRewardMessage("Congratulations! You've received a new reward!");
    setShowConfetti(true);
    setIsModalOpen(true);

    const newClaimedRewards = { ...claimedRewards, [pointsThreshold]: true };
    setClaimedRewards(newClaimedRewards);
    localStorage.setItem("claimedRewards", JSON.stringify(newClaimedRewards));

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const earnedRewards = rewards.filter(
    (reward) => claimedRewards[reward.pointsThreshold]
  );

  const resetAchievements = () => {
    localStorage.removeItem("claimedRewards");
    setClaimedRewards({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="reward-container">
      <h1 className="reward-title">Récompenses</h1>
      <p className="reward-total-points">Total Points: {totalPoints}</p>
      {earnedRewards.length > 0 && (
        <div>
          <h2 className="achievement-title">Achievements Unlocked</h2>
          <div className="achievement-icons">
            {earnedRewards.map((reward, index) => (
              <motion.div
                key={index}
                className={`achievement-icon achievement-${reward.color}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 1,
                    stiffness: 80,
                    restDelta: 0.01,
                  },
                }}
              >
                {reward.icon}
              </motion.div>
            ))}
          </div>
        </div>
      )}
      <ul className="reward-list">
        {rewards.map((reward, index) => (
          <motion.li
            key={index}
            className={`reward-item reward-${reward.color}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <span className="reward-text">{reward.reward}</span>
            <span className="reward-icon">{reward.icon}</span>
            {totalPoints >= reward.pointsThreshold &&
              !claimedRewards[reward.pointsThreshold] && (
                <button
                  onClick={() => handleReceiveReward(reward.pointsThreshold)}
                  className="reward-button"
                >
                  Claim Reward
                </button>
              )}
          </motion.li>
        ))}
      </ul>
      {nextReward && (
        <div className="next-reward">
          <h4>Récompense suivante</h4>
          <h6>
            {nextReward.reward} à {nextReward.pointsThreshold} points
          </h6>
        </div>
      )}
      <button onClick={resetAchievements} className="reset-button">
        Réinitialiser les Succès
      </button>
      {isModalOpen && (
        <div className="reward-modal-overlay" onClick={closeModal}>
          <div className="reward-modal">
            <h2>{rewardMessage}</h2>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {showConfetti && <Confetti />}
    </div>
  );
};

export default Recompense;
