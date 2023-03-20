import React, { useState } from 'react';
import fetchWeather from './api/fetchWeather';
import './App.css';
import Footer from './components/Footer';
import styled from 'styled-components';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);

  console.log(window.electron);

  const search = async (e) => {
    //that is calling via an await function the query that is passed
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  };

  return (
    <div className="main-container">
      <Search
        type="text"
        placeholder="Enter City Name..."
        value={query}
        /** Direct State ge Query Send Madadhu*/ onChange={(e) =>
          setQuery(e.target.value)
        }
        onKeyPress={search}
      ></Search>
      {weather.main && (
        <City className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <CityTemp className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </CityTemp>
          <CityInfo className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].desccription}
            ></img>
            <p>{weather.weather[0].description}</p>
          </CityInfo>
        </City>
      )}
      <Footer />
    </div>
  );
}
const Search = styled.input`
  outline: none;
  padding: 15px 6.8%;
  border-radius: 20px;
  border: none;
  margin-bottom: 3%;
  background: rgba(250, 250, 250, 0.85);
`;

const City = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 8%;
  border-radius: 20px;
  background: rgba(218, 213, 213, 0.85);
  box-shadow: 10px 10px 5px 0px rgba(15, 15, 15, 0.404);

  h2 {
    font-size: 2em;
  }
  h2 sup {
    padding: 0.2em 0.6em;
    margin-left: 0.2em;
    border-radius: 30px;
    color: #fff;
    background: #ff8c00;
  }
`;
const CityTemp = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin-top: 10px;
  color: #1e2432;
  text-align: center;
  sup {
    font-size: 0.5em;
  }
`;

const CityInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  img {
    margin-top: 10px;
    width: 100px;
    height: 100px;
  }
`;

export default App;
