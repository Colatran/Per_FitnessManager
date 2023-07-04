// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, deleteDoc, doc, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsfkGgyraxWT6t1ZunTaDslxUOBG74zIs",
  authDomain: "workoutmanger.firebaseapp.com",
  projectId: "workoutmanger",
  storageBucket: "workoutmanger.appspot.com",
  messagingSenderId: "28043320926",
  appId: "1:28043320926:web:ac5de65b40b57da98edecf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);

export const exercises = "exercises";
export const workouts = "workouts";
