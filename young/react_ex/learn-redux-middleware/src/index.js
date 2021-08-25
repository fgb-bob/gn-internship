import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from '@redux-saga/core';

const customHistory = createBrowserHistory();
const SagaMiddleware = createSagaMiddleware({
  context : {
    history : customHistory
  }
}); //사가 미들웨어를 만듭니다.

const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({history: customHistory}),
      SagaMiddleware,
      logger
    )
  )
);
// 여러개의 미들웨어를 적용할 수 있습니다.

SagaMiddleware.run(rootSaga); //루트 사가를 실행해줍니다.
// 주의 : 스토어 생성이 된 다음에 위 코드를 실행해야함.

ReactDOM.render(
  <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
      </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
