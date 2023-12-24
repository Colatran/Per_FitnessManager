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

export const info_status = "info_status";
export const food_ingredients = "food_ingredients";
export const food_recipes = "food_recipes";
export const food_meals = "food_meals";

export const exercises = "exercises";
export const workouts = "workouts";
export const workout_exercises = "workout_exercises";
export const schedules = "schedules";



export const ref_info_status = collection(db, info_status);
export const ref_food_ingredients = collection(db, food_ingredients);
export const ref_food_recipes = collection(db, food_recipes);
export const ref_food_meals = collection(db, food_meals);



export const make_ingredient = (
  recipeId, label, isSolid, unit_price, unit_weight, servings, servings_fav, 
  nut_calories, nut_fats, nut_saturates, nut_carbs, nut_sugars, nut_protein, nut_fiber, nut_salt
) => {

  const servings_ = servings.map((doc) => ({
    amount: FloorValue(parseFloat(doc.amount)),
    label: doc.label,
  }));

  const data = {
    recipeId:       recipeId,
    label:          label,
    isSolid:        isSolid,
    unit_price:     parseFloat(unit_price),
    unit_weight:    parseFloat(unit_weight),
    servings:       servings_,
    servings_fav:   servings_fav,
    nut_calories:   parseFloat(nut_calories),
    nut_fats:       parseFloat(nut_fats),
    nut_saturates:  parseFloat(nut_saturates),
    nut_carbs:      parseFloat(nut_carbs),
    nut_sugars:     parseFloat(nut_sugars),
    nut_protein:    parseFloat(nut_protein),
    nut_fiber:      parseFloat(nut_fiber),
    nut_salt:       parseFloat(nut_salt),
  }
  return data;
}

export const make_recipe = (label, isSolid, servings, servings_fav, ingredietData) => {
  const servings_ = servings.map((doc) => ({
    amount: FloorValue(parseFloat(doc.amount)),
    label: doc.label,
  }));

  const ingredietData_ = ingredietData.map((doc) => ({
    amount: FloorValue(doc.amount),
    ingredientId: doc.ingredientId,
  }));

  const data = {
    label: label,
    isSolid: isSolid,
    servings: servings_,
    servings_fav: servings_fav,
    ingredients: ingredietData_,
  }
  return data;
}