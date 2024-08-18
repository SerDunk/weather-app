import "./index.css";
import searchWeather from "./WeatherAPI";
import GeoAPI from "./GeoAPI";
import { useEffect } from "react";

function App() {
  const city = "Hyderabad";
  const coordinates = GeoAPI(city);
  console.log(coordinates);
  return <div>App</div>;
}

export default App;
