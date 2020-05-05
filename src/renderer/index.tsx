import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

import configureStore from './store';
const store = configureStore();

ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
);
