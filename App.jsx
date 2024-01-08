import React from 'react';
import {Provider} from 'react-redux';

import store from './src/redux/store.js';
import Navigator from './src/navigation/Navigator.js';
import Login from './src/pages/auth/Login.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
      {/* <Login/> */}
    </Provider>
  );
};

export default App;
