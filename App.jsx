import React from 'react';
import {Provider} from 'react-redux';

import store from './src/redux/store.js';
import Navigator from './src/navigation/Navigator.js';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
