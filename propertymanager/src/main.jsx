import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import "./i18n.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard.jsx';
import Properties from './property/Properties.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Login from './authentication/Login.jsx';
import PropertyUpload from './property/PropertyUpload.jsx';
import {createTheme} from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import Tenants from './tenants/Tenants.jsx';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Dashboard/>
      },
      {
        path: '/propertyUpload',
        element: <></>
      },
      {
        path: '/properties',
        element: <Properties/>,
        children: [
          {
            path: '/properties/add',
            element: <PropertyUpload/>
          }
        ]
      },
      {
        path: '/tenants',
        element: <Tenants/>,
        children: [
          {
            path: '/tenants/add',
            element: <></>
          }
        ]
      },
      {
        path: '/calendar',
        element: <Calendar/>
      },
      {
        element: <Login/>,
        path: '/login'
      }
    ]
  },
  {
    element: <div></div>,
    path: '/settings'
  }
]);

const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'blue',
            color: 'white'
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'blue'
          }
        }
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router = {router}></RouterProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

