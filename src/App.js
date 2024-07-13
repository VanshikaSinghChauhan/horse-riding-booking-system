import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingForm from "./components/bookingForm/BookingForm";
import LandingPage from "./components/landingPage/LandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="landingPage-container">
                <LandingPage />
              </div>
            }
          />
          <Route
            path="/booking"
            element={
              <div className="bookingForm-wrapper">
                <BookingForm />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
