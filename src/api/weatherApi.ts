import axios from 'axios';
import { BASE_URL } from '../constants/config';
import { ICitiesWeather } from '../redux/types/ICitiesWeather';

const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

export const fetchWeather = async (cityName: string) => {
  const url = `${BASE_URL}weather?q=${cityName}&units=metric&limit=1&appid=${API_KEY}`;

  const response = await instance.get<ICitiesWeather>(url);

  return response.data;
};
