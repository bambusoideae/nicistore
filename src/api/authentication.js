// Import firebase client library
import * as firebase from 'firebase';

// Wrap onAuthStateChanged into a Promise
export function getAuthState() {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export function getToken() {
  // return firebase.auth().currentUser.getToken();
  return getAuthState().then((user) => {
    if (user) {
      return user.getIdToken();
    }

    return undefined;
  });
}

export function getCurrentUser() {
  return firebase.auth().currentUser;
}

export function createUserWithEmailAndPassword(email, password) {
  // firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
  //   // Handle Errors here.
  //   let errorCode = error.code;
  //   let errorMessage = error.message;
  //   // ...
  // // [START_EXCLUDE]
  // if (errorCode == 'auth/weak-password') {
  //   alert('The password is too weak.');
  // } else {
  //   alert(errorMessage);
  // }
  // console.log(error);
  // // [END_EXCLUDE]
  // });
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function signInWithEmailAndPassword(email, password) {
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  // .then(() => {
  //   // Existing and future Auth states are now persisted in the current
  //   // session only. Closing the window would clear any existing state even
  //   // if a user forgets to sign out.
  //   // ...
  //   // New sign-in will be persisted with session persistence.
  //   return firebase.auth().signInWithEmailAndPassword(email, password);
  // })
  // .catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  // });
  return firebase.auth().signInWithEmailAndPassword(email, password); // .catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ...
  //   // [START_EXCLUDE]
  //   if (errorCode === 'auth/wrong-password') {
  //     alert('Wrong password.');

  //   } else {
  //     alert(errorMessage);
  //   }
  //   // [END_EXCLUDE]
  // });
}

export function signOut() {
  if (firebase.auth().currentUser) {
    // [START signout]
    return firebase.auth().signOut();
    // [END signout]
  }

  return Promise.resolve();
}
