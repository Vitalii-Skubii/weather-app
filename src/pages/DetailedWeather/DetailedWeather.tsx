import React, { useEffect } from 'react';
import { CityDetailed } from '../../components/CityDetailed/CityDetailed';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_CITIES } from '../../constants/cities';
import { Button, Container } from '@mui/material';
import { RoutePath } from '../../constants/routesConfig';

export const DetailedWeather = () => {
  const location = useLocation();
  const navigation = useNavigate();
 
  const addNewLocation = () => {
    if(location?.state?.weather){ const citiesLocal = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CITIES) || '[]');
    if (citiesLocal.find((city: string) => city === location?.state?.weather.name)) return;
    citiesLocal.push(location?.state?.weather.name);
    localStorage.setItem(LOCAL_STORAGE_CITIES, JSON.stringify(citiesLocal));}
   
  };
  useEffect(() => {
        addNewLocation();
    if (!location?.state?.weather) {
      handleGoHome();
    }
  }, []);

  const handleGoHome = () => {
    navigation(RoutePath.main);
  };

  return (
    <Container>
      <Button onClick={handleGoHome} sx={{marginBottom:"20px", marginTop:"20px"}}>Main Page</Button>
     {location?.state?.weather&&<CityDetailed
        data={location?.state?.weather}
      />} 
    </Container>
  );
};
