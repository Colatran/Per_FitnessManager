import { View } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import { ref_food_diets, ref_food_ingredients, ref_food_meals, ref_food_recipes } from '../firebase.config';
import { onSnapshot } from 'firebase/firestore';



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ingredientDocs, setIngredientDocs] = useState([]);
  const [recipeDocs, setRecipeDocs] = useState([]);
  const [mealDocs, setMealDocs] = useState([]);
  const [dietDocs, setDietDocs] = useState([]);



  const SortedListSnapshot = (ref, setData) => {
    return onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => {
        const nameA = a.label.toUpperCase();
        const nameB = b.label.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setData(data);
    });
  }

  useEffect(() => {
    const ingredientSnap =  SortedListSnapshot(ref_food_ingredients, setIngredientDocs);
    const recipeSnap =      SortedListSnapshot(ref_food_recipes, setRecipeDocs);
    const mealSnap =        SortedListSnapshot(ref_food_meals, setMealDocs);
    const dietSnap =        SortedListSnapshot(ref_food_diets, setDietDocs);

    return () => {
      ingredientSnap();
      recipeSnap();
      mealSnap();
      dietSnap();
    }
  }, []);



  const getExerciseName = (key) => {
    const foundObject = exerciseDocs.find(obj => obj.id === key);
    return foundObject.name;
  }



  return (
    <View style={{flex: 1, backgroundColor: "#000"}}>
      <UserContext.Provider
        value={{
          ingredientDocs, setIngredientDocs,
          recipeDocs,     setRecipeDocs,
          mealDocs,       setMealDocs,
          dietDocs,       setDietDocs,

          getExerciseName,
        }}
      >
        {children}
      </UserContext.Provider>
    </View>
  );
};