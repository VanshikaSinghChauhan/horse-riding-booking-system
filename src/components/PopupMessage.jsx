import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHorse } from "@fortawesome/free-solid-svg-icons";
import Confetti from "confetti-js";
import "./popupMessage.css";

const PopupMessage = ({ formData }) => {
  const [showCalendarInvite, setShowCalendarInvite] = useState(false);

  // Initialize confetti effect when showing thank you message
  useEffect(() => {
    if (!showCalendarInvite) {
      const confettiSettings = { target: "confetti-canvas" };
      const confetti = new Confetti(confettiSettings);
      confetti.render();
      // Cleanup confetti after 5 seconds
      setTimeout(() => confetti.clear(), 5000);
    }
  }, [showCalendarInvite]);

  const toggleCalendarInvite = () => {
    setShowCalendarInvite(!showCalendarInvite);
  };

  const formatDate = (dateTime) => {
    if (!(dateTime instanceof Date)) {
      dateTime = new Date(dateTime);
    }
    return dateTime.toLocaleString();
  };

  return (
    <motion.div
      className="popup-wrapper"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="popup-container">
        {!showCalendarInvite ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ color: "#FF4081" }}
            >
              THANK YOU!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Thank you for saddling up with us! We can't wait to see you
              trotting along on{" "}
              <motion.span
                className="selected-horse"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                style={{ color: "#FF4081" }}
              >
                <FontAwesomeIcon icon={faHorse} className="horse-icon" />{" "}
                {formData.selectedHorse.name}
              </motion.span>
              . Get ready for a ride filled with joy and adventure!
            </motion.p>
            <motion.button
              className="button"
              onClick={toggleCalendarInvite}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              SHOW CALENDAR INVITE
            </motion.button>
          </>
        ) : (
          <div className="calendar-info">
            <h2>Your Booking Time</h2>
            <p>{formatDate(formData.dateTime)}</p>
            <motion.button
              className="button"
              onClick={toggleCalendarInvite}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              CLOSE
            </motion.button>
          </div>
        )}
      </div>
      {/* Confetti canvas */}
      {!showCalendarInvite && <canvas id="confetti-canvas" className="confetti-canvas"></canvas>}
    </motion.div>
  );
};

export default PopupMessage;
