import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { ref_food_ingredients } from "../../firebase.config";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { color_button_green, color_button_red, styles_common, styles_text } from "../../styles/styles";
import Label from "../../components/Label";
import Input_Text from "../../components/Input_Text";
import Button_Icon from "../../components/Button_Icon";



export default function IngredientEdit({ navigation, route }) {
  const { ingredient } = route.params;

  const [saveLock, setSaveLock] = useState(false);

  const [label, setLabel]           = useState(ingredient ? ingredient.label      : "");
  const [unitPrice, setUnitPrice]   = useState(ingredient ? ingredient.unitPrice  : 0);
  const [unitWeight, setUnitWeight] = useState(ingredient ? ingredient.unitWeight : 0);
  const [energy, setEnergy]         = useState(ingredient ? ingredient.energy     : 0);
  const [fats, setFats]             = useState(ingredient ? ingredient.fats       : 0);
  const [saturates, setSaturates]   = useState(ingredient ? ingredient.saturates  : 0);
  const [carbs, setCarbs]           = useState(ingredient ? ingredient.carbs      : 0);
  const [sugars, setSugar]          = useState(ingredient ? ingredient.sugars     : 0);
  const [protein, setProtein]       = useState(ingredient ? ingredient.protein    : 0);
  const [salt, setSalt]             = useState(ingredient ? ingredient.salt       : 0);
  const [fiber, setFiber]           = useState(ingredient ? ingredient.fiber      : 0);
  const [recipeId, setRecipeId]     = useState(ingredient ? ingredient.recipeId   : "");

  const isRecipe = recipeId !== "";



  const saveIngredient = async () => {
    const data = {
      label: label,
      unit: unit,
      energy: energy,
      fats: fats,
      saturates: saturates,
      carbs: carbs,
      sugars: sugars,
      protein: protein,
      salt: salt,
      fiber: fiber,
      recipeId: recipeId,
    }

    if(ingredient) {
      const docRef = doc(ref_food_ingredients, ingredient.id);
      return await updateDoc(docRef, data);
    } 
    else {
      return await addDoc(ref_food_ingredients, data);
    }
  }
  const deleteIngredient = async () => {
    const docRef = doc(ref_food_ingredients, ingredient.id);
    return deleteDoc(docRef);
  }



  const handleSaveOnPress = () => {
    if(saveLock) return;
    setSaveLock(true);
    saveIngredient()
    .then(() => {
      setSaveLock(false);
      navigation.goBack();
    })
    .catch((e) => {
      console.log(e);
      setSaveLock(false)});
  }
  const handleDeleteOnPress = () => {
    deleteIngredient()
    .then(() => {
      navigation.goBack();
    })
    .catch((e) => {
      console.log(e);
    });
  }
  const handleCheckOnPress = () => {
    navigation.goBack();
  }



  return (
    <View style={styles_common.container}>
      <ScrollView>
        <Label label="Label">
          <Input_Text value={label} setValue={setLabel} placeholder={"Label"}/>
        </Label>
      
        <Label label="Unit Price (eur)">
          <Input_Text value={unitPrice} setValue={setUnitPrice} placeholder={""} keyboardType={"numeric"} />
        </Label>

        <Label label="Unit Weight (g)">
          <Input_Text value={unitWeight} setValue={setUnitWeight} placeholder={""} keyboardType={"numeric"}/>
        </Label>

        <Label label="Nutrition (Per 100g): ">
          <View style={{marginLeft: 10}}>
            <Label label="Energy (kcal)">
              <Input_Text value={energy} setValue={setEnergy} placeholder={""} keyboardType={"numeric"}/>
            </Label>

            <Label label="Fat (g)">
              <Input_Text value={fats} setValue={setFats} placeholder={""} keyboardType={"numeric"}/>
              <Paragraph>
                <Label label="Saturates (g)" noMargin={true}>
                  <Input_Text value={saturates} setValue={setSaturates} placeholder={""} keyboardType={"numeric"}/>
                </Label>
              </Paragraph>
            </Label>

            <Label label="Carbohydrate (g)">
              <Input_Text value={carbs} setValue={setCarbs} placeholder={""} keyboardType={"numeric"}/>
              <Paragraph>
                <Label label="Sugars (g)" noMargin={true}>
                  <Input_Text value={sugars} setValue={setSugar} placeholder={""} keyboardType={"numeric"}/>
                </Label>
              </Paragraph>
            </Label>

            <Label label="Protein (g)">
              <Input_Text value={protein} setValue={setProtein} placeholder={""} keyboardType={"numeric"}/>
            </Label>

            <Label label="Salt (g)">
              <Input_Text value={salt} setValue={setSalt} placeholder={""} keyboardType={"numeric"}/>
            </Label>

            <Label label="Fiber (g)">
              <Input_Text value={fiber} setValue={setFiber} placeholder={""} keyboardType={"numeric"}/>
            </Label>
          </View>
        </Label>
      </ScrollView>

      <View style={{flex:1, flexDirection: "row", alignItems: "flex-end", marginVertical: 20}}>
      {
        isRecipe ? 
          <Button_Icon 
            style={{flex: 1, backgroundColor: color_button_green, marginRight: 5}}
            icon="check"
            onPress={handleCheckOnPress}
          /> 
        :
        ingredient ?
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