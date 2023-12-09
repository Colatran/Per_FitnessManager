import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ref_food_ingredients, ref_food_recipes } from "../../firebase.config";
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { UserContext } from "../../utils/UserContext";
import { _color_back_0, _color_back_2, _icon_edit, _icon_edit_list, _space_l, _space_m,
  _space_s,
  styles_buttons, styles_common, styles_lists, styles_text
} from "../../styles/styles";
import { _recipeEditScreen_deleteIngredient, _recipeEditScreen_deleteRecipe } from "../../utils/Messages";
import { getPhysicalState } from "../../utils/Functions";
import List from "../../components/List";
import Label from "../../components/Label";
import Popup from "../../components/Popup";
import Input_Text from "../../components/input/Input_Text";
import Input_Boolean from "../../components/input/Input_Boolean";
import Button_Footer_Form from "../../components/screen/Button_Footer_Form";
import Button_Footer_Add from "../../components/screen/Button_Footer_Add";
import Button_YesNo from "../../components/screen/Button_YesNo";
import Button_Close from "../../components/screen/Button_Close";
import Button_Add from "../../components/screen/Button_Add";
import Button_Edit from "../../components/screen/Button_Edit";
import Button_Delete from "../../components/screen/Button_Delete";
import Button_Select from "../../components/screen/Button_Select";
import Display_Serving from "./components/Display_Serving";
import Button_Icon from "../../components/input/Button_Icon";
import Button_Favourite from "../../components/screen/Button_Favourite";
import Popup_ServingList from "../../components/screen/Popup_ServingList";



const FloorValue = (value) => { return Math.floor(value * Math.pow(10, 2)) / Math.pow(10, 2); }

