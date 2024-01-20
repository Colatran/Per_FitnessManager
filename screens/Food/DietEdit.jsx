import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ref_food_diets, ref_food_ingredients, ref_food_meals } from "../../firebase.config";
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { UserContext } from "../../utils/UserContext";
import { _borderRadius_m, _borderWidth_xs, _color_back_0, _color_back_1, _color_back_1_border, _icon_edit_list, _size_xs, _size_xxs, _space_l, _space_m, _space_s, _space_xs, styles_buttons, styles_common, styles_text } from "../../styles/styles";
import { _mealEditScreen_deleteIngredient, _mealEditScreen_deleteMeal } from "../../utils/Messages";
import Button_Icon from "../../components/input/Button_Icon";
import Button_IconFill from "../../components/input/Button_IconFill";
import Button_Footer_Add from "../../components/screen/Button_Footer_Add";


 
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
      <View style={{marginVertical: 0, flex:1}}>

          <ScrollView>
        <FlatList
          style={{paddingVertical: _space_m}}
          data={diet.days}
          renderItem={({ item, index }) => (
            <View style={styles.container_day}>

              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: "row"}}>
                  <Text style={styles_text.bold}>{item.name}</Text>
                  <View style={{flex: 1, paddingHorizontal: _space_xs, alignItems: "flex-end"}}>
                    <Button_Icon/>
                  </View>
                </View>


                <Button_IconFill style={{height: _size_xxs}}/>
                
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

        <Button_Icon style={{flex: 1}}/>
        </ScrollView>
      </View>
    </View>
  )
}


const _color = "#5c5c60"
export const styles = StyleSheet.create({
  container_day: {
    flexDirection: "row",
    backgroundColor: _color_back_1,
    marginBottom: _space_s,
    paddingHorizontal: _space_s,
    paddingVertical: _space_xs,
    borderTopWidth: _borderWidth_xs,
    borderBottomWidth: _borderWidth_xs,
    borderTopColor: _color,
    borderBottomColor: _color,
  },
});