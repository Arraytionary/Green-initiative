import * as firebase from "firebase";

// Change firebase config here;
var firebaseConfig = {
  apiKey: "AIzaSyDdCoHZLv3WRaJ3lD1A3X2ZSJ6rLpEgQpU",
  authDomain: "iccs487-natthawit.firebaseapp.com",
  databaseURL: "https://iccs487-natthawit.firebaseio.com",
  projectId: "iccs487-natthawit",
  storageBucket: "iccs487-natthawit.appspot.com",
  messagingSenderId: "944425802292",
  appId: "1:944425802292:web:b37aa4c3474f95f1dc0861",
  measurementId: "G-6MG635BF0W"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
