import { View, Text, FlatList, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ref_food_diets, ref_food_ingredients, ref_food_meals } from "../../firebase.config";
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { UserContext } from "../../utils/UserContext";
import { _color_back_0, _icon_edit_list, _space_l, _space_m, _space_s, _space_xs, styles_common, styles_text } from "../../styles/styles";
import { _mealEditScreen_deleteIngredient, _mealEditScreen_deleteMeal } from "../../utils/Messages";
import Button_Icon from "../../components/input/Button_Icon";


 
export default function DietEdit({ navigation, route }) {
  const [diet, setDiet] = useState({
    label: "DietTest", days: [
      {name: "Day1", meals: [
        {name: "BrkFst", ingredients: [{label: "A1"}, {label: "A2"}, {label: "A3"}]},
        {name: "Lunch", ingredients:  [{label: "B1"}, {label: "B2"}, {label: "B3"}]},
        {name: "Dinner", ingredients: [{label: "C1"}, {label: "C2"}, {label: "C3"}]}
      ]},
      {name: "Day2", meals: [
        {name: "BrkFst", ingredients: [{label: "A1"}, {label: "A2"}, {label: "A3"}]},
        {name: "Lunch", ingredients:  [{label: "B1"}, {label: "B2"}, {label: "B3"}]},
        {name: "Dinner", ingredients: [{label: "C1"}, {label: "C2"}, {label: "C3"}]}
      ]},
      {name: "Day3", meals: [
        {name: "BrkFst", ingredients: [{label: "A1"}, {label: "A2"}, {label: "A3"}]},
        {name: "Lunch", ingredients:  [{label: "B1"}, {label: "B2"}, {label: "B3"}]},
        {name: "Dinner", ingredients: [{label: "C1"}, {label: "C2"}, {label: "C3"}]}
      ]},
      {name: "Day4", meals: [
        {name: "BrkFst", ingredients: [{label: "A1"}, {label: "A2"}, {label: "A3"}]},
        {name: "Lunch", ingredients:  [{label: "B1"}, {label: "B2"}, {label: "B3"}]},
        {name: "Dinner", ingredients: [{label: "C1"}, {label: "C2"}, {label: "C3"}]}
      ]},
      {name: "Day5", meals: [
        {name: "BrkFst", ingredients: [{label: "A1"}, {label: "A2"}, {label: "A3"}]},
        {name: "Lunch", ingredients:  [{label: "B1"}, {label: "B2"}, {label: "B3"}]},
        {name: "Dinner", ingredients: [{label: "C1"}, {label: "C2"}, {label: "C3"}]}
      ]},
      {name: "Day6", meals: [
        {name: "BrkFst", ingredients: [{label: "A1"}, {label: "Aaaaaaaaaaaaaaaaaaaa2"}, {label: "A3"}]},
        {name: "Lunch", ingredients:  [{label: "B1"}, {label: "B2"}, {label: "B3"}]},
        {name: "Dinner", ingredients: [{label: "C1"}, {label: "C2"}, {label: "C3"}]}
      ]},
    ]
  });





  
  return (
    <View style={styles_common.container}>
      <View style={{marginVertical: 0}}>

        <FlatList
          style={{paddingVertical: _space_xs}}
          data={diet.days}
          renderItem={({ item, index }) => (
            <View style={styles.container_day}>

              <View style={{flex: 1, flexDirection: "row", backgroundColor:"#f00", paddingHorizontal: _space_s}}>
                <Text style={styles_text.bold}>{item.name}</Text>
                <View style={{flex: 1, paddingHorizontal: _space_xs, alignItems: "flex-end"}}>
                  <Button_Icon icon={"plus"}/>
                </View>
              </View>

              <View style={{flex: 3}}>
                <FlatList
                  data={item.meals}
                  renderItem={({ item, index }) => (
                    <View style={{flexDirection: "row"}}>

                      <View style={{flex: 1}}>
                        <Text>{item.name}</Text>
                      </View>

                      <View style={{flex: 1}}>
                        <FlatList
                          data={item.ingredients}
                          renderItem={({ item, index }) => (
                            <View style={{flexDirection: "row"}}>
                              <View style={{flex: 1}}>
                                <Text>{item.label}</Text>
                              </View>
                            </View>
                          )}
                        />
                      </View>
                      
                    </View>
                  )}
                />
              </View>

            </View>
          )}
        />

      </View>
    </View>
  )
}



export const styles = StyleSheet.create({
  container_day: {
    flexDirection: "row",
    marginBottom: _space_s,
  },
});