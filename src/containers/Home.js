import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";

const weatherKey = `3206233bce5e109446709fd59f166d4f`;
function Home() {
  const history = useHistory();
  console.log("history", history);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Tokyo");
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`
      )
      .then(function(response) {
        const weather = response.data;
        setWeatherData(weather);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, [city]);

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
    }
  }, [history]);

  const {
    cloudiness,
    currentTemp,
    highTemp,
    humidity,
    lowTemp,
    weatherType,
    windSpeed
  } = useMemo(() => {
    let cloudiness = "";
    let currentTemp = "";
    let highTemp = "";
    let humidity = "";
    let lowTemp = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = `${weatherData.clouds.all}%`;
      currentTemp = `${weatherData.main.temp}`;
      highTemp = `${weatherData.main.temp_max}`;
      humidity = `${weatherData.main.humidity}%`;
      lowTemp = `${weatherData.main.temp_min}`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} km/h`;
    }

    return {
      cloudiness,
      currentTemp,
      highTemp,
      humidity,
      lowTemp,
      weatherType,
      windSpeed
    };
  }, [weatherData]);

  /* Display:
Weather Type (ex. Cloudy)
Current Temperature
High Temperature
Low Temperature
Cloudiness
Humidity
Wind Speed
*/
  console.log("weatherData", weatherData);
  return (
    <>
      <Header />
      <main className="Home">
        <h2>Weather in {city} </h2>
        <div classname="Weather Info">
          <p>Weather Type:{weatherType} </p>
          <p>Current Temperature: {currentTemp}</p>
          <p>High Temperature: {highTemp}</p>
          <p>Low Temperature: {lowTemp}</p>
          <p>Cloudiness: {cloudiness}</p>
          <p>Humidity: {humidity}</p>
          <p>Wind Speed: {windSpeed}</p>
        </div>
      </main>
    </>
  );
}

export default Home;
