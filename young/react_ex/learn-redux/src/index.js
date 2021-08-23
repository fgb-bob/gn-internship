import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import {composeWithDevtools}from 'redux-devtools-extension';


const store = createStore(rootReducer,composeWithDevtools); //스토어를 만듭니다.
//composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화
//console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
