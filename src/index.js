import React from 'react';
import ReactDOM from 'react-dom';
 
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import App from './App';
 
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, devTools);
 
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
   , document.getElementById('root')
);
