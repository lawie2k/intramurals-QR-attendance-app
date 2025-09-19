'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expo = require('expo');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
(0, _expo.registerRootComponent)(_App2['default']);
