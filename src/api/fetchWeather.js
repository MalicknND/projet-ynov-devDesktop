import axios from 'axios';
//first step like all those apis i save the key and URl
const url = process.env.REACT_APP_OPENWEATHERMAP_API_URL;
const key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

//second step i create a function that will fetch the data from the API

const fetchWeather = async (query) => {
  const { data } = await axios.get(url, {
    params: {
      //third step i pass the query that is the city name
      q: query,
      units: 'metric', //these are the supported in the APi
      APPID: key,
    },
  });
  //fourth step i return the data
  return data;
};

export default fetchWeather;
