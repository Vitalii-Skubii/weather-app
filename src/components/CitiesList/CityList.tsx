import React from 'react';
import { CityItem } from '../CityItem/CityItem';
import { Grid } from '@mui/material';
import { ICitiesWeather } from '../../redux/types/ICitiesWeather';

interface ICityList {
  data?: ICitiesWeather[];
  handleDelete: (city: string) => void;
  handleUpdate: (city: string) => void;
}

export const CityList = (props: ICityList) => {
  const { data, handleDelete, handleUpdate } = props;

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {data?.map((city) => (
        <Grid item xs={6} key={city.id}>
          <CityItem data={city} onDeleteClick={handleDelete} onUpdateClick={handleUpdate} />
        </Grid>
      ))}
    </Grid>
  );
};
