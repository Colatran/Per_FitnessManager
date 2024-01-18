import { View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ref_food_ingredients, ref_food_meals } from "../../firebase.config";
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { UserContext } from "../../utils/UserContext";
import { _icon_edit_list, _space_l, _space_m, styles_common, styles_lists, styles_text } from "../../styles/styles";
import { _mealEditScreen_deleteIngredient, _mealEditScreen_deleteMeal } from "../../utils/Messages";
import { getPhysicalState, make_meal } from "../../utils/Functions";
import List from "../../components/List";
import Label from "../../components/Label";
import Input_Text from "../../components/input/Input_Text";
import Button_Footer_Form from "../../components/screen/Button_Footer_Form";
import Button_Footer_Add from "../../components/screen/Button_Footer_Add";
import Button_Edit from "../../components/screen/Button_Edit";
import Popup_List_Add from "./components/Popup_List_Add";
import Popup_Ingredient_EditAmount from "./components/Popup_Ingredient_EditAmount";



const FloorValue = (value) => { return Math.floor(value * Math.pow(10, 2)) / Math.pow(10, 2); }

export default function MealEdit({ navigation, route }) {
  const { meal } = route.params;
  const { ingredientDocs } = useContext(UserContext);

  const isEdit = meal ? true : false;

  const [incIngredientDocs, setIngredientDocs] = useState([]);
  const [label, setLabel] = useState(isEdit ? meal.label : "");
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
  const amountEdit_isSolid = amountEdit_ingredient ? ingredients[amountEdit_index].ingredient.isSolid : true;
  const amountEdit_servings = amountEdit_ingredient ? ingredients[amountEdit_index].ingredient.servings : [];



  const Start = () => {
    const data = ingredientDocs.map((doc) => ({
      ...doc,
      include: true
    }));

    if (isEdit) {
      const ingData = meal.ingredients;

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
    if (screen_effectLocked) setScreen_finished_incIngredientDocs(true);
  }, [incIngredientDocs]);
  useEffect(() => {
    if (screen_effectLocked) setScreen_finished_ingredients(true);
  }, [ingredients]);

  useEffect(() => {
    if (screen_finished_incIngredientDocs && screen_finished_ingredients)
      setScreen_effectLocked(false);
    return;
  }, [screen_finished_incIngredientDocs, screen_finished_ingredients]);

  useEffect(() => {
    if (screen_effectLocked) return;
    if (!ingredients_call_amountEdit) return;

    const newIndex = ingredients.length - 1;
    popupAmountEdit_set(newIndex);
    setAddIngredient_popup(false);
  }, [ingredients]);



  const meal_save = async () => {
    const ingredietData = ingredients.map((item) => ({ ingredientId: item.ingredientId, amount: item.amount }));

    const mealData = make_meal(label, ingredietData);

    if (isEdit) {
      const mealDocRef = doc(ref_food_meals, meal.id);
      await updateDoc(mealDocRef, mealData);
    }
    else {
      await addDoc(ref_food_meals, mealData);
    }
  }
  const meal_delete = async () => {
    const q = query(ref_food_ingredients, where('mealId', '==', meal.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      const docRef = doc(ref_food_ingredients, item.id)
      deleteDoc(docRef);
    });

    const docRef = doc(ref_food_meals, meal.id);
    return deleteDoc(docRef);
  }

  const ingredients_add = (index) => {
    const ingDoc = incIngredientDocs[index];
    const newIng = { ingredientId: ingDoc.id, amount: `${FloorValue(ingDoc.servings[ingDoc.servings_fav].amount)}`, ingredient: ingDoc };
    setIngredients([...ingredients, newIng]);

    incIngredientDocs[index].include = false;
    setIngredientDocs(incIngredientDocs);
  }
  const ingredients_remove = async (index) => {
    const ingId = ingredients[index].ingredientId;
    const indexDoc = incIngredientDocs.findIndex(item => item.id === ingId);

    incIngredientDocs[indexDoc].include = true;
    setIngredientDocs(incIngredientDocs);

    ingredients.splice(index, 1);
    setIngredients(ingredients);
  }
  const ingredients_updateAmount = async (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].amount = value;
    setIngredients(newIngredients);
  }

  const popupAmountEdit_set = (index) => {
    setAmountEdit_index(index);
    setAmountEdit_value(`${ingredients[index].amount}`);
    setAmountEdit_popup(true);
  }



  const onPress_Save = () => {
    if (saveLock) return;
    setSaveLock(true);

    meal_save()
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
    meal_delete()
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const onPress_IngredientList_AddIngredient = () => {
    setIngredients_call_amountEdit(true);
    setAddIngredient_popup(true);
  }
  const onPress_IngredientList_ListItem_Edit = (index) => {
    popupAmountEdit_set(index);
  }
  const onPress_PopupAddIngredient_ListItem_Add = (index) => {
    ingredients_add(index);
  }
  const onPress_PopupAmountEdit_Save = () => {
    setIngredients_call_amountEdit(false);
    ingredients_updateAmount(amountEdit_index, amountEdit_value);
    setAmountEdit_popup(false);
  }
  const onPress_PopupAmountEdit_Delete = () => {
    setIngredients_call_amountEdit(false);
    ingredients_remove(amountEdit_index);
    setAmountEdit_popup(false);
  }
  const onPress_PopupAmountEdit_Select = (index) => {
    const selectedAmount = amountEdit_servings[index].amount * parseInt(amountEdit_multiply);
    setAmountEdit_value((selectedAmount) + "");
  }



  return (
    <View style={styles_common.container}>

      <Popup_Ingredient_EditAmount
        isVisible={amountEdit_popup} setIsVisible={setAmountEdit_popup}
        amount={amountEdit_value} setAmount={setAmountEdit_value}
        amountMultiply={amountEdit_multiply} setAmountMultiply={setAmountEdit_multiply}
        servingsList={amountEdit_servings}
        onPressSave={onPress_PopupAmountEdit_Save}
        onPressDelete={onPress_PopupAmountEdit_Delete}
        onPress_Item_Select={onPress_PopupAmountEdit_Select}
        label={amountEdit_label}
        sufix={getPhysicalState(amountEdit_isSolid)}
        deleteMessage={_mealEditScreen_deleteIngredient}
      />
      <Popup_List_Add
        isVisible={addIngredient_popup} setIsVisible={setAddIngredient_popup}
        listData={incIngredientDocs}
        onPressItemAdd={onPress_PopupAddIngredient_ListItem_Add}
      />

      <View style={[styles_common.form, { flex: 1 }]}>
        <View style={{ marginBottom: _space_l }}>
          <Label label="Label">
            <Input_Text value={label} setValue={setLabel} placeholder={"Label"} />
          </Label>
        </View>

        <Label label="Ingredients" style={{ flex: 1 }}>
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
        message={_mealEditScreen_deleteMeal}
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
        <Text style={[styles_text.label, { flex: 2 }]}>{item.ingredient.label}</Text>
      </View>
      <Button_Edit onPress={() => onPressEdit(index)} />
    </View>
  );
}
