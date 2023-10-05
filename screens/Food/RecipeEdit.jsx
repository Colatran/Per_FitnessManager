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

  const [label, setLabel]                     = useState(recipe ? recipe.label            : "");
  const [servings, setServings]               = useState(servings ? recipe.servings       : "1");
  const [ingredients, setIngredients]         = useState(recipe.ingredients ? recipe.ingredients : []);
  const [ingredientsDocs, setIngredientsDocs] = useState([]);

  const [lockSwitch, setLockSwitch]           = useState(false);


  
  useEffect(() => {
    return onSnapshot(ref_food_ingredients, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIngredientsDocs(data);
    });
  }, []);



  const addIngredient = async (ingredient) => {
    const newIngredient = {amount: ingredient.unit, ingredient: ingredient};
    setIngredients([...ingredients, newIngredient]);

    const newDocs = ingredientsDocs.filter(item => item !== ingredient);
    setIngredientsDocs(newDocs);
  }
  const removeIngredient = async (ingredient) => {
    const newIngredients = ingredients.filter(item => item !== ingredient);
    setIngredients(newIngredients);
    
    const newDocs = [...ingredientsDocs, ingredient.ingredient];
    setIngredientsDocs(newDocs);
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



  const handleAddIngredientOnPress = (item) => {
    if(lockSwitch) return;
    setLockSwitch(true);

    addIngredient(item)
    .then(() => setLockSwitch(false));
  }
  const handleRemoveIngredientOnPress = (item) => {
    if(lockSwitch) return;
    setLockSwitch(true);

    removeIngredient(item)
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
            renderItem={({item}) => { 
              return(
                <View style={styles.container_item}>
                  <Text style={styles_text.common}>{item.label}</Text>
                  <View style={{flex: 1, justifyContent: "flex-end", flexDirection: "row"}}>
                    <Button_Icon style={styles.button} icon="plus" onPress={() => handleAddIngredientOnPress(item)}/>
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
            renderItem={({item}) => <Ingredient item={item} onRemove={() => handleRemoveIngredientOnPress(item)}/>}
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



const Ingredient = (props) => {
  const item = props.item;
  const removeOnPress = props.removeOnPress;



  const handleOnPress = () => {removeOnPress}



  const handleRemoveIngredientOnPress = (item) => {}



  return (
    <View style={styles.container_item}>
      <View style={{flex: 1}}>
        <Text style={styles_text.common}>{item.ingredient.label}</Text>
      </View>

      <View style={{flex: 1, paddingHorizontal: 5}}>
        <Input_Text/>
      </View>

      <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
        <Button_Icon style={styles.button} icon="close" onPress={() => handleOnPress()}/>
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
