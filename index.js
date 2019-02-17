/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (typeof process === 'undefined') process = {};
process.nextTick = setImmediate;

AppRegistry.registerComponent(appName, () => App);
