import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store.js';
import Navigator from './src/navigation/Navigator.js';
import Toast from 'react-native-toast-message';

const App = () => {

  return (
    <Provider store={store}>
      <Navigator />
      <Toast/>
    </Provider>
  );
};

export default App;
