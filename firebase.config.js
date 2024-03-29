// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { FloorValue } from "./utils/Functions";
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

export const food_ingredients = "food_ingredients";
export const food_recipes = "food_recipes";
export const food_meals = "food_meals";
export const food_diets = "food_diets";

export const exercises = "exercises";
export const workouts = "workouts";
export const workout_exercises = "workout_exercises";
export const schedules = "schedules";



export const ref_food_ingredients = collection(db, food_ingredients);
export const ref_food_recipes = collection(db, food_recipes);
export const ref_food_meals = collection(db, food_meals);
export const ref_food_diets = collection(db, food_diets);