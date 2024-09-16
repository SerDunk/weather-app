import "./index.css";
import searchWeather from "./WeatherAPI";
import GeoAPI from "./GeoAPI";
import { useState } from "react";
import SearchBar from "./SearchBar";

import Clear from "../assets/clear.svg";
import Cloudy from "../assets/cloudy.svg";
import Rain from "../assets/rain.svg";
import Storm from "../assets/storm.svg";
import NightCloud from "../assets/night-cloudy.svg";
import SunnyCloud from "../assets/sunny-cloudy.svg";

function App() {
  const weatherCodes = {
    0: { description: "Clear sky", image: Clear },
    1: { description: "Mainly clear", image: Clear },
    2: { description: "Partly cloudy", image: SunnyCloud },
    3: { description: "Overcast", image: Cloudy },
    45: { description: "Fog", image: Cloudy },
    48: { description: "Depositing rime fog", image: Cloudy },
    51: { description: "Drizzle: Light intensity", image: Rain },
    53: { description: "Drizzle: Moderate intensity", image: Rain },
    55: { description: "Drizzle: Dense intensity", image: Rain },
    56: { description: "Freezing Drizzle: Light intensity", image: Rain },
    57: { description: "Freezing Drizzle: Dense intensity", image: Rain },
    61: { description: "Rain: Slight intensity", image: Rain },
    63: { description: "Rain: Moderate intensity", image: Rain },
    65: { description: "Rain: Heavy intensity", image: Rain },
    66: { description: "Freezing Rain: Light intensity", image: Rain },
    67: { description: "Freezing Rain: Heavy intensity", image: Rain },
    71: { description: "Snow fall: Slight intensity", image: Cloudy },
    73: { description: "Snow fall: Moderate intensity", image: Cloudy },
    75: { description: "Snow fall: Heavy intensity", image: Cloudy },
    77: { description: "Snow grains", image: Cloudy },
    80: { description: "Rain showers: Slight intensity", image: Rain },
    81: { description: "Rain showers: Moderate intensity", image: Rain },
    82: { description: "Rain showers: Violent intensity", image: Rain },
    85: { description: "Snow showers: Slight intensity", image: Cloudy },
    86: { description: "Snow showers: Heavy intensity", image: Cloudy },
    95: { description: "Thunderstorm: Slight or moderate", image: Storm },
    96: { description: "Thunderstorm with slight hail", image: Storm },
    99: { description: "Thunderstorm with heavy hail", image: Storm },
  };

  const [term, setTerm] = useState("");

  const [weatherDesc, setWeatherDesc] = useState("");
  const [temp, setTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(Clear);

  const getCoordinates = async (term) => {
    const coordinates = await GeoAPI(term);
    console.log(coordinates);
    return coordinates;
  };
  const getWeather = async (lat, lon) => {
    const weather = await searchWeather(lat, lon);
    const { weathercode } = weather;
    const { temperature } = weather;
    console.log(weather);
    return { weathercode, temperature };
  };

  const fetchWeather = async (term) => {
    if (term) {
      const coordinates = await getCoordinates(term);
      if (coordinates === "Not Found") {
        setWeatherDesc("Not Found");
        setTemp(null);
        setWeatherIcon(Clear);
      } else {
        const weather = await getWeather(coordinates.lat, coordinates.lng);
        const { weathercode, temperature } = weather;
        const weatherDesc = weatherCodes[weathercode].description;
        const weatherIcon = weatherCodes[weathercode].image;
        setTemp(temperature);
        setWeatherDesc(weatherDesc);
        setWeatherIcon(weatherIcon);
      }
    }
  };

  return (
    <div className="bg-slate-500 min-h-screen">
      <SearchBar term={term} setTerm={setTerm} onSubmit={fetchWeather} />
      {weatherIcon && <img src={weatherIcon} />}
      {weatherDesc}
      {temp !== null && <div>{temp}°C</div>}
    </div>
  );
}

export default App;
