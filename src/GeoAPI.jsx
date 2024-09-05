import axios from "axios";

const GeoAPI = async (city) => {
  try{
    const coordinates = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: city,
          key: "9a000f52ae084210954ff71a1793e144",
        },
      }
    );
    if(coordinates.data.results.length === 0){
      return "Not Found";
    }
    return coordinates.data.results[0].geometry;
  }
  catch(error){
    return "Try later";
  }
}


export default GeoAPI;
