import { AppDispatch } from '../store';
import { fetchWeather } from '../../api/weatherApi';
import { citiesWeatherActions } from './citiesWeatherSlice';

export const fetchCitiesWeather = (citiesList: string[]) => async (dispatch: AppDispatch) => {
  try {
    dispatch(citiesWeatherActions.citiesWeatherFetching());
    const promises = citiesList.map((city) => fetchWeather(city));
    const citiesWeather = await Promise.all(promises);
    const validCitiesWeather = citiesWeather.filter((city) => city !== null);
    console.log('DISPATCH');
    dispatch(citiesWeatherActions.citiesWeatherSuccess(validCitiesWeather));
  } catch (err) {
    dispatch(citiesWeatherActions.citiesWeatherError);
  }
};

export const updateCityWeather = (city: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(citiesWeatherActions.cityWeatherUpdateFetching(city));
    const response = await fetchWeather(city);
    dispatch(citiesWeatherActions.cityWeatherUpdateSuccess(response));
  } catch (error) {
    dispatch(citiesWeatherActions.cityWeatherUpdateError);
  }
};
