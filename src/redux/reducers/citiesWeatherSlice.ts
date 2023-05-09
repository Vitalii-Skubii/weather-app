import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CitiesWeatherState, ICitiesWeather } from '../types/ICitiesWeather';
import { LOCAL_STORAGE_CITIES } from '../../constants/cities';


const initialState: CitiesWeatherState = {
  citiesWeather: [],
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
      state.citiesWeather?.push(action.payload);
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
  },
});
export const { actions: citiesWeatherActions } = citiesWeatherSlice;
export default citiesWeatherSlice.reducer;
