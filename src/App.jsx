import "./index.css";
import searchWeather from "./WeatherAPI";
import GeoAPI from "./GeoAPI";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";


function App() {

  const [term,setTerm]=useState("");

  const getCoordinates =async (term)=>{
    const coordinates=await GeoAPI(term);
    return coordinates
  }
  const getWeather = async (lat,lon)=>{
    const weather = await searchWeather(lat, lon);
    console.log(weather)
  }

    const fetchWeather = async (term)=>{
      if (term){
        const {lat,lng}=await getCoordinates(term);
        await getWeather(lat,lng);
      }

    }

  
  return <div><SearchBar term={term} setTerm={setTerm} onSubmit={fetchWeather} /></div>;
}

export default App;
