import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WeatherCard from "../src/components/WeatherCard";
import FiveDay from "../src/components/FiveDay";
import HourlyWeather from "../src/components/HourlyWeather";
import TodayHighlights from "../src/components/TodayHighlights";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import Footer from "./components/Footer";
import Map from "./components/Map";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London'); // Default city is set to London
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [searchPosition, setSearchPosition] = useState(null);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your OpenWeatherMap API key
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => {
        setAirQualityData(response.data.list[0]);
      })
      .catch(error => console.error('Error fetching the air quality data:', error));
  };

  const fetchWeatherData = (city) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response =>{
        if (!response.ok) {
          alert("Invalid city name");
          throw new Error("City not found");
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
          .then(response => {
            setFiveDayForecast(response.data);
            setHourlyForecast(response.data);
          })
          .catch(error => console.error('Error fetching the 5-day forecast data:', error));
      })
      .catch(error => console.error('Error fetching the weather data:', error));
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  // Function to handle location updates from the SearchBar component
  const handleLocationSearch = (position) => {
    setSearchPosition(position);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Router>
      <div className="App">
        <Navbar onSearch={handleSearch}/>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
      <div className="container mx-auto p-5 flex flex-col w-full md:flex-row justify-center overflow-x-auto">
        {weatherData && airQualityData && (
          <div className="flex flex-col w-full md:w-[100%] overflow-x-auto">
            <div className="mt-2 mb-5 w-full">
              {hourlyForecast && <HourlyWeather forecastData={hourlyForecast} />}
            </div>
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              {/* TodayHighlights */}
              <div className="w-full lg:w-2/3">
                <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
              </div>
              <div className="w-full lg:w-1/3 sm:max-w-md mx-auto">
                <WeatherCard weatherData={weatherData} />
              </div>
              {/* FiveDay Forecast */}
              <div className="w-full sm:max-w-md mx-auto lg:w-1/3 mt-4 lg:mt-0">
                {fiveDayForecast && <FiveDay forecastData={fiveDayForecast} />}
              </div>
            </div>

            <div>
              {/* Search bar component */}
              <SearchBar onSearch={handleLocationSearch} />
              {/* Map component */}
              <Map searchPosition={searchPosition} />
            </div>

            <div><Footer /></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
