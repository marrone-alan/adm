import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { ToastContainer, toast } from 'react-toastify';

import reportWebVitals from './reportWebVitals';
import { Routes } from './routes';
import reducers from './reducers';

// styles
import GlobalStyle from './styles/global';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/fonts.css';

let store = '';
// on development enviroment enable a debug tool (Redux DevTools)
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
} else {
  store = createStore(reducers, applyMiddleware(reduxThunk));
}

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer
      closeButton={false}
      hideProgressBar={true}
      position={toast.POSITION.TOP_CENTER}
    />
    <GlobalStyle />
    <Routes />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
