import React from 'react';
import {Provider} from 'react-redux';

import store from './src/redux/store.js';
import StackNavigator from './src/navigation/StackNavigator.js';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
