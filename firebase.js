import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoFLUOOAKAah4b60fd2nIiMW0gbNFnQFg",
  authDomain: "uchat-363f9.firebaseapp.com",
  projectId: "uchat-363f9",
  storageBucket: "uchat-363f9.appspot.com",
  messagingSenderId: "788406747508",
  appId: "1:788406747508:web:e65594381607232188ec21",
  measurementId: "G-M0VY0Q90CS"
};

let app;
if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
