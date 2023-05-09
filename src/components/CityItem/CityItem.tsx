import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ICitiesWeather } from '../../redux/types/ICitiesWeather';
import { useAppSelector } from '../../redux/hooks';

interface ICityItem {
  onUpdateClick: (city: string) => void;
  onDeleteClick: (city: string) => void;
  data: ICitiesWeather;
}

export const CityItem = (props: ICityItem) => {
  const { data, onDeleteClick, onUpdateClick } = props;
  const { name, weather, main } = data;

  const { isUpdateLoading, updateName } = useAppSelector((state) => state.citiesWeatherReducer);

  const navigate = useNavigate();

  const handleNavigateDetailed = () => {
    navigate(`detailed/${name}`, { state: { weather: data } });
  };

  const handleDelete = () => {
    onDeleteClick(name);
  };

  const handleUpdate = () => {
    onUpdateClick(name);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleNavigateDetailed}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} />
          </Box>

          <Typography variant='h4' color='text.secondary' sx={{ marginLeft: '20px' }}>
            {Math.round(main.temp)}°C
          </Typography>
        </Box>

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant='outlined' color='primary' onClick={handleUpdate}>
          {isUpdateLoading && updateName === name ? <CircularProgress size={25} /> : 'Update'}
        </Button>
        <Button variant='outlined' color='error' startIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
