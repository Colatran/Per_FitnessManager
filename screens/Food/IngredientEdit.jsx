import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { ref_food_ingredients } from "../../firebase.config";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { color_background_dark, color_background_light, styles_common, styles_text } from "../../styles/styles";
import { getPhysicalState } from "../../utils/Funtions";
import Label from "../../components/Label";
import Input_Text from "../../components/Input_Text";
import Button_Icon from "../../components/Button_Icon";
import Button_Footer_Form from "../../components/Button_Footer_Form";



export default function IngredientEdit({ navigation, route }) {
  const { ingredient } = route.params;
  const isEdit = ingredient ? true : false;

  const [saveLock, setSaveLock] = useState(false);

  const [label,         setLabel]         = useState(isEdit ? ingredient.label              : "");
  const [recipeId,      setRecipeId]      = useState(isEdit ? ingredient.recipeId           : "");
  const [isSolid,       setIsSolid]       = useState(isEdit ? ingredient.isSolid            : true);
  const [unit_price,    setUnit_price]    = useState(isEdit ? `${ingredient.unit_price}`    : "0");
  const [unit_weight,   setUnit_weight]   = useState(isEdit ? `${ingredient.unit_weight}`   : "0");
  const [unit_servings, setUnit_servings] = useState(isEdit ? `${ingredient.unit_servings}` : "0");
  const [nut_energy,    setNut_energy]    = useState(isEdit ? `${ingredient.nut_energy}`    : "0");
  const [nut_fats,      setNut_fats]      = useState(isEdit ? `${ingredient.nut_fats}`      : "0");
  const [nut_saturates, setNut_saturates] = useState(isEdit ? `${ingredient.nut_saturates}` : "0");
  const [nut_carbs,     setNut_carbs]     = useState(isEdit ? `${ingredient.nut_carbs}`     : "0");
  const [nut_sugars,    setNut_sugar]     = useState(isEdit ? `${ingredient.nut_sugars}`    : "0");
  const [nut_protein,   setNut_protein]   = useState(isEdit ? `${ingredient.nut_protein}`   : "0");
  const [nut_fiber,     setNut_fiber]     = useState(isEdit ? `${ingredient.nut_fiber}`     : "0");
  const [nut_salt,      setNut_salt]      = useState(isEdit ? `${ingredient.nut_salt}`      : "0");



  const saveIngredient = async () => {
    const data = {
      label:          label,
      recipeId:       recipeId,
      isSolid:        isSolid,
      unit_price:     parseFloat(unit_price),
      unit_weight:    parseFloat(unit_weight),
      unit_servings:  parseInt(unit_servings),
      nut_energy:     parseFloat(nut_energy),
      nut_fats:       parseFloat(nut_fats),
      nut_saturates:  parseFloat(nut_saturates),
      nut_carbs:      parseFloat(nut_carbs),
      nut_sugars:     parseFloat(nut_sugars),
      nut_protein:    parseFloat(nut_protein),
      nut_fiber:      parseFloat(nut_fiber),
      nut_salt:       parseFloat(nut_salt),
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

  

  const gps = () => {return getPhysicalState(isSolid);}

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
  const handleIsSolidOnPress = () => {
    setIsSolid(!isSolid);
  }



  return (
    <View style={styles_common.container}>
      <ScrollView>

        <Label label="Label">
          <Input_Text value={label} setValue={setLabel} placeholder={"Label"}/>
        </Label>
        <Label label="Is Solid">
          <Button_Icon icon={isSolid ? "check" : ""} onPress={handleIsSolidOnPress}/>
        </Label>
        <Label label="Unit Price (eur)">
          <Input_Text value={unit_price} setValue={setUnit_price} placeholder={""} keyboardType={"numeric"} />
        </Label>
        <Label label={`Unit Amount (${gps()})`}>
          <Input_Text value={unit_weight} setValue={setUnit_weight} placeholder={""} keyboardType={"numeric"}/>
        </Label>
        <Label label={`Unit Servings`}>
          <Input_Text value={unit_servings} setValue={setUnit_servings} placeholder={""} keyboardType={"numeric"}/>
        </Label>

        <Label label={`Nutrition (Per 100${gps()}): `}>
          <View style={{marginLeft: 10, borderColor: "#fff", borderTopWidth: 1,}}>
            <Parameter label="Energy (kcal)"      value={nut_energy}    setValue={setNut_energy}/>
            <Parameter label="Fat (g)"            value={nut_fats}      setValue={setNut_fats}/>
            <Parameter label="     Saturates (g)" value={nut_saturates} setValue={setNut_saturates}/>
            <Parameter label="Carbohydrate (g)"   value={nut_carbs}     setValue={setNut_carbs}/>
            <Parameter label="     Sugars (g)"    value={nut_sugars}    setValue={setNut_sugar}/>
            <Parameter label="Protein (g)"        value={nut_protein}   setValue={setNut_protein}/>
            <Parameter label="Fiber (g)"          value={nut_fiber}     setValue={setNut_fiber}/>
            <Parameter label="Salt (g)"           value={nut_salt}      setValue={setNut_salt}/>
          </View>
        </Label>

      </ScrollView>

      <Button_Footer_Form
        isEdit={isEdit}
        onPressSaveNew={() => handleSaveOnPress()}
        onPressSave={() => handleSaveOnPress()}
        onPressDelete={() => handleDeleteOnPress()}
      />
    </View>
  );
}



function Parameter(props) {
  const label = props.label;
  const value = props.value;
  const setValue = props.setValue;

  return (
    <View style={{flexDirection: "row", borderColor: "#fff", borderBottomWidth: 1}}>
      <View style={[styles.container, {backgroundColor: color_background_light}]}>
        <Text style={styles_text.bold}>{label}</Text>
      </View>
      <View style={[styles.container, {backgroundColor: color_background_dark}]}>
        <Input_Text value={value} setValue={setValue} placeholder={""} keyboardType={"numeric"}/>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 3,
    paddingLeft: 10,
  }
});