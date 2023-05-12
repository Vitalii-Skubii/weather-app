import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CitiesWeatherState, ICitiesWeather, ICityForecast } from '../types/ICitiesWeather';
import { LOCAL_STORAGE_CITIES } from '../../constants/cities';

export const initialState: CitiesWeatherState = {
  citiesWeather: [],
  cityForecast: [],
  isLoading: false,
  isUpdateLoading: false,
  updateName: '',
  error: '',
};

export const citiesWeatherSlice = createSlice({
  name: 'citiesWeather',
  initialState,
  reducers: {
    citiesWeatherFetching(state) {
      state.isLoading = true;
    },
    citiesWeatherSuccess(state, action: PayloadAction<ICitiesWeather[]>) {
      state.isLoading = false;
      state.error = '';
      state.citiesWeather = action.payload;
    },
    citiesWeatherError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addCityWeather: (state, action: PayloadAction<ICitiesWeather>) => {
      state.citiesWeather.push(action.payload);
    },
    removeCityWeather: (state, action: PayloadAction<string>) => {
      const filteredCities = state.citiesWeather?.filter((city) => city.name !== action.payload);
      state.citiesWeather = filteredCities;
      const localFilteredCities = filteredCities?.map((city) => city.name);
      localStorage.setItem(LOCAL_STORAGE_CITIES, JSON.stringify(localFilteredCities));
    },
    cityWeatherUpdateFetching(state, action: PayloadAction<string>) {
      state.isUpdateLoading = true;
      state.updateName = action.payload;
    },
    cityWeatherUpdateSuccess: (state, action: PayloadAction<ICitiesWeather>) => {
      const weather = action.payload;
      const cityIndex = state.citiesWeather?.findIndex((city) => city.name === weather.name);
      if (cityIndex !== -1) {
        state.citiesWeather ? [cityIndex] : weather;
        state.updateName = weather.name;
      }
      state.isUpdateLoading = false;
    },
    cityWeatherUpdateError(state, action: PayloadAction<string>) {
      state.isUpdateLoading = false;
      state.error = action.payload;
    },
    cityForecastFetching(state) {
      state.isLoading = true;
    },
    cityForecastSuccess: (state, action: PayloadAction<ICityForecast[]>) => {
      const slicedForecast = action.payload.slice(0, 8);
      state.cityForecast = slicedForecast;
      state.isLoading = false;
    },
    cityForecastError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { actions: citiesWeatherActions } = citiesWeatherSlice;
export default citiesWeatherSlice.reducer;
