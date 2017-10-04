import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './App/App';
import './index.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

ReactDOM.render(<App />, document.getElementById('root'));
