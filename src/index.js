import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase= require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL9rNSF3k5WMzENzZd5owUVMENp_gpzCg",
  authDomain: "evernote-clone-aa39d.firebaseapp.com",
  databaseURL: "https://evernote-clone-aa39d.firebaseio.com",
  projectId: "evernote-clone-aa39d",
  storageBucket: "evernote-clone-aa39d.appspot.com",
  messagingSenderId: "242462073672",
  appId: "1:242462073672:web:8a384ae1ecbda303e7897d",
  measurementId: "G-TN8B0R3WJK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
