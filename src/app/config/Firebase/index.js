// Philipp Moura Srivastva
// 4 Juni 2019
// Filename: Firebase/index.js
// Description: This initializes a firebase instance
// ++++++++++++++++++++++++++++++++++++++++++++++
import * as firebase from 'firebase'


const config = {
  apiKey: "AIzaSyDtc9f49H6GYZN1OgWxUjxxPJ9MrWEkuv8",
  authDomain: "foxdale-1bb7d.firebaseapp.com",
  databaseURL: "https://foxdale-1bb7d.firebaseio.com",
  projectId: "foxdale-1bb7d",
  storageBucket: "foxdale-1bb7d.appspot.com",
  messagingSenderId: "770087664922"
};

const Firebase = firebase.initializeApp(config)
console.log(Firebase)

export default Firebase
