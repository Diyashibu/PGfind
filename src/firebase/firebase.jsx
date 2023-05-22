// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl-FOn5xP2bQTjme3iWUyvQP1hWNVYwaA",
  authDomain: "pgfind-8e1bf.firebaseapp.com",
  projectId: "pgfind-8e1bf",
  storageBucket: "pgfind-8e1bf.appspot.com",
  messagingSenderId: "1092799331044",
  appId: "1:1092799331044:web:0b57a768042946f3f90af1",
  measurementId: "G-RDLQYHMPTG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const db = getDatabase();