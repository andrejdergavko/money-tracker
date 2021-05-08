import React from 'react';
import { Provider } from 'react-redux';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { HashRouter as Router } from 'react-router-dom';
import { LightTheme, BaseProvider } from 'baseui';
import { Root } from './components/root';

import store from './store/store';

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
