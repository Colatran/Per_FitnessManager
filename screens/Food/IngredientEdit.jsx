import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { ref_food_ingredients } from "../../firebase.config";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { getPhysicalState } from "../../utils/Funtions";
import {
  _borderWidth_xs, _space_l, _space_m, _space_xs,
  _color_back_2, _color_front_0,
  styles_common, styles_text
} from "../../styles/styles";
import Label from "../../components/Label";
import Input_Text from "../../components/input/Input_Text";
import Input_Boolean from "../../components/input/Input_Boolean";
import Button_Footer_Form from "../../components/screen/Button_Footer_Form";



export default function IngredientEdit({ navigation, route }) {
  const { ingredient } = route.params;
  const isEdit = ingredient ? true : false;

  const [saveLock, setSaveLock] = useState(false);

  const [recipeId,      setRecipeId]      = useState(isEdit ? ingredient.recipeId           : "");
  const [label,         setLabel]         = useState(isEdit ? ingredient.label              : "");
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
      <ScrollView style={styles_common.form}>

        <View style={{marginBottom: _space_l}}>
          <Label label="Label">
            <Input_Text value={label} setValue={setLabel} placeholder={"Label"}/>
          </Label>
          <Label label="Is Solid">
            <Input_Boolean isOn={isSolid} onPress={handleIsSolidOnPress}/>
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
        </View>

        <Label label={`Nutrition (Per 100${gps()}): `}>
          <View style={styles.container_table}>
            <Parameter_Nut label="Calories (kcal)"    value={nut_energy}    setValue={setNut_energy}/>
            <Parameter_Nut label="Fat (g)"            value={nut_fats}      setValue={setNut_fats}/>
            <Parameter_Nut label="Saturates (g)"      value={nut_saturates} setValue={setNut_saturates} hasPadding={true}/>
            <Parameter_Nut label="Carbohydrate (g)"   value={nut_carbs}     setValue={setNut_carbs}/>
            <Parameter_Nut label="Sugars (g)"         value={nut_sugars}    setValue={setNut_sugar}     hasPadding={true}/>
            <Parameter_Nut label="Fiber (g)"          value={nut_fiber}     setValue={setNut_fiber}     hasPadding={true}/>
            <Parameter_Nut label="Protein (g)"        value={nut_protein}   setValue={setNut_protein}/>
            <Parameter_Nut label="Salt (g)"           value={nut_salt}      setValue={setNut_salt}/>
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



function Parameter_Nut(props) {
  const label = props.label;
  const value = props.value;
  const setValue = props.setValue;
  const hasPadding = props.hasPadding;

  const padding = hasPadding ? _space_l : 0;

  return (
    <View style={styles.container_parameter}>
      <View style={styles.container_parameter_cell}>
        <Text style={[styles_text.label, {paddingLeft: padding}]}>{label}</Text>
      </View>
      <View style={styles.container_parameter_cell}>
        <Input_Text value={value} setValue={setValue} placeholder={""} keyboardType={"numeric"}/>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container_table: {
    borderColor: _color_front_0,
    borderTopWidth: _borderWidth_xs
  },

  container_parameter: {
    flexDirection: "row",
    paddingHorizontal: _space_m,
    alignItems: "center",
    borderColor: _color_front_0,
    borderBottomWidth: _borderWidth_xs,
    paddingVertical: _space_xs,
  },

  container_parameter_cell: {
    flex: 1
  }
});