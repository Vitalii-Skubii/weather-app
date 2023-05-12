export interface ICitiesWeather{
  id: number;
  name: string;
  weather: {
    description: string;
    icon:string
  }[];
  wind: {
    speed: number,
    deg: number
  };
  main: {
    temp: number;
    feels_like: number,
    pressure: number,
    humidity: number,
  };
}

export interface CitiesWeatherState {
  citiesWeather: ICitiesWeather[];
  cityForecast?:ICityForecast[]
  isLoading: boolean;
  isUpdateLoading: boolean;
  updateName: string;
  error: string;
}

export interface ICityForecastList{
  list:ICityForecast[]
}

export interface ICityForecast{
  dt:number;
  main:{
    temp:number;
  }
  }
