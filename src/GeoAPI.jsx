import axios from "axios";

const GeoAPI = async (city) => {
  const coordinates = await axios.get(
    "https://api.opencagedata.com/geocode/v1/json",
    {
      params: {
        q: city,
        key: "9a000f52ae084210954ff71a1793e144",
      },
    }
  );
  return coordinates.data.results[0].geometry;
};

export default GeoAPI;
