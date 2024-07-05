// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDZdLnVoN_xOH_CILkIzxMxZEcKycFwQ_Q",
  authDomain: "todo-254d0.firebaseapp.com",
  databaseURL: "https://todo-254d0-default-rtdb.firebaseio.com",
  projectId: "todo-254d0",
  storageBucket: "todo-254d0.appspot.com",
  messagingSenderId: "906763594916",
  appId: "1:906763594916:web:6b897afa66b4a1fd23ca31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);
