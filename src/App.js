import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Import firebase client library
import * as firebase from 'firebase';

// Import Language Provider
import LanguageProvider from './containers/LanguageProvider';

// Import i18n messages
import { translationMessages } from './i18n';

// Import ApplicationWrapper
import ApplicationWrapper from './screens/Application';
import './App.scss';

import configureStore from './configureStore';


// Import root saga
import rootSaga from './sagas';

// Import browser utils
import { getBrowserInnerWidth, optimizedResize } from './utils/window';

import monitorAuthStateChanged from './startup/firebase-auth';

// Import Actions
import { pageWidthChanged } from './actions/responsive';
import { changeLocale } from './actions/internationalize';


// import { getProducts, getProductById } from './api/product';


// Initialize Firebase
// console.log('Firebase:');
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
firebase.initializeApp(firebaseConfig);
// End Initialize Firebase

// Create redux store with history
const initialState = {};
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
const store = configureStore(initialState, history);
store.runSaga(rootSaga);

// Initial size for responsive layout
store.dispatch(pageWidthChanged(getBrowserInnerWidth()));

// Change localization
store.dispatch(changeLocale('vi'));

// Monitor Auth state
// console.log('Update state!!!');
monitorAuthStateChanged(store);

// Detect resize event
optimizedResize.add(() => {
  // console.log('Resource conscious resize callback!');
  // console.log(`Inner width: ${getBrowserInnerWidth()}`);
  store.dispatch(pageWidthChanged(getBrowserInnerWidth()));
});


// console.log('Get products:');
// getProducts().then((data) => {
//   console.log(`Product: ${JSON.stringify(data)}`);
// }).catch((error) => {
//   console.log(`Error: ${JSON.stringify(error)}`);
// });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <ConnectedRouter history={history}>
            <ApplicationWrapper />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    );
  }
}

export default App;
