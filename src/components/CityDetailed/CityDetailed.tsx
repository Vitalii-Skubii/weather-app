import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { ICitiesWeather } from '../../redux/types/ICitiesWeather';
import SouthIcon from '@mui/icons-material/South';

interface ICityDetailed {
  data: ICitiesWeather;
}

export const CityDetailed = (props: ICityDetailed) => {
  const {
    data: { name, weather, main, wind },
  } = props;

  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} />
          </Box>

          <Typography variant='h4' color='text.secondary'>
            {Math.round(main.temp)}°C
          </Typography>
        </Box>

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='body1' color='text.secondary'>
              feels like: {Math.round(main.feels_like)}°C
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography variant='body1' color='text.secondary'>
                wind: {Math.round(wind.speed)} km/h
              </Typography>
              <SouthIcon sx={{ transform: `rotate(${wind.deg}deg)`, marginLeft: '10px' }} />
            </Box>

            <Typography variant='body1' color='text.secondary'>
              humidity: {main.humidity}%
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              pressure: {main.pressure}mb
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
