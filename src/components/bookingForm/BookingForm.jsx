import React, { useState, useEffect } from "react";
import "./bookingForm.css";
import DateTimePicker from "./DateTimePicker";
import HorseCard from "../landingPage/HorseCard";
import horseData from "../../data/horseData";
import { motion } from "framer-motion";
import PopupMessage from "../PopupMessage";

const BookingForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    dateTime: null,
    selectedHorse: null,
  });

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const handleDateTimeChange = (dateTime) => {
    setFormData({ ...formData, dateTime: new Date(dateTime) });
    setErrors((prevErrors) => ({ ...prevErrors, dateTime: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name" && value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }
    if (name === "email" && /\S+@\S+\.\S+/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
    if (name === "number" && value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, number: "" }));
    }
  };

  const handleSelectHorse = (horse) => {
    setFormData({ ...formData, selectedHorse: horse });
    setErrors((prevErrors) => ({ ...prevErrors, selectedHorse: "" }));
    console.log("Selected Horse:", horse);
  };

  const validateForm = () => {
    let newErrors = {};
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!formData.number.trim()) {
      newErrors.number = "Number is required";
      valid = false;
    }
    if (!formData.dateTime) {
      newErrors.dateTime = "Date and time are required";
      valid = false;
    }
    if (!formData.selectedHorse) {
      newErrors.selectedHorse = "Please select a horse";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setFormSubmitted(true);
    } else {
      setShowErrors(true);
    }
  };

  return (
    <>
      {!formSubmitted ? (
        <div className="booking-form-container glass-effect">
          <div>
            <div className="title-container">
              <h1 className="booking-title">BOOKING FORM</h1>
            </div>
            <form className="form-container" onSubmit={handleSubmit}>
              <div className="form-group text-input">
                <label htmlFor="name">NAME</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {showErrors && errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-group text-input">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {showErrors && errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group text-input">
                <label htmlFor="number">NUMBER</label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                />
                {showErrors && errors.number && <span className="error">{errors.number}</span>}
              </div>
              <DateTimePicker onChange={handleDateTimeChange} />
              {showErrors && errors.dateTime && <span className="error error-time">{errors.dateTime}</span>}
              <motion.button
                className="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                SUBMIT
              </motion.button>
            </form>
          </div>
          <div>
            <HorseCard
              horses={horseData}
              text="PICK A FAVOURITE!"
              horseHeading={true}
              onSelectHorse={handleSelectHorse}
              selectable={true}
            />
            {showErrors && errors.selectedHorse && <span className="error error-horse">{errors.selectedHorse}</span>}
          </div>
        </div>
      ) : (
        <div>
          <PopupMessage formData={formData} />
        </div>
      )}
    </>
  );
};

export default BookingForm;
