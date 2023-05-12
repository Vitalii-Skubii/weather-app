import citiesWeatherReducer,{citiesWeatherActions, initialState} from './citiesWeatherSlice';

const mockedCitiesWeather = [
  {  id: 1,
  name: 'London',
  weather: [{
    description: 'cloudy',
    icon:'1d',
  }],
  wind: {
    speed: 10,
    deg: 50
  },
  main: {
    temp: 10,
    feels_like: 10,
    pressure: 10,
    humidity: 10,
  },},
];

const fullInitState={
  citiesWeather:mockedCitiesWeather,
  cityForecast: [],
  isLoading: false,
  isUpdateLoading: false,
  updateName: '',
  error: '',
}

describe('weather reducer', () => {
  test('setCitiesWeather works good', () => {
    return expect(
      citiesWeatherReducer(initialState, citiesWeatherActions.citiesWeatherSuccess(mockedCitiesWeather))
    ).toEqual({ ...initialState, citiesWeather: mockedCitiesWeather  });
  });

  test('Delete citiesWeather works good', () => {
    expect(
      citiesWeatherReducer(
        fullInitState,
        citiesWeatherActions.removeCityWeather('London')
      )
    ).toEqual(initialState);
  });
  test('Delete citiesWeather, there is match to del', () => {
    expect(
      citiesWeatherReducer(
        fullInitState,
        citiesWeatherActions.removeCityWeather('Paris')
      )
    ).toEqual(fullInitState);
  });
 });
