import React from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import Main from './app/index';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}