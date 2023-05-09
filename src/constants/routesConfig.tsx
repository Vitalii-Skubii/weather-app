import React from 'react';
import { RouteProps } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { DetailedWeather } from '../pages/DetailedWeather/DetailedWeather';

export enum AppRoutes {
  MAIN = 'main',
  DETAILED = 'detailed',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.DETAILED]: '/detailed/:cityId',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.DETAILED]: {
    path: RoutePath.detailed,
    element: <DetailedWeather />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
