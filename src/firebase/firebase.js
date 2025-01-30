// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBie1G1gEdLZj9hd2LFZB-IDy6LLGR18g8",
  authDomain: "runtracker-b60e4.firebaseapp.com",
  projectId: "runtracker-b60e4",
  storageBucket: "runtracker-b60e4.firebasestorage.app",
  messagingSenderId: "838341900",
  appId: "1:838341900:web:70309ce6e3d7b7c5586529",
  measurementId: "G-XMXMNYT346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
