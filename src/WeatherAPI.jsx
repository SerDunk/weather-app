import axios from "axios";

const searchWeather = async (lat, long) => {
  const result = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: long,
      current_weather: true,
    },
  });
  return result.data.current_weather;
};

export default searchWeather;
