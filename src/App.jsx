import "./index.css";
import searchWeather from "./WeatherAPI";
import GeoAPI from "./GeoAPI";
import { useEffect } from "react";

function App() {
  const getCoordinates =async ()=>{
    const coordinates=await GeoAPI("Hyderabad");
    return coordinates
  }


  const getWeather = async (lat,lon)=>{
    const weather = await searchWeather(lat, lon);
    console.log(weather)
  }
  useEffect(() => {
    const fetchWeather = async ()=>{
      const {lat,lng}=await getCoordinates();
      await getWeather(lat,lng);
    }

    fetchWeather()
  },[]);
  
  return <div>App</div>;
}

export default App;
