import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { ref_food_ingredients } from "../../firebase.config";
import { getPhysicalState, make_ingredient } from "../../utils/Functions";
import {
  _borderWidth_xs, _space_l, _space_m, _space_s, _space_xs, _color_front_0, _icon_edit_list,
  styles_common, styles_text, styles_buttons
} from "../../styles/styles";
import { _ingredientEditScreen_deleteIngredient, _ingredientEditScreen_deleteServing, _recipeEditScreen_deleteRecipe } from "../../utils/Messages";
import Label from "../../components/Label";
import Input_Text from "../../components/input/Input_Text";
import Input_Boolean from "../../components/input/Input_Boolean";
import Button_Icon from "../../components/input/Button_Icon";
import Button_Footer_Form from "../../components/screen/Button_Footer_Form";
import Popup_ServingsEdit_List from "./components/Popup_ServingsEdit_List";
import Popup_ServingsEdit_Form from "./components/Popup_ServingsEdit_Form";



export default function IngredientEdit({ navigation, route }) {
  const { ingredient } = route.params;
  const isEdit = ingredient ? true : false;

  const [saveLock, setSaveLock] = useState(false);
  
  const [servingsEdit_popup, setServingsEdit_popup] = useState(false);
  const [servingsEdit_editServing_popup, setServingsEdit_editServing_popup] = useState(false);
  const [servingsEdit_editServing_add, setServingsEdit_editServing_add] = useState(false);
  const [servingsEdit_editServing_index, setServingsEdit_editServing_index] = useState(0);
  const [servingsEdit_editServing_label, setServingsEdit_editServing_label] = useState("");
  const [servingsEdit_editServing_amount, setServingsEdit_editServing_amount] = useState("0");

  const [label,         setLabel]         = useState(isEdit ? ingredient.label              : "");
  const [isSolid,       setIsSolid]       = useState(isEdit ? ingredient.isSolid            : true);
  const [unit_price,    setUnit_price]    = useState(isEdit ? `${ingredient.unit_price}`    : "0");
  const [unit_weight,   setUnit_weight]   = useState(isEdit ? `${ingredient.unit_weight}`   : "0");
  const [servings,      setServings]      = useState(isEdit ? ingredient.servings ? ingredient.servings : [] : []);
  const [servings_fav,  setServings_fav]  = useState(isEdit ? ingredient.servings_fav       : "0");
  const [nut_calories,  setNut_calories]  = useState(isEdit ? `${ingredient.nut_calories}`    : "0");
  const [nut_fats,      setNut_fats]      = useState(isEdit ? `${ingredient.nut_fats}`      : "0");
  const [nut_saturates, setNut_saturates] = useState(isEdit ? `${ingredient.nut_saturates}` : "0");
  const [nut_carbs,     setNut_carbs]     = useState(isEdit ? `${ingredient.nut_carbs}`     : "0");
  const [nut_sugars,    setNut_sugar]     = useState(isEdit ? `${ingredient.nut_sugars}`    : "0");
  const [nut_protein,   setNut_protein]   = useState(isEdit ? `${ingredient.nut_protein}`   : "0");
  const [nut_fiber,     setNut_fiber]     = useState(isEdit ? `${ingredient.nut_fiber}`     : "0");
  const [nut_salt,      setNut_salt]      = useState(isEdit ? `${ingredient.nut_salt}`      : "0");
  const recipeId = isEdit ? ingredient.recipeId : "";



  const saveIngredient = async () => {
    const data = make_ingredient(recipeId, label, isSolid, unit_price, unit_weight, servings, servings_fav,
      nut_calories, nut_fats, nut_saturates, nut_carbs, nut_sugars, nut_protein, nut_fiber, nut_salt);

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

  const addServing = () => {
    if(servings.length === 0) {
      setServings_fav(0);
    }

    const serving = {
      label: servingsEdit_editServing_label,
      amount: servingsEdit_editServing_amount,
    }
    setServings([...servings, serving]);
  }
  const deleteServing = (index) => {
    if (servings_fav == index) setServings_fav(0);
    else if(servings_fav > index) setServings_fav(servings_fav - 1);

    servings.splice(index, 1);
    setServings(servings);
  }
  const updateServing = (index) => {
    const newServings = [...servings];

    const serving = {
      label: servingsEdit_editServing_label,
      amount: servingsEdit_editServing_amount,
    }
    newServings[index] = serving;
    setServings(newServings);
  }
  const setFavouriteServing = (index) => {
    setServings_fav(index);
  }

  const set_popupServing_Edit = (index) => {
    setServingsEdit_editServing_add(false);
    setServingsEdit_editServing_label(servings[index].label);
    setServingsEdit_editServing_amount(`${servings[index].amount}`);
    setServingsEdit_editServing_index(index);
    setServingsEdit_editServing_popup(true);
  }
  const set_popupServing_Add = () => {
    setServingsEdit_editServing_add(true);
    setServingsEdit_editServing_label("");
    setServingsEdit_editServing_amount("");
    setServingsEdit_editServing_popup(true);
  }



  const gps = () => {
    return getPhysicalState(isSolid);
  }

  const onPress_SaveIngredient = () => {
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
  const onPress_DeleteIngredient = () => {
    deleteIngredient()
    .then(() => {
      navigation.goBack();
    })
    .catch((e) => {
      console.log(e);
    });
  }

  const onPress_IsSolid = () => {
    setIsSolid(!isSolid);
  }
  const onPress_servingsEdit = () => {
    setServingsEdit_popup(true);
  }

  const onPress_servingsEditPopup_add = () => {
    set_popupServing_Add();
  }
  const onPress_servingsEditPopup_list_edit = (index) => {
    set_popupServing_Edit(index);
  }
  const onPress_servingsEditPopup_list_favourite = (index) => {
    setFavouriteServing(index);
  }

  const onPress_servingsEditPopupEdit_save = () => {
    if (servingsEdit_editServing_add) addServing();
    else updateServing(servingsEdit_editServing_index);
    setServingsEdit_editServing_popup(false);
  }
  const onPress_servingsEditPopupEdit_delete = () => {
    deleteServing(servingsEdit_editServing_index);
    setServingsEdit_editServing_popup(false);
  }


  
  return (
    <View style={styles_common.container}>

      <Popup_ServingsEdit_List
        isVisible={servingsEdit_popup} setIsVisible={setServingsEdit_popup}
        list={servings}
        favIndex={servings_fav}
        sufix={gps()}
        onPressAdd={onPress_servingsEditPopup_add}
        onPressEdit={onPress_servingsEditPopup_list_edit}
        onPressFavourite={onPress_servingsEditPopup_list_favourite}
      />
      <Popup_ServingsEdit_Form
        isVisible={servingsEdit_editServing_popup} setIsVisible={setServingsEdit_editServing_popup}
        label={servingsEdit_editServing_label} setLabel={setServingsEdit_editServing_label}
        amount={servingsEdit_editServing_amount} setAmount={setServingsEdit_editServing_amount}
        isEditing={servingsEdit_editServing_add}
        onPressSave={onPress_servingsEditPopupEdit_save}
        onPressDelete={onPress_servingsEditPopupEdit_delete}
        formLabel={"Amount (" + gps() + ")"}
      />

      <ScrollView style={styles_common.form}>

        <View style={{marginBottom: _space_l}}>
          <Label label="Label">
            <Input_Text value={label} setValue={setLabel} placeholder={"Label"}/>
          </Label>
          <Label label="Is Solid">
            <Input_Boolean isOn={isSolid} onPress={onPress_IsSolid}/>
          </Label>
          <Label label="Unit Price (eur)">
            <Input_Text value={unit_price} setValue={setUnit_price} placeholder={""} keyboardType={"numeric"} />
          </Label>
          <Label label={`Unit Amount (${gps()})`}>
            <Input_Text value={unit_weight} setValue={setUnit_weight} placeholder={""} keyboardType={"numeric"}/>
          </Label>
          <Label label={`Servings`}>
            <View style={{flexDirection: "row"}}>
              <Button_Icon icon={_icon_edit_list} style={[styles_buttons.button_fill, styles_buttons.button_y]} onPress={onPress_servingsEdit}/>
            </View>
          </Label>
        </View>

        <Label label={`Nutrition (Per 100${gps()}):`}>
          <View style={styles.container_table}>
            <Parameter_Nut label="Calories (kcal)"    value={nut_calories}    setValue={setNut_calories}/>
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
        onPressAdd={() => onPress_SaveIngredient()}
        onPressSave={() => onPress_SaveIngredient()}
        onPressDelete={() => onPress_DeleteIngredient()}
        message={_ingredientEditScreen_deleteIngredient}
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
    paddingVertical: _space_xs,
    alignItems: "center",
    borderColor: _color_front_0,
    borderBottomWidth: _borderWidth_xs,
  },

  container_parameter_cell: {
    flex: 1
  }
});