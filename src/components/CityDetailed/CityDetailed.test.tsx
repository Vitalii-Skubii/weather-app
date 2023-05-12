import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CityDetailed } from './CityDetailed';

const mockCity = {
  id: 1,
  name: 'Paris',
  weather: [{ description: 'Sunny', icon: 'sun' }],
  wind: { speed: 10, deg: 180 },
  main: { temp: 25, feels_like: 28, pressure: 1012, humidity: 70 },
};

describe('CityDetailedWeather', () => {
  test('should render city name and temperature', () => {
    render(<CityDetailed data={mockCity} />);

    const cityName = screen.getByText(mockCity.name);
    const temperature = screen.getByText(`${Math.round(mockCity.main.temp)}°C`);

    expect(cityName).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
  });

  test('should render feels like, wind, humidity, and pressure', () => {
    render(<CityDetailed data={mockCity} />);

    const feelsLike = screen.getByText(`feels like: ${Math.round(mockCity.main.feels_like)}°C`);
    const wind = screen.getByText(`wind: ${Math.round(mockCity.wind.speed)} km/h`);
    const humidity = screen.getByText(`humidity: ${mockCity.main.humidity}%`);
    const pressure = screen.getByText(`pressure: ${mockCity.main.pressure}mb`);

    expect(feelsLike).toBeInTheDocument();
    expect(wind).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
    expect(pressure).toBeInTheDocument();
  });
});
