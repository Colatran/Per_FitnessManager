import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { ref_food_ingredients } from "../../firebase.config";
import { addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { color_background_dark, color_button_green, color_button_red, styles_common, styles_text } from "../../styles/styles";
import Input_Text from "../../components/Input_Text";
import Button_Icon from "../../components/Button_Icon";
import Label from "../../components/Label";



export default function RedipeEdit({ navigation, route }) {
  const { recipe } = route.params;

  const [saveLock, setSaveLock] = useState(false);

  const [label, setLabel]             = useState(recipe ? recipe.label            : "");
  const [servings, setServings]       = useState(servings ? recipe.servings       : 1);
  const [isIngredient, setIsIngredient] = useState(servings ? recipe.isIngredient : false);
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients      : []);

  const [docs, setDocs] = useState([]);


  
  useEffect(() => {
    return onSnapshot(ref_food_ingredients, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocs(data);
    });
  }, []);



  const addIngredient = (ingredient) => {
    const newIngredients = [...ingredients];
    newIngredients.push({label: ingredient.label, data:{ingredientId: ingredient.id, amount: ingredient.unit}});
    setIngredients(newIngredients);
  }
  const saveRecipe = async () => {
    const data = {
      label: label,
      ingredients: ingredients,
      isIngredient: isIngredient,
      ingredients: ingredients,
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
    addIngredient(item);
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
        <ScrollView>
          <Label label="Label">
            <Input_Text value={label} setValue={setLabel} placeholder={"Label"}/>
          </Label>
          
          <Label label="Servings">
            <Input_Text value={servings} setValue={setServings} placeholder={""} keyboardType={"numeric"}/>
          </Label>
        </ScrollView>
      </View>

      <View style={{flexDirection: "row", flex: 1}}>
        <View style={{flex: 1, marginRight: 5, backgroundColor: "#a00"}}>
          <FlatList
            data={ingredients}
            renderItem={({item}) => { 
              return(
                <View style={[styles_common.container_front, styles_common.container_list_item]}>
                  <Text style={styles_text.common}>{item.label}</Text>
                  <View style={{flex: 1, justifyContent: "flex-end", flexDirection: "row"}}>
                    <Button_Icon style={styles.button} icon="delete" onPress={() => {}}/>
                  </View>
                </View>
              )
            }}
          />
        </View>

        <View style={{width: 1, marginRight: 5, backgroundColor: "#fff"}}/>

        <View style={{flex: 1, marginLeft: 5}}>
          <FlatList
            data={docs}
            renderItem={({item}) => { 
              return(
                <View style={[styles_common.container_front, styles_common.container_list_item]}>
                  <Text style={styles_text.common}>{item.label}</Text>
                  <View style={{flex: 1, justifyContent: "flex-end", flexDirection: "row"}}>
                    <Button_Icon style={styles.button} icon="plus" onPress={() => handleAddIngredientOnPress(item)}/>
                  </View>
                </View>
              )
            }}
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

function Paragraph(props) { return (<View style={{marginLeft: 30}}>{props.children}</View>);}
function Margin(props) { return (<View style={{margin: props.margin}}/>); }


const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    backgroundColor: color_background_dark,
  }
});
