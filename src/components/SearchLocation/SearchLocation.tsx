import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AlertCustom } from '../AlertCustom/AlertCustom';
import { useAppSelector } from '../../redux/hooks';

interface ISearchProps {
  handleGetLocation: (city: string) => void;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warning: boolean;
  handleClose: () => void;
}

export const SearchLocation = (props: ISearchProps) => {
  const { handleGetLocation, value, onChange, warning, handleClose } = props;

  const { error } = useAppSelector((state) => state.citiesWeatherReducer);

  const onClickGetLocation = () => {
    handleGetLocation(value);
  };

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      sx={{ position: 'relative', marginBottom: '20px' }}>
      <TextField
        id='outlined-basic'
        label='Add location'
        variant='outlined'
        placeholder='Search for location'
        value={value}
        onChange={onChange}
        sx={{ width: '300px' }}
      />
      <Button onClick={onClickGetLocation} sx={{ height: '55px', marginLeft: '10px' }}>
        <SearchIcon />
      </Button>
      <AlertCustom open={warning} message={error} handleClose={handleClose} />
    </Box>
  );
};
