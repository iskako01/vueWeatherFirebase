import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyC2qKLgNV6_ZOg18MAIwJH4Ieb4ifTZsv0",
  authDomain: "vueweatherapp-5d8bf.firebaseapp.com",
  projectId: "vueweatherapp-5d8bf",
  storageBucket: "vueweatherapp-5d8bf.appspot.com",
  messagingSenderId: "229380002463",
  appId: "1:229380002463:web:8258332aec22eb5afe08aa",
});

// const database = firebase.database();
// const auth = firebase.auth();
const db = firebase.firestore();

export { db };
