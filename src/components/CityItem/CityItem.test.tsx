
import React from 'react' 
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { CityItem } from './CityItem';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { MemoryRouter } from 'react-router-dom';

const mockCity = {
  id: 1,
  name: 'London',
  weather: [{ description: 'Sunny', icon: 'sun' }],
  wind: { speed: 10, deg: 180 },
  main: { temp: 25, feels_like: 28, pressure: 1012, humidity: 70 },
};

const mockDeleteHandler = jest.fn();
const mockUpdateHandler = jest.fn();




  describe('CityItemsWeather',()=>{
    test('should render city name and temperature', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Provider store={store}>
            <CityItem
              data={mockCity}
              onDeleteClick={mockDeleteHandler}
              onUpdateClick={mockUpdateHandler}
            />
          </Provider>
        </MemoryRouter>,
      );
    
      const mockedCityName = screen.getByText(mockCity.name);
  const mockedTemperature = screen.getByText(`${Math.round(mockCity.main.temp)}°C`);
    
      expect(mockedCityName).toBeInTheDocument();
      expect(mockedTemperature).toBeInTheDocument();
    });
    
    test('should call delete handler when delete button is clicked', () => {
      render(
        <MemoryRouter initialEntries={['/']}> <Provider store={store}>
        <CityItem
          data={mockCity}
          onDeleteClick={mockDeleteHandler}
          onUpdateClick={mockUpdateHandler}
        />
      </Provider></MemoryRouter>
       ,
      );
    
      const deleteButton = screen.getByRole('button', { name: /delete/i });
    
      fireEvent.click(deleteButton);
    
      expect(mockDeleteHandler).toHaveBeenCalledWith(mockCity.name);
    });
    
    test('should call update handler when update button is clicked', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <CityItem
            data={mockCity}
            onDeleteClick={mockDeleteHandler}
            onUpdateClick={mockUpdateHandler}
          />
        </Provider>
        </MemoryRouter>,
      );
    
      const updateButton = screen.getByRole('button', { name: /update/i });
    
      fireEvent.click(updateButton);
    
      expect(mockUpdateHandler).toHaveBeenCalledWith(mockCity.name);
    });
    
  })
