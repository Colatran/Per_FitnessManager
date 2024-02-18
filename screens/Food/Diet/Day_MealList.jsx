import { View, Text, FlatList, StyleSheet } from "react-native";
import { _borderRadius_m, _borderWidth_xs, _border_size_section, _color_back_0, _color_back_1, _color_back_1_border, _border_color_section, _color_listItem, _icon_edit_list, _size_xs, _size_xxs, _space_container_h, _space_container_padding_h, _space_container_padding_v, _space_container_v, _space_item_margin_h, _space_item_margin_v, _space_l, _space_listItem_margin, _space_list_margin_bottom, _space_list_margin_v, _space_m, _space_s, _space_xs, styles_buttons, styles_common, styles_text, _icon_add, _icon_section_hide, _icon_section_show } from "../../../styles/styles";
import { _mealEditScreen_deleteIngredient, _mealEditScreen_deleteMeal } from "../../../utils/Messages";
import { stlButtons_size, stlButtons_type } from "../../../styles/stlButtons";
import Button_Icon from "../../../components/buttons/Button_Icon";



export default function Day_MealList({ navigation, route }) {
  const day = {
    name: "Day1",
    meals: [
      { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
      { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
      { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] },
      { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
      { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
      { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] },
      { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
      { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
      { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] },
      { name: "BrkFst", ingredients: [{ label: "A1", amount: "0000g" }, { label: "A2", amount: "0000g" }, { label: "A3", amount: "0000g" }] },
      { name: "Lunch", ingredients: [{ label: "B1", amount: "0000g" }, { label: "B2", amount: "0000g" }, { label: "B3", amount: "0000g" }] },
      { name: "Dinner", ingredients: [{ label: "C1", amount: "0000g" }, { label: "C2", amount: "0000g" }, { label: "C3", amount: "0000g" }] },
    ]
  };

  return (
    <View style={styles_common.container}>
      <FlatList
        data={day.meals}
        renderItem={({ item, index }) => (<Meal data={item} />)}
        ListFooterComponent={
          <View style={{ alignItems: "center", padding: _space_item_margin_h }}>
            <Button_Icon size={stlButtons_size.size_l} type={stlButtons_type.add}/>
          </View>
        }
      />
    </View>
  );
}



function Meal(props) {
  const meal = props.data;

  return (
    <View style={{ flexDirection: "row", borderColor: _border_color_section, borderBottomWidth: _border_size_section }}>

      <View style={{ flex: ratio_mealIngredient_meal }}>
        <Text style={styles_text.common}>{meal.name}</Text>
        <Button_Icon style={{ marginBottom: _space_item_margin_v }} type={stlButtons_type.edit}/>
      </View>

      <View style={{ flex: ratio_mealIngredient_ing, marginBottom: _space_item_margin_v }}>
        <FlatList
          data={meal.ingredients}
          renderItem={({ item, index }) => (<Ingredient data={item} />)}
        />
      </View>
    </View>
  );
}



function Ingredient(props) {
  const ingredient = props.data;

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginTop: _space_item_margin_v }}>
        <Text style={[styles_text.common, { flex: ratio_ingredientAmount_ing }]}>{ingredient.label}</Text>
        <Text style={[styles_text.label, { flex: ratio_ingredientAmount_amount, marginLeft: _space_item_margin_h }]}>{ingredient.amount}</Text>
        <Button_Icon size={stlButtons_size.size_s} type={stlButtons_type.edit}/>
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