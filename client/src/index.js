import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {SnackbarProvider} from 'notistack'
import './index.css'
import App from './App'
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
      <Provider store={store} >
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </Provider>
  </BrowserRouter>,
)
