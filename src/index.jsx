import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import reportWebVitals from './reportWebVitals';

// styles
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'react-datepicker/dist/react-datepicker.css';

let store = '';

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer
      closeButton={false}
      hideProgressBar={true}
      position={toast.POSITION.TOP_CENTER}
    />
    <GlobalStyle />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
