"use client"
import React, { useState } from 'react';
import Header from '../Header/header';
import NavBar from '../NavBar/navBar';
import Footer from '../Footer/footer';
import DatePicker from 'react-datepicker';
import style from './travel-planner.module.css';
import homePageStyle from '../home-page.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import FlightSearch from '../flight-search/flight-search';
import FlightDetails from '../flight-details/FlightDetails';

const TravelPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedReturnDate, setReturnDate] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    originCity: '',
    destinationCity: '',
  });

  const { originCity, destinationCity } = formData;

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // if((isChecked && selectedReturnDate || !isChecked)){

    if (originCity && destinationCity && selectedDate) {
      if ((isChecked && selectedReturnDate) || (!isChecked)) {
        setSubmitted(true);
      }
      else {
        alert("Please provide the return date");
      }
    }
    else
      alert("Please fill the valid details");
    console.log('submitted', submitted, 'n', selectedReturnDate)
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleReturnDate = (date: any) => {
    setReturnDate(date);
  };

  console.log('selected date', selectedDate, selectedReturnDate);
  console.log('checked', isChecked);

  return (
    <>
      <Header />
      <NavBar />
      <div className={homePageStyle.container}>
        <h1 className={homePageStyle.headerMsg}>Plan your next trip now!</h1>
        <div className={style.cardScroll}>
        <div className={style.userInputContainer}>
          <label>
            Want to book a return ticket?
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
          <br />
          <div className={style.datePickerContainer}>
            <label>Select a travel date: </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
            // Add any other necessary props
            />
          </div>
          {isChecked && (
            <div className={style.datePickerContainer}>
              <label>Select a return date: </label>
              <DatePicker
                selected={selectedReturnDate}
                onChange={handleReturnDate}
              // Add any other necessary props
              />
            </div>
          )}

          {/* onSubmit={handleSubmit} */}
          <form >

            <label className={style.userCityInput}>
              Origin City:
              <input
                type="text"
                name="originCity"
                value={originCity}
                onChange={handleChange}
                required
                className={style.originCityInput}
              />
            </label>

            <label className={style.userCityInput}>
              Destination City:
              <input
                type="text"
                name="destinationCity"
                value={destinationCity}
                onChange={handleChange}
                required
                className={style.destCityInput}
              />
            </label>
          </form>
          <button className={`${style.submitButton} ${homePageStyle.primaryButton}`} onClick={handleSubmit}>Find Flights</button>
        </div>
        <FlightSearch />
        {submitted &&
          <FlightDetails selectedDate={selectedDate} isChecked={isChecked} formData={formData} />
        }
      </div>
      </div>
      <Footer />
    </>
  );
};

export default TravelPlanner;
