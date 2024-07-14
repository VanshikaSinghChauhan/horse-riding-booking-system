import React, { useState } from "react";
import { motion } from "framer-motion";
import "./horseCard.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HorseCard = ({
  horses,
  text = "CHECK OUT OUR BEAUTIES!",
  horseHeading,
  onSelectHorse,
  selectable,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedHorseId, setSelectedHorseId] = useState(null);

  const nextHorse = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === horses.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevHorse = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? horses.length - 1 : prevIndex - 1
    );
  };

  const selectHorse = () => {
    const selectedHorse = horses[currentIndex];
    setSelectedHorseId(selectedHorse.id);
    if (onSelectHorse) {
      onSelectHorse(selectedHorse);
    }
  };

  let className;
  if (text === "PICK A FAVOURITE!") {
    className = "check-out-text animated-text horseHeading";
  } else {
    className = "check-out-text animated-text";
  }

  return (
    <div className="horse-card">
      <div className="image-container">
        <motion.p
          className={className}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          {text}
        </motion.p>
        <motion.img
          src={horses[currentIndex].image}
          alt={horses[currentIndex].name}
          whileHover={selectable ? { scale: 1.05 } : {}}
          animate={
            selectable && selectedHorseId === horses[currentIndex].id
              ? { scale: 1.05 }
              : {}
          }
          className={
            selectable && selectedHorseId === horses[currentIndex].id
              ? "selected"
              : ""
          }
          onClick={selectable ? selectHorse : null}
        />
        <h2 className="horse-name">{horses[currentIndex].name}</h2>
      </div>
      <motion.button
        className="nav-button prev-button"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 6px 6px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={prevHorse}
      >
        <FaChevronLeft />
      </motion.button>
      
      <motion.button
        className="nav-button next-button"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 6px 6px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={nextHorse}
      >
        <FaChevronRight />
      </motion.button>
    </div>
  );
};

export default HorseCard;
