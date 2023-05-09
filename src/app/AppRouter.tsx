import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routeConfig } from '../constants/routesConfig';

export const AppRouter = () => {
  const routes = Object.values(routeConfig);

  return (
   
      <Routes>
        {routes.map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
   
  );
};
