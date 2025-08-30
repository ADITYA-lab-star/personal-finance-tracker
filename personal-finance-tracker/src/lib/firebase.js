import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0yIeVxDgFDaALpw0yR8vf0qFpR3aA6jk",
  authDomain: "financeauth-39cf1.firebaseapp.com",
  projectId: "financeauth-39cf1",
  storageBucket: "financeauth-39cf1.firebasestorage.app",
  messagingSenderId: "85390765447",
  appId: "1:85390765447:web:4096770aceb774d761b722",
  measurementId: "G-SJ5VMPVK9K"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Persist sessions across tabs/reloads
setPersistence(auth, browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });