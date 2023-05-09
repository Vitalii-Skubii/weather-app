import React from 'react';
import { CityList } from '../../components/CitiesList/CityList';
import { SearchLocation } from '../../components/SearchLocation/SearchLocation';
import { Box, CircularProgress, Container } from '@mui/material';
import { useMainPageState } from './MainPage.state';

export const MainPage = () => {
  const {
    citiesWeather,
    isLoading,
    handleGetWeatherNewLocation,
    handleChange,
    searchValue,
    closeWarning,
    warning,
    handleDelete,
    handleUpdateCityWeather,
  } = useMainPageState();

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 4 }} border={'bisque'}>
        <SearchLocation
          handleGetLocation={handleGetWeatherNewLocation}
          value={searchValue}
          onChange={handleChange}
          warning={warning}
          handleClose={closeWarning}
        />
        {isLoading ? (
          <CircularProgress
            size={80}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: `${-80 / 2}px`,
              marginLeft: `${-80 / 2}px`,
            }}
          />
        ) : (
          <CityList
            data={citiesWeather}
            handleDelete={handleDelete}
            handleUpdate={handleUpdateCityWeather}
          />
        )}
      </Box>
    </Container>
  );
};
