import React from 'react';
import storage from 'electron-json-storage';
import os from 'os';
import { Provider } from 'react-redux';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { HashRouter as Router } from 'react-router-dom';
import { LightTheme, BaseProvider } from 'baseui';

import { Root } from './components/root';

import store from './store/store';

// storage.setDataPath(os.tmpdir());
// console.log(store.getState());

const engine = new Styletron();

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <Root />
          </BaseProvider>
        </StyletronProvider>
      </Provider>
    </Router>
  );
}
