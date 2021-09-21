import React from 'react';
import ReactDOM from 'react-dom';
import { debugContextDevtool } from 'react-context-devtool';
import { GlobalProvider as Provider } from './context/GlobalState';
import * as serviceWorker from './serviceWorker';
import App from './App';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  container
);

serviceWorker.register();
if (window._REACT_CONTEXT_DEVTOOL) {
  debugContextDevtool(container);
}
