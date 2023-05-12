import React, { useEffect } from 'react';
import { CityDetailed } from '../../components/CityDetailed/CityDetailed';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_CITIES } from '../../constants/cities';
import { Button, CircularProgress, Container } from '@mui/material';
import { RoutePath } from '../../constants/routesConfig';
import { CityForecast } from '../../components/CityForecast/CityForecast';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCityForecast } from '../../redux/reducers/ActionCreator';

export const DetailedWeather = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const dispatch = useAppDispatch();

  const { cityForecast, isLoading } = useAppSelector((state) => state.citiesWeatherReducer);

  const addNewLocation = () => {
    if (location?.state?.weather) {
      const citiesLocal = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CITIES) || '[]');
      if (citiesLocal.find((city: string) => city === location?.state?.weather.name)) return;
      citiesLocal.push(location?.state?.weather.name);
      localStorage.setItem(LOCAL_STORAGE_CITIES, JSON.stringify(citiesLocal));
    }
  };
  useEffect(() => {
    if (!location?.state?.weather) {
      handleGoHome();
    }
    addNewLocation();
    getForecast();
  }, []);

  const getForecast = () => {
    if (location?.state?.weather) {
      dispatch(fetchCityForecast(location?.state?.weather.name));
    }
  };

  const handleGoHome = () => {
    navigation(RoutePath.main);
  };

  return (
    <Container>
      <Button onClick={handleGoHome} sx={{ marginBottom: '20px', marginTop: '20px' }}>
        Main Page
      </Button>
      {location?.state?.weather && <CityDetailed data={location?.state?.weather} />}
      {isLoading ? (
        <CircularProgress
          size={50}
          sx={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            marginTop: `${-50 / 2}px`,
            marginLeft: `${-50 / 2}px`,
          }}
        />
      ) : (
        <CityForecast data={cityForecast} />
      )}
    </Container>
  );
};
