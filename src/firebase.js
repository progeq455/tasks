import firebase from "firebase/compat/";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
