import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Footer from './Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const WeatherIcon = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
`;

const Temperature = styled.div`
  font-size: 24px;
`;

const Description = styled.div`
  font-size: 16px;
  margin-top: 8px;
`;
//cette fonction est une fonction asynchrone qui va chercher les données météo de la ville entrée par l'utilisateur
function Weather({ city }) {
  //on utilise useState pour définir l'état de la météo
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
      );
      const data = response.data;
      console.log(response);
      //on utilise setWeather pour définir l'état de la météo
      setWeather({
        location: data.name,
        icon: data.weather[0].icon,
        temperature: data.main.temp,
        description: data.weather[0].description,
      });
    }

    fetchWeather();
  }, [city]);

  return (
    <Container>
      <Title>{weather && weather.location}</Title>
      {weather && (
        <>
          <WeatherIcon
            src={`https://openweathermap.org/img/w/${weather.icon}.png`}
            alt={weather.description}
          />
          <Temperature>{weather.temperature}°C</Temperature>
          <Description>{weather.description}</Description>
        </>
      )}
      <Footer />
    </Container>
  );
}

export default Weather;
