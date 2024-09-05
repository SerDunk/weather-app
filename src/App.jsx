import "./index.css";
import searchWeather from "./WeatherAPI";
import GeoAPI from "./GeoAPI";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";


function App() {

  const weatherCodes={
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light intensity",
    53: "Drizzle: Moderate intensity",
    55: "Drizzle: Dense intensity",
    56: "Freezing Drizzle: Light intensity",
    57: "Freezing Drizzle: Dense intensity",
    61: "Rain: Slight intensity",
    63: "Rain: Moderate intensity",
    65: "Rain: Heavy intensity",
    66: "Freezing Rain: Light intensity",
    67: "Freezing Rain: Heavy intensity",
    71: "Snow fall: Slight intensity",
    73: "Snow fall: Moderate intensity",
    75: "Snow fall: Heavy intensity",
    77: "Snow grains",
    80: "Rain showers: Slight intensity",
    81: "Rain showers: Moderate intensity",
    82: "Rain showers: Violent intensity",
    85: "Snow showers: Slight intensity",
    86: "Snow showers: Heavy intensity",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  }
  
  const [term,setTerm]=useState("");

  const [weatherDesc,setWeatherDesc]=useState("");
  const [temp,setTemp]=useState(null);
  

  const getCoordinates =async (term)=>{
    const coordinates=await GeoAPI(term);
    return coordinates
  }
  const getWeather = async (lat,lon)=>{
    const weather = await searchWeather(lat, lon);
    const {weathercode}=weather;
    const {temperature}=weather;
    console.log(weather)
    return {weathercode,temperature};
  }



    const fetchWeather = async (term)=>{
      if (term){
        const coordinates=await getCoordinates(term);
        if(coordinates==="Not Found"){
          setWeatherDesc("Not Found");
          setTemp(null)
        }
        else{
          const weather=await getWeather(coordinates.lat,coordinates.lng);
          const {weathercode,temperature}=weather;
          const weatherDesc=weatherCodes[weathercode];
          setTemp(temperature);
          setWeatherDesc(weatherDesc);
        }
        
      }

    }

  
  return <div>
    <SearchBar term={term} setTerm={setTerm} onSubmit={fetchWeather} />
  {weatherDesc}
  {temp!==null && <div>{temp}°C</div>}
  </div>;
}

export default App;
