import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ref_food_diets, ref_food_ingredients, ref_food_meals } from "../../firebase.config";
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { UserContext } from "../../utils/UserContext";
import { _borderRadius_m, _borderWidth_xs, _border_size_section, _color_back_0, _color_back_1, _color_back_1_border, _border_color_section, _color_listItem, _icon_edit_list, _size_xs, _size_xxs, _space_container_h, _space_container_padding_h, _space_container_padding_v, _space_container_v, _space_item_margin_h, _space_item_margin_v, _space_l, _space_listItem_margin, _space_list_margin_bottom, _space_list_margin_v, _space_m, _space_s, _space_xs, styles_buttons, styles_common, styles_text } from "../../styles/styles";
import { _mealEditScreen_deleteIngredient, _mealEditScreen_deleteMeal } from "../../utils/Messages";
import Button_Icon from "../../components/input/Button_Icon";
import Button_IconFill from "../../components/input/Button_IconFill";
import Button_Footer_Add from "../../components/screen/Button_Footer_Add";



export default function DietEdit({ navigation, route }) {
  const [diet, setDiet] = useState({
    label: "DietTest", days: [
      {
        name: "Day1", meals: [
          { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
          { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
          { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] }
        ]
      },
      {
        name: "Day2", meals: [
          { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
          { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
          { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] }
        ]
      },
      {
        name: "Day3", meals: [
          { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
          { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
          { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] }
        ]
      },
      {
        name: "Day4", meals: [
          { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
          { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
          { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] }
        ]
      },
      {
        name: "Day5", meals: [
          { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
          { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
          { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] }
        ]
      },
      {
        name: "Day6", meals: [
          { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
          { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
          { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] }
        ]
      },
    ]
  });



  return (
    <View style={styles_common.container}>
      <View style={{flex: 1}}>
        <View style={{flex: 1 }}>
          <FlatList
            style={{paddingVertical: _space_list_margin_v}}
            data={diet.days}
            renderItem={({ item, index }) => (<Day data={item}/>)}
          />
        </View>

        <Button_IconFill style={{marginTop: _space_listItem_margin, marginBottom: _space_list_margin_v, marginHorizontal: _space_item_margin_h}}/>
      </View>
    </View>
  )
}



function Day(props) {
  const day = props.data;
  
  return (
    <View style={styles.container_day}>

      <View style={{flexDirection: "row"}}>
        <View style={{flex: ratio_dayMeals_day}}>
          <Text style={styles_text.bold}>{day.name}</Text>      
          <Button_Icon style={{marginBottom: _space_item_margin_v, backgroundColor: "#040"}}/>
          <View style={{flex: 1, justifyContent: "flex-end"}}>
            <Button_Icon style={{backgroundColor: "#040"}}/>
          </View>
        </View>

        <View style={{flex: ratio_dayMeals_meals, paddingLeft: _space_item_margin_h}}>
          <FlatList
            data={day.meals}
            renderItem={({ item, index }) => (<Meal data={item}/>)}
          />
          <Button_IconFill style={{marginTop: _space_m, backgroundColor: "#000"}}/>
        </View>
      </View>

    </View>
  );
}



function Meal(props) {
  const meal = props.data;
  
  return (
    <View style={{flexDirection: "row", borderColor: _border_color_section, borderBottomWidth: _border_size_section}}>

      <View style={{flex: ratio_mealIngredient_meal}}>
        <Text style={styles_text.common}>{meal.name}</Text>
        
        <Button_Icon style={{marginBottom: _space_item_margin_v, backgroundColor: "#048"}}/>
      </View>

      <View style={{flex: ratio_mealIngredient_ing, marginBottom: _space_item_margin_v}}>
        <FlatList
          data={meal.ingredients}
          renderItem={({ item, index }) => (<Ingredient data={item}/>
          )}
        />
      </View>

    </View>
  );
}



function Ingredient(props) {
  const ingredient = props.data;

  return (
    <View style={{flexDirection: "row"}}>
      <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
        <Button_Icon style={{marginTop: _space_item_margin_v, marginRight: _space_item_margin_h, backgroundColor: "#048"}}/>
        <Text style={[styles_text.common, {flex: ratio_ingredientAmount_ing}]}>{ingredient.label}</Text>
        <Text style={[styles_text.label, {flex: ratio_ingredientAmount_amount, marginLeft: _space_item_margin_h}]}>{ingredient.label}</Text>
      </View>
    </View>
  );
}



const ratio_dayMeals_day = 1;
const ratio_dayMeals_meals = 4;
const ratio_mealIngredient_meal = 1;
const ratio_mealIngredient_ing = 3;
const ratio_ingredientAmount_ing = 2;
const ratio_ingredientAmount_amount = 1;

const styles = StyleSheet.create({
  container_day: {
    backgroundColor: _color_listItem,
    marginBottom: _space_listItem_margin,
    paddingHorizontal: _space_container_padding_h,
    paddingVertical: _space_container_padding_v,
  },
});