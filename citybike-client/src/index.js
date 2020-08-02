import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/buttons.css';
import './assets/fonts.css';
import './assets/forms.css';
import './assets/main.css';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();