// Import firebase client library
import * as firebase from 'firebase';

// Actions
import updateAuthState from '../actions/account';


export default function monitorAuthStateChanged(store) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      // ...
      const { displayName, email, emailVerified, photoURL, isAnonymous, uid } = user;
      store.dispatch(
        updateAuthState({ displayName, email, emailVerified, photoURL, isAnonymous, uid })
      );
    } else {
      // User is signed out.
      // ...
      store.dispatch(updateAuthState(null));
    }
  });
}
