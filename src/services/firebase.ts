import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAgTLLjn4kjqLl76dKyGDl8JIekjCF-nbo",
  authDomain: "letmeask-33f4a.firebaseapp.com",
  databaseURL: "https://letmeask-33f4a-default-rtdb.firebaseio.com",
  projectId: "letmeask-33f4a",
  storageBucket: "letmeask-33f4a.appspot.com",
  messagingSenderId: "436751948623",
  appId: "1:436751948623:web:508867e18efc8e711a033a",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
