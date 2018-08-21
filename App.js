import React from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import Main from './app/index';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default class App extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <Provider store={store}>
          <Main />
        </Provider>
      </ActionSheetProvider>
    );
  }
}