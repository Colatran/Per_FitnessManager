import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { ref_food_ingredients } from "../../firebase.config";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { getPhysicalState } from "../../utils/Funtions";
import {
  _borderWidth_xs, _space_l, _space_m, _space_xs,
  _color_back_2, _color_front_0,
  styles_common, styles_text, _icon_edit, _icon_edit_list, styles_buttons, styles_lists
} from "../../styles/styles";
import Label from "../../components/Label";
import Input_Text from "../../components/input/Input_Text";
import Input_Boolean from "../../components/input/Input_Boolean";
import Button_Footer_Form from "../../components/screen/Button_Footer_Form";
import { _ingredientEditScreen_deleteIngredient, _ingredientEditScreen_deleteServing, _recipeEditScreen_deleteRecipe } from "../../utils/Messages";
import Button_Icon from "../../components/input/Button_Icon";
import Popup from "../../components/Popup";
import Button_Close from "../../components/screen/Button_Close";
import List from "../../components/List";
import Button_Edit from "../../components/screen/Button_Edit";
import Button_Add from "../../components/screen/Button_Add";
import Button_YesNo from "../../components/screen/Button_YesNo";
import Button_Delete from "../../components/screen/Button_Delete";



export default function IngredientEdit({ navigation, route }) {
  const { ingredient } = route.params;
  const isEdit = ingredient ? true : false;

  const [saveLock, setSaveLock] = useState(false);
  
  const [servingsEdit_popup, setServingsEdit_popup] = useState(false);
  const [servingsEdit_editServing_popup, setServingsEdit_editServing_popup] = useState(false);
  const [servingsEdit_editServing_label, setServingsEdit_editServing_label] = useState("");
  const [servingsEdit_editServing_amount, setServingsEdit_editServing_amount] = useState("0");

  const [recipeId,      setRecipeId]      = useState(isEdit ? ingredient.recipeId           : "");
  const [label,         setLabel]         = useState(isEdit ? ingredient.label              : "");
  const [isSolid,       setIsSolid]       = useState(isEdit ? ingredient.isSolid            : true);
  const [unit_price,    setUnit_price]    = useState(isEdit ? `${ingredient.unit_price}`    : "0");
  const [unit_weight,   setUnit_weight]   = useState(isEdit ? `${ingredient.unit_weight}`   : "0");
  const [servings,      setServings]      = useState(isEdit ? ingredient.servings           : []);
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
      servings:       servings,
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

  const onPress_ServingsEdit = () => {
    setServingsEdit_popup(true);
  }
  const onPress_ServingsEditPopup_Close = () => {
    setServingsEdit_popup(false);
  }
  const onPress_ServingsEditPopup_Add = () => {
    setServingsEdit_editServing_popup(true);
  }


  const onPress_ServingsEdit_edit_save = () => {
    
  }
  const onPress_ServingsEdit_edit_close = () => {
    setServingsEdit_editServing_popup(false);
  }
  const onPress_ServingsEdit_edit_delete = () => {
    setServingsEdit_editServing_popup(false);
  }






  return (
    <View style={styles_common.container}>

      <Popup isVisible={servingsEdit_popup}>
        <View style={{ flex: 1 }}/>
        <View style={[styles_common.form, { flex: 4 }]}>
          <List data={servings}>
            <ListItem_Serving/>
          </List>
          
          <View style={{flexDirection: "row"}}>
            <Button_Add style={styles_buttons.button_fill} onPress={onPress_ServingsEditPopup_Add}/>
          </View>
        </View>
        <View style={styles_buttons.container_footer}>
          <Button_Close style={styles_buttons.button_fill} onPress={onPress_ServingsEditPopup_Close} />
        </View>
        <View style={{ flex: 1 }}/>
      </Popup>

      <Popup isVisible={servingsEdit_editServing_popup}>
        <View style={styles_common.form}>
          <Label label={"Label"}>
            <Input_Text value={servingsEdit_editServing_label} setValue={setServingsEdit_editServing_label} placeholder={""}/>
          </Label>
          <Label label={"Amount (" + getPhysicalState(isSolid) + ")"}>
            <Input_Text value={servingsEdit_editServing_amount} setValue={setServingsEdit_editServing_amount} placeholder={""} keyboardType={"numeric"}/>
          </Label>
          <View style={{ alignItems: "flex-end" }}>
            <Button_Delete onPress={onPress_ServingsEdit_edit_delete} message={_ingredientEditScreen_deleteServing} />
          </View>
        </View>

        <View style={styles_buttons.container_footer}>
          <Button_YesNo style={styles_buttons.button_fill} onPressYes={onPress_ServingsEdit_edit_save} onPressNo={onPress_ServingsEdit_edit_close} />
        </View>
      </Popup>

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
          <Label label={`Servings`}>
            <View style={{flexDirection: "row"}}>
              <Button_Icon icon={_icon_edit_list} style={[styles_buttons.button_fill, styles_buttons.button_y]} onPress={onPress_ServingsEdit}/>
            </View>
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
        onPressAdd={() => handleSaveOnPress()}
        onPressSave={() => handleSaveOnPress()}
        onPressDelete={() => handleDeleteOnPress()}
        message={_ingredientEditScreen_deleteIngredient}
      />
    </View>
  );
}



function ListItem_Serving(props) {
  const { item, index } = props;

  const onPress = () => {
    props.onPressAdd(index);
  };

  return (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row" }]}>
        <Text style={{flex: 1}}>{item.label}</Text>
        <Text style={[styles_text.label, {flex: 1}]}>{item.label}</Text>
        
      </View>
      <Button_Edit onPress={onPress} />
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