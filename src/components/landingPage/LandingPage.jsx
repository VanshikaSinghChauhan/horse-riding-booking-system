import React from "react";
import './landingPage.css';
import {motion} from 'framer-motion';
import horseData from "../../data/horseData";
import HorseCard from './HorseCard';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking');
  };

  return ( 
    <>
    <div className="container">
    <motion.div
          className="heading-container"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <p className="heading-text">
            GALLOP & GO: YOUR ULTIMATE HORSE RIDING ADVENTURE
          </p>
        </motion.div>
    <div className="quote-container"><p className="quote-text">"SADDLE UP FOR A JOURNEY WHERE EVERY RIDE TELLS A STORY.BOOK YOUR ADVENTURE TODAY!"</p></div>
    <div><motion.button className="button" whileHover={{
          scale: 1.1, // Scale up slightly on hover
          boxShadow: '0 6px 6px rgba(0, 0, 0, 0.25)', // Larger shadow on hover
          y: -2 // Lift button slightly on hover
        }}
        transition={{ type: 'spring', stiffness: 300 }} onClick={handleBookingClick}>BOOK NOW</motion.button></div>
        <HorseCard horses={horseData} />
    </div>
    </>
  );

};

export default LandingPage;
