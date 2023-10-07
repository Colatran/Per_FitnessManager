import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ref_food_ingredients } from "../../firebase.config";
import { addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { color_background_dark, color_button_green, color_button_red, styles_common, styles_text } from "../../styles/styles";

import Input_Text from "../../components/Input_Text";
import Button_Icon from "../../components/Button_Icon";
import Label from "../../components/Label";



export default function RedipeEdit({ navigation, route }) {
  const { recipe } = route.params;

  const [saveLock, setSaveLock] = useState(false);
  const [lockSwitch, setLockSwitch]           = useState(false);

  const [label, setLabel]                     = useState(recipe ? recipe.label            : "");
  const [servings, setServings]               = useState(servings ? recipe.servings       : "1");
  const [ingredients, setIngredients]         = useState(recipe.ingredients ? recipe.ingredients : []);
  const [ingredientsDocs, setIngredientsDocs] = useState([]);


  
  useEffect(() => {
    return onSnapshot(ref_food_ingredients, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIngredientsDocs(data);
    });
  }, []);



  const addIngredient = async (index) => {
    const ingDoc = ingredientsDocs[index];
    const newIng = {amount: ingDoc.unit, ingredient: ingDoc};
    setIngredients([...ingredients, newIng]);

    ingredientsDocs.splice(index, 1);
    setIngredientsDocs(ingredientsDocs);
  }
  const removeIngredient = async (index) => {
    const ing = ingredients[index].ingredient;
    setIngredientsDocs([...ingredientsDocs, ing]);

    ingredients.splice(index, 1);
    setIngredients(ingredients);
  }
  const saveRecipe = async () => {
    const data = {
      label: label,
      ingredients: ingredients,
      isIngredient: isIngredient,
      ingredients: [],
    }

    if(recipe) {
      const docRef = doc(ref_food_ingredients, recipe.id);
      return await updateDoc(docRef, data);
    } 
    else {
      return await addDoc(ref_food_ingredients, data);
    }
  }
  const deleteRecipe = async () => {
    const docRef = doc(ref_food_ingredients, recipe.id);
    return deleteDoc(docRef);
  }
  const changeIngredientAmount = async (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].amount = value;
    setIngredients(newIngredients);
  }



  const handleAddIngredientOnPress = (index) => {
    if(lockSwitch) return;
    setLockSwitch(true);

    addIngredient(index)
    .then(() => setLockSwitch(false));
  }
  const handleRemoveIngredientOnPress = (index) => {
    if(lockSwitch) return;
    setLockSwitch(true);

    removeIngredient(index)
    .then(() => setLockSwitch(false));
  }
  const handleSaveOnPress = () => {
    if(saveLock) return;
    setSaveLock(true);
    saveRecipe()
    .then(() => {
      setSaveLock(false);
      navigation.goBack();
    })
    .catch((e) => {
      console.log(e);
      setSaveLock(false)});
  }
  const handleDeleteOnPress = () => {
    deleteRecipe()
    .then(() => {
      navigation.goBack();
    })
    .catch((e) => {
      console.log(e);
    });
  }
  const handleIngredientSetValue = (index, value) => {
    changeIngredientAmount(index, value).then(()=> {console.log(ingredients)});
  }



  return (
    <View style={styles_common.container}>

      <View>
        <Label label="Label">
          <Input_Text value={label} setValue={setLabel} placeholder={"Label"}/>
        </Label>
        
        <Label label="Servings">
          <Input_Text value={servings} setValue={setServings} placeholder={""} keyboardType={"numeric"}/>
        </Label>
      </View>

      <View style={{flex: 1}}>
        <View style={styles.container_list}>
          <FlatList
            data={ingredientsDocs}
            renderItem={({item, index}) => { 
              return(
                <View style={styles.container_item}>
                  <Text style={styles_text.common}>{item.label}</Text>
                  <View style={{flex: 1, justifyContent: "flex-end", flexDirection: "row"}}>
                    <Button_Icon style={styles.button} icon="plus" onPress={() => handleAddIngredientOnPress(index)}/>
                  </View>
                </View>
              )
            }}
          />
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
          <Icon name={"chevron-down"} size={15} color='white'/>
          <Icon name={"chevron-down"} size={15} color='white'/>
          <Icon name={"chevron-down"} size={15} color='white'/>
        </View>

        <View style={styles.container_list}>
          <FlatList
            data={ingredients}
            renderItem={({item, index}) => 
              <View style={styles.container_item}>
                <View style={{flex: 1}}>
                  <Text style={styles_text.common}>{item.ingredient.label}</Text>
                </View>

                <View style={{flex: 1, paddingHorizontal: 5}}>
                  <Input_Text value={item.amount} setValue={(text) => handleIngredientSetValue(index, text)} keyboardType={"numeric"}/>
                </View>

                <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                  <Button_Icon style={styles.button} icon="close" onPress={() => handleRemoveIngredientOnPress(index)}/>
                </View>
              </View>
            }
          />
        </View>
      </View>

      <View style={{flexDirection: "row", alignItems: "flex-end", marginVertical: 20}}>
      {
        recipe ?
        <View style={{flex:1, flexDirection: "row"}}>
          <Button_Icon 
            style={{flex: 1, backgroundColor: color_button_green, marginRight: 5}}
            icon="content-save"
            onPress={handleSaveOnPress}
          /> 
          <Button_Icon 
            style={{flex: 1, backgroundColor: color_button_red, marginLeft: 5}}
            icon="delete-forever"
            onPress={handleDeleteOnPress}
          /> 
        </View>
        :
        <Button_Icon 
          style={{flex: 1, backgroundColor: color_button_green}}
          icon="plus"
          onPress={handleSaveOnPress}
        />
      }
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    backgroundColor: color_background_dark,
  },

  container_item: [
    styles_common.container_front,
    styles_common.container_list_item,
    {marginVertical: 2}
  ],

  container_list: {
    flex: 1,
    marginLeft: 5,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
});
