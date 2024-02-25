import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ref_food_diets, ref_food_ingredients, ref_food_meals } from "../../../firebase.config";
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { UserContext } from "../../../utils/UserContext";
import { _borderRadius_m, _borderWidth_xs, _border_size_section, _color_back_0, _color_back_1, _color_back_1_border, _border_color_section, _color_listItem, _icon_edit_list, _size_xs, _size_xxs, _space_container_h, _space_container_padding_h, _space_container_padding_v, _space_container_v, _space_item_margin_h, _space_item_margin_v, _space_l, _space_listItem_margin, _space_list_margin_bottom, _space_list_margin_v, _space_m, _space_s, _space_xs, styles_buttons, styles_common, styles_text, _icon_add, _icon_section_hide, _icon_section_show } from "../../../styles/styles";
import { _mealEditScreen_deleteIngredient, _mealEditScreen_deleteMeal } from "../../../utils/Messages";
import Day_MealList from "./Day_MealList";
import { ratio_dayMeals_day, ratio_dayMeals_meals } from "../../../styles/stlScreenDiet";



export default function Diet_Edit_DayEdit({ navigation, route }) {
  const day = {
    name: "Day1",
    meals: [
      { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
      { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
      { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] },
    ]
  };



  return (
    <View style={styles_common.container}>
      <View style={styles.container_day}>
        <View style={{ flexDirection: "row" }}>

          <View style={{ flex: ratio_dayMeals_day }}>
            <Text style={styles_text.bold}>{day.name}</Text>
          </View>

          <View style={styles.container_meals}>
            <Day_MealList day={day} isEdit={true}/>
          </View>

        </View>
      </View>
    </View>
  );
}







const styles = StyleSheet.create({
  container_day: {
    backgroundColor: _color_listItem,
    marginBottom: _space_listItem_margin,
    paddingHorizontal: _space_container_padding_h,
    paddingVertical: _space_container_padding_v,
  },

  container_meals: {
    flex: ratio_dayMeals_meals,
    marginLeft: _space_item_margin_h
  }
});