import { combineReducers, configureStore } from "@reduxjs/toolkit";
import citiesWeatherReducer from './reducers/citiesWeatherSlice'

const rootReducer=combineReducers({
citiesWeatherReducer
})

export const store=
 configureStore({
    reducer: rootReducer
  })


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch