/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Web-only: mount into DOM using AppRegistry (react-native-web standard approach)
if (typeof document !== 'undefined') {
  const runApp = () => {
    AppRegistry.runApplication(appName, {
      initialProps: {},
      rootTag: document.getElementById('root'),
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runApp);
  } else {
    runApp();
  }
}
