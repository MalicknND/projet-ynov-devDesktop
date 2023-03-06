import React, { useState } from 'react';
import styled from 'styled-components';
import Weather from './components/Weather';

function App() {
  const [city, setCity] = useState('');

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <Container>
      <Title>Weather App</Title>
      <Input
        type="text"
        placeholder="Enter a city name"
        value={city}
        onChange={handleCityChange}
      />
      {city && <Weather city={city} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 24px;
`;

const Input = styled.input`
  font-size: 24px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 24px;
`;

export default App;