export default function RecipeEdit({ navigation, route }) {
  const { recipe } = route.params;
  const { ingredientDocs } = useContext(UserContext);

  const isEdit = recipe ? true : false;

  const [incIngredientDocs, setIngredientDocs] = useState([]);
  const [label, setLabel]                 = useState(isEdit ? recipe.label : "");
  const [isSolid, setIsSolid]             = useState(isEdit ? recipe.isSolid : true);
  const [servings, setServings]           = useState(isEdit ? recipe.servings ? recipe.servings : [] : []);
  const [servings_fav, setServings_fav]   = useState(isEdit ? recipe.servings_fav : "0");
  const [ingredients, setIngredients] = useState([]);

  const [saveLock, setSaveLock] = useState(false);
  const [screen_finished_incIngredientDocs, setScreen_finished_incIngredientDocs] = useState(false);
  const [screen_finished_ingredients, setScreen_finished_ingredients] = useState(false);
  const [screen_effectLocked, setScreen_effectLocked] = useState(true);
  const [ingredients_call_amountEdit, setIngredients_call_amountEdit] = useState(false);
  
  const [addIngredient_popup, setAddIngredient_popup] = useState(false);

  const [amountEdit_popup, setAmountEdit_popup] = useState(false);
  const [amountEdit_index, setAmountEdit_index] = useState(0);
  const [amountEdit_value, setAmountEdit_value] = useState(0);
  const [amountEdit_multiply, setAmountEdit_multiply] = useState("1");
  const amountEdit_ingredient = ingredients[amountEdit_index] ? true : false;
  const amountEdit_label = amountEdit_ingredient ? ingredients[amountEdit_index].ingredient.label : ""; 
  const amountEdit_gps = getPhysicalState(amountEdit_ingredient ? ingredients[amountEdit_index].ingredient.isSolid : true);
  const amountEdit_servings = amountEdit_ingredient ? ingredients[amountEdit_index].ingredient.servings : [];

  const [servingsEdit_popup, setServingsEdit_popup] = useState(false);




  
  const Start = () => {
    const data = ingredientDocs.map((doc) => ({
      ...doc,
      include: true
    }));

    if (isEdit) {
      const ingData = recipe.ingredients;

      ingData.forEach(element => {
        const index = data.findIndex(item => item.id === element.ingredientId);
        const item = data[index];
        item.include = false;
        data[index] = item;
      });
      setIngredientDocs(data);

      setIngredients(ingData.map((doc) => ({
        ingredientId: doc.ingredientId,
        amount: doc.amount,
        ingredient: data[data.findIndex(item => item.id === doc.ingredientId)]
      })));
    }
    else {
      setIngredientDocs(data);
    }
  }
  useEffect(() => {
    Start();
  }, []);

  useEffect(() => {
    if(screen_effectLocked) setScreen_finished_incIngredientDocs(true);
  }, [incIngredientDocs]);
  useEffect(() => {
    if(screen_effectLocked) setScreen_finished_ingredients(true);
  }, [ingredients]);

  useEffect(() => {
    if(screen_finished_incIngredientDocs && screen_finished_ingredients)
      setScreen_effectLocked(false);
    return;
  }, [screen_finished_incIngredientDocs, screen_finished_ingredients]);

  useEffect (() => {
    if (screen_effectLocked) return;
    if (!ingredients_call_amountEdit) return;

    const newIndex = ingredients.length - 1;
    popupAmountEdit_set(newIndex);
    setAddIngredient_popup(false);
  }, [ingredients]);





  const getIngredientFromRecipe = (ingredients, recipeId) => {
    let unit_price = 0;
    let unit_weight = 0;
    let nut_energy = 0;
    let nut_fats = 0;
    let nut_saturates = 0;
    let nut_carbs = 0;
    let nut_sugars = 0;
    let nut_protein = 0;
    let nut_fiber = 0;
    let nut_salt = 0;

    ingredients.forEach(element => {
      const amount = parseFloat(element.amount);
      const ingredient = element.ingredient;
      const ingUnitWeight = ingredient.unit_weight;
      const ingUnitPrice = ingredient.unit_price;

      unit_price += parseFloat(amount * ingUnitPrice / ingUnitWeight);
      unit_weight += parseFloat(amount);

      nut_energy += parseFloat(amount * ingredient.nut_energy);
      nut_fats += parseFloat(amount * ingredient.nut_fats);
      nut_saturates += parseFloat(amount * ingredient.nut_saturates);
      nut_carbs += parseFloat(amount * ingredient.nut_carbs);
      nut_sugars += parseFloat(amount * ingredient.nut_sugars);
      nut_protein += parseFloat(amount * ingredient.nut_protein);
      nut_fiber += parseFloat(amount * ingredient.nut_fiber);
      nut_salt += parseFloat(amount * ingredient.nut_salt);
    });

    return ({
      label: label,
      recipeId: recipeId,
      isSolid: isSolid,
      unit_price: FloorValue(unit_price),
      unit_weight: FloorValue(unit_weight),
      unit_servings: parseInt(servings),
      nut_energy: FloorValue(nut_energy) / unit_weight,
      nut_fats: FloorValue(nut_fats) / unit_weight,
      nut_saturates: FloorValue(nut_saturates) / unit_weight,
      nut_carbs: FloorValue(nut_carbs) / unit_weight,
      nut_sugars: FloorValue(nut_sugars) / unit_weight,
      nut_protein: FloorValue(nut_protein) / unit_weight,
      nut_fiber: FloorValue(nut_fiber) / unit_weight,
      nut_salt: FloorValue(nut_salt) / unit_weight,
    })
  }

  const addIngredient = (index) => {
    const ingDoc = incIngredientDocs[index];
    const newIng = { ingredientId: ingDoc.id, amount: `${FloorValue(ingDoc.servings[ingDoc.servings_fav].amount)}`, ingredient: ingDoc };
    setIngredients([...ingredients, newIng]);

    incIngredientDocs[index].include = false;
    setIngredientDocs(incIngredientDocs);
  }
  const removeIngredient = async (index) => {
    const ingId = ingredients[index].ingredientId;
    const indexDoc = incIngredientDocs.findIndex(item => item.id === ingId);

    incIngredientDocs[indexDoc].include = true;
    setIngredientDocs(incIngredientDocs);

    ingredients.splice(index, 1);
    setIngredients(ingredients);
  }
  const updateIngredientAmount = async (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].amount = value;
    setIngredients(newIngredients);
  }

  const saveRecipe = async () => {
    const ingredietData = ingredients.map((item) => ({ ingredientId: item.ingredientId, amount: item.amount }));

    const recipeData = {
      label: label,
      isSolid: isSolid,
      servings: servings,
      ingredients: ingredietData,
    }


    if (isEdit) {
      const recipeDocRef = doc(ref_food_recipes, recipe.id);
      let ingDocRef;

      const q = query(ref_food_ingredients, where('recipeId', '==', recipe.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((item) => { ingDocRef = doc(ref_food_ingredients, item.id) });

      const recipeIngredientData = getIngredientFromRecipe(ingredients, recipe.id);

      await updateDoc(recipeDocRef, recipeData).then(() => {
        updateDoc(ingDocRef, recipeIngredientData);
      });
    }
    else {
      const recipeId = (await addDoc(ref_food_recipes, recipeData)).id;
      const recipeIngredientData = getIngredientFromRecipe(ingredients, recipeId);
      return await addDoc(ref_food_ingredients, recipeIngredientData);
    }
  }
  const deleteRecipe = async () => {
    const q = query(ref_food_ingredients, where('recipeId', '==', recipe.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      const docRef = doc(ref_food_ingredients, item.id)
      deleteDoc(docRef);
    });

    const docRef = doc(ref_food_recipes, recipe.id);
    return deleteDoc(docRef);
  }

  const toggleIsSolid = () => {
    setIsSolid(!isSolid);
  }

  const popupAmountEdit_set = (index) => {
    setAmountEdit_index(index);
    setAmountEdit_value(ingredients[index].amount);
    setAmountEdit_popup(true);
  }

  const setFavouriteServing = (index) => {
    setServings_fav(index);
  }
  const set_popupServing_Edit = (index) => {
    setServingsEdit_editServing_add(false);
    setServingsEdit_editServing_label(servings[index].label);
    setServingsEdit_editServing_amount(servings[index].amount);
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

  const onPress_Save = () => {
    if (saveLock) return;
    setSaveLock(true);

    saveRecipe()
      .then(() => {
        setSaveLock(false);
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
        setSaveLock(false)
      });
  }
  const onPress_Delete = () => {
    deleteRecipe()
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const onPress_IsSolid = () => {
    toggleIsSolid();
  }
  const onPress_ServingsEdit = () => {
    setServingsEdit_popup(true);
  }

  const onPress_IngredientList_AddIngredient = () => {
    setIngredients_call_amountEdit(true);
    setAddIngredient_popup(true);
  }
  const onPress_IngredientList_ListItem_Edit = (index) => {
    popupAmountEdit_set(index);
  }

  const onPress_PopupAddIngredient_ListItem_Add = (index) => {
    addIngredient(index);
  }

  const onPress_PopupAmountEdit_Save = () => {
    setIngredients_call_amountEdit(false);
    updateIngredientAmount(amountEdit_index, amountEdit_value);
    setAmountEdit_popup(false);
  }
  const onPress_PopupAmountEdit_Close = () => {
    setAmountEdit_popup(false);
  }
  const onPress_PopupAmountEdit_Delete = () => {
    setIngredients_call_amountEdit(false);
    removeIngredient(amountEdit_index);
    setAmountEdit_popup(false);
  }
  const onPress_PopupAmountEdit_Select = (index) => {
    const selectedAmount = amountEdit_servings[index].amount * parseInt(amountEdit_multiply);
    setAmountEdit_value((selectedAmount)+"");
  }

  const onPress_servingsEditPopup_close = () => {
    setServingsEdit_popup(false);
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

  


  
  return (
    <View style={styles_common.container}>

      <Popup isVisible={amountEdit_popup}>
        <View style={{flex: 1}}/>

        <View style={[styles_common.form, {flex: 4}]}>
          <View style={{ flexDirection: "row"}}>
            <Text style={[styles_text.bold, {flex:1}]}>{amountEdit_label}</Text>
            <Button_Delete onPress={onPress_PopupAmountEdit_Delete} message={_recipeEditScreen_deleteIngredient}/>
          </View>

          <Label label={"Amount (" + getPhysicalState(amountEdit_gps) + ")"}>
            <Input_Text 
              value={amountEdit_value} setValue={setAmountEdit_value} 
              placeholder={""} keyboardType={"numeric"} style={{alignItems: "center"}}
            />
          </Label>

          <View style={{flexDirection: "row", flex: 1, marginTop: _space_m}}>
            <View style={{flex: 1, paddingRight: _space_m}}>
              <Label label={"Multiply"}>
                <Input_Text 
                  value={amountEdit_multiply} setValue={setAmountEdit_multiply} 
                  placeholder={""} keyboardType={"numeric"} style={{alignItems: "center"}}
                />
              </Label>
            </View>

            <View style={[styles_common.container_front, styles_lists.container_list, {flex: 2}]}>
              <List data={amountEdit_servings}>
                <ListItem_IngredientServing gps={amountEdit_gps} onPressSelect={onPress_PopupAmountEdit_Select}/>
              </List>
            </View>
          </View>
        </View>

        <View style={styles_buttons.container_footer}>
          <Button_YesNo style={styles_buttons.button_fill} onPressYes={onPress_PopupAmountEdit_Save} onPressNo={onPress_PopupAmountEdit_Close} />
        </View>

        <View style={{flex: 1}}/>
      </Popup>

      <Popup_ServingList isVisible={addIngredient_popup} setIsVisible={setAddIngredient_popup}>
        <List data={incIngredientDocs}>
          <ListItem_IngredientToAdd onPressAdd={onPress_PopupAddIngredient_ListItem_Add}/>
        </List>
      </Popup_ServingList>

      <Popup isVisible={servingsEdit_popup}>
        <View style={{flex: 1}}/>

        <View style={[styles_common.form, {flex: 4}]}>
          <View style={{flex: 1}}>
            <List data={servings}>
              <ListItem_Serving 
                gps={gps()} favIndex={servings_fav} 
                onPressEdit={onPress_servingsEditPopup_list_edit}
                onPressFavourite={onPress_servingsEditPopup_list_favourite}
              />
            </List>
          </View>
          <View style={{flexDirection: "row"}}>
            <Button_Add style={styles_buttons.button_fill} onPress={onPress_servingsEditPopup_add}/>
          </View>
        </View>

        <View style={styles_buttons.container_footer}>
          <Button_Close style={styles_buttons.button_fill} onPress={onPress_servingsEditPopup_close} />
        </View>
        <View style={{ flex: 1 }}/>
      </Popup>

      <View style={[styles_common.form, {flex: 1}]}>
        <View style={{ marginBottom: _space_l }}>
          <Label label="Label">
            <Input_Text value={label} setValue={setLabel} placeholder={"Label"} />
          </Label>
          <Label label="Is Solid">
            <Input_Boolean isOn={isSolid} onPress={onPress_IsSolid} />
          </Label>
          <Label label={`Servings`}>
            <View style={{flexDirection: "row"}}>
              <Button_Icon icon={_icon_edit_list} style={[styles_buttons.button_fill, styles_buttons.button_y]} onPress={onPress_ServingsEdit}/>
            </View>
          </Label>
        </View>

        <Label label="Ingredients" style={{flex: 1}}>
          <View style={[styles_common.container_front, styles_lists.container_list]}>
            <List data={ingredients}>
              <ListItem_IngredientAdded onPressEdit={(index) => onPress_IngredientList_ListItem_Edit(index)} />
            </List>
            <Button_Footer_Add
              style={{ marginVertical: _space_m }}
              onPress={onPress_IngredientList_AddIngredient}
            />
          </View>
        </Label>
      </View>

      <Button_Footer_Form
        isEdit={isEdit}
        onPressAdd={() => onPress_Save()}
        onPressSave={() => onPress_Save()}
        onPressDelete={() => onPress_Delete()}
        message={_recipeEditScreen_deleteRecipe}
      />
    </View>
  );
}





function ListItem_IngredientAdded(props) {
  const { item, index } = props;

  const onPressEdit = props.onPressEdit;
  
  const state = getPhysicalState(item.ingredient.isSolid);
  
  return (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row" }]}>
        <Text style={[styles_text.common, { flex: 1 }]}>{item.amount} {state}</Text>
        <Text style={[styles_text.label, { flex: 3 }]}>{item.ingredient.label}</Text>
      </View>
      <Button_Edit onPress={() => onPressEdit(index)}/>
    </View>
  );
}

function ListItem_IngredientToAdd(props) {
  const { item, index } = props;

  const onPressAdd = props.onPressAdd;

  return  item.include ? (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row" }]}>
        <Text style={styles_text.label}>{item.label}</Text>
      </View>
      <Button_Add onPress={() => onPressAdd(index)}/>
    </View>
  ) : (
    <></>
  );
}

function ListItem_IngredientServing(props) {
  const { item, index } = props;

  const gps = props.gps;
  const onPressSelect = props.onPressSelect;

  return (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row" }]}>
        <Display_Serving gps={gps} flex={2} amount={item.amount} label={item.label}/>
      </View>
      <Button_Select onPress={()=>{onPressSelect(index)}} />
    </View>
  );
}

function ListItem_Serving(props) {
  const { item, index } = props;

  const gps = props.gps;
  const favIndex = props.favIndex;

  const onPressEdit = () => {
    props.onPressEdit(index);
  };
  const onPressFavourite = () => {
    props.onPressFavourite(index);
  };

  return (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row", alignItems: "center" }]}>
        <Display_Serving gps={gps} flex={3} amount={item.amount} label={item.label}/>
      </View>
      <Button_Favourite isFavourite={favIndex == index} onPress={onPressFavourite} style={{marginHorizontal: _space_s}}/>
      <Button_Edit onPress={onPressEdit}/>
    </View>
  );
}