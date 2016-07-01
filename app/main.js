import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';

import { reduxifyReducer } from '../lib/reduxify.js';

import View from './view';

const store = createStore(reduxifyReducer(), compose(
  window.devToolsExtension ? window.devToolsExtension() : _ => _
));

const renderApp = () => {
  return (
    <Provider store={store}>
      <View />
    </Provider>
  );
};

ReactDOM.render(renderApp(), document.getElementById('app'));
