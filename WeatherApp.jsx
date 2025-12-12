import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "0fc36dfceaf84690a0481515251212"; // <-- Replace with your key

  const getWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found. Try another!");
      setWeather(null);
    }
  };

  return (
    <div className="weather-page">
      <h1 className="title">🌦 Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>
            {weather.location.name}, {weather.location.region}
          </h2>
          <h4>{weather.location.country}</h4>

          <img src={weather.current.condition.icon} alt="icon" />

          <h1>{weather.current.temp_c}°C</h1>
          <h3>{weather.current.condition.text}</h3>

          <p><b>Humidity:</b> {weather.current.humidity}%</p>
          <p><b>Wind:</b> {weather.current.wind_kph} kph</p>
          <p><b>Pressure:</b> {weather.current.pressure_mb} mb</p>
          <p><b>Feels Like:</b> {weather.current.feelslike_c}°C</p>
          <p><b>UV:</b> {weather.current.uv}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
