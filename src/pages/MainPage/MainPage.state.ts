import { useEffect, useState } from 'react';
import { CITIES, LOCAL_STORAGE_CITIES } from '../../constants/cities';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchWeather } from '../../api/weatherApi';
import { fetchCitiesWeather } from '../../redux/reducers/ActionCreator';
import { useNavigate } from 'react-router-dom';
import { citiesWeatherActions } from '../../redux/reducers/citiesWeatherSlice';
import axios, { AxiosError } from 'axios';
import { updateCityWeather } from '../../redux/reducers/ActionCreator';

export const useMainPageState = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [warning, setWarning] = useState(false);
  const { citiesWeather, isLoading } = useAppSelector((state) => state.citiesWeatherReducer);

  const closeWarning = () => {
    setWarning(false);
  };
  const openWarning = () => {
    setWarning(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleGetWeatherNewLocation = async (city: string) => {
    try {
      const result = await fetchWeather(city);
      setSearchValue('');
      navigation(`detailed/${city}`, { state: { weather: result } });

      return result;
    } catch (err) {
      const error = err as AxiosError;
      if (axios.isAxiosError(error)) {
        dispatch(citiesWeatherActions.citiesWeatherError(error.response?.statusText || ''));
        openWarning();
      }

      console.log(error);
      setSearchValue('');
    }
  };

  const handleDelete = (cityName: string) => {
    dispatch(citiesWeatherActions.removeCityWeather(cityName));
  };

  const handleUpdateCityWeather = async (city: string) => {
    dispatch(updateCityWeather(city));
  };

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE_CITIES)) {
      localStorage.setItem(LOCAL_STORAGE_CITIES, JSON.stringify(CITIES));
      console.log(localStorage.getItem(LOCAL_STORAGE_CITIES), 'LOCAL');
      dispatch(fetchCitiesWeather(CITIES));
    } else if (localStorage.getItem(LOCAL_STORAGE_CITIES)) {
      const citiesLocal = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CITIES) || '[]');
      dispatch(fetchCitiesWeather(citiesLocal));
    }
    console.log(1);
  }, [dispatch]);

  const setErrorDispatch = async () => {
    try {
      await fetchWeather('London');
    } catch (err) {
      const error = err as AxiosError;
      if (axios.isAxiosError(error)) {
        dispatch(citiesWeatherActions.citiesWeatherError(error.response?.statusText || ''));
        openWarning();
      }
    }
  };

  useEffect(() => {
    setErrorDispatch();
  }, [dispatch]);

  return {
    handleGetWeatherNewLocation,
    handleChange,
    handleDelete,
    handleUpdateCityWeather,
    citiesWeather,
    isLoading,
    searchValue,
    closeWarning,
    warning,
  };
};
