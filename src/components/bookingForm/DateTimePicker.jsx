import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.css';

const DateTimePicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Format the output date string for onChange
    const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    onChange(formattedDateTime);
  };

  const filterTime = (time) => {
    const selectedDay = selectedDate.getDay();
    const selectedTime = new Date(time);
    const hours = selectedTime.getHours();
    
    if (selectedDay === 6) {
      // Allow only time slots from 3pm (15:00) to 12am (00:00) on Saturdays
      return hours >= 15 || hours === 0;
    }
    
    // Allow all time slots on other days
    return true;
  };

  return (
    <div className="form-group">
      <label htmlFor="datetime-picker">CHOOSE DATE AND TIME</label>
      <div id="datetime-picker">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          timeIntervals={60} // 1-hour intervals
          timeCaption="Time"
        //   showTimeInput
          filterTime={filterTime} 
          customInput={<CustomInput />}// Apply time filter based on selected date
           popperPlacement="bottom-start"
        />
      </div>
    </div>
  );
};

const CustomInput = ({ value, onClick }) => (
  <input
    type="text"
    value={value}
    onClick={onClick}
    readOnly // Disable manual input
    style={{
      cursor: 'pointer', // Show pointer cursor on hover
      width: '100%', // Expand to fill container width
      padding: '8px', // Add padding for visual comfort
      border: '1px solid #ccc', // Add border for visual distinction
      borderRadius: '4px', // Rounded corners
      backgroundColor: '#fff', // White background
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
      boxSizing: 'border-box', // Include padding and border in total width/height
    }}
  />
);


export default DateTimePicker;
