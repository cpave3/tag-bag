import React from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import Home from './app/components/Home';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}