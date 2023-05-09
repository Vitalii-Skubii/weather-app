import * as React from 'react';
import { AppRouter } from './AppRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { HashRouter } from 'react-router-dom';

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ThemeProvider>
    </HashRouter>
  );
}
