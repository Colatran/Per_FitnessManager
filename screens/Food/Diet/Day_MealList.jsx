import { StyleSheet, View, Text, FlatList } from "react-native";
import {
  _border_size_section,
  _border_color_section,
  _space_item_margin_h,
  _space_item_margin_v,
  styles_text
} from "../../../styles/styles";
import {
  ratio_mealIngredient_meal,
  ratio_mealIngredient_ing,
  ratio_ingredientAmount_ing,
  ratio_ingredientAmount_amount
} from "../../../styles/stlScreenDiet";
import { stlButtons_size, stlButtons_type } from "../../../styles/stlButtons";
import Button_Icon from "../../../components/buttons/Button_Icon";



export default function Day_MealList(props) {
  const day = props.day;
  const isEdit = props.isEdit;

  return (
    <FlatList
      data={day.meals}

      renderItem={({ item, index }) => (
        <Meal data={item} isEdit={isEdit} />
      )}

      ListFooterComponent={isEdit ?
        <View style={styles.container_footer}>
          <Button_Icon
            style={{ flex: 1, marginVertical: _space_item_margin_v }}
            size={stlButtons_size.size_m}
            type={stlButtons_type.add}
          />
        </View>
        :
        <></>
      }
    />
  );
}



function Meal(props) {
  const meal = props.data;
  const isEdit = props.isEdit;

  return (
    <View style={styles.container_meal}>

      <View style={styles.div_meal_meal}>
        <Text style={styles_text.common}>{meal.name}</Text>
        {isEdit ?
          <Button_Icon
            style={{ marginVertical: _space_item_margin_v }}
            type={stlButtons_type.edit}
          />
          : <></>
        }
      </View>

      <View style={styles.div_meal_ingredient}>
        <FlatList
          data={meal.ingredients}

          renderItem={({ item, index }) => (
            <Ingredient
              data={item}
              isEdit={isEdit}
            />
          )}

          ListFooterComponent={isEdit ?
            <View style={styles.container_footer}>
              <Button_Icon
                style={{ flex: 1, marginBottom: _space_item_margin_v }}
                size={stlButtons_size.size_s}
                type={stlButtons_type.add}
              />
            </View>
            : <></>
          }
        />
      </View>
    </View>
  );
}



function Ingredient(props) {
  const ingredient = props.data;
  const isEdit = props.isEdit;

  return (
    <View style={{ flexDirection: "row", marginBottom: _space_item_margin_v }}>
      <View style={styles.container_ingredient}>
        <Text style={[styles_text.common, styles.text_ingredient_label]}>{ingredient.label}</Text>
        <Text style={[styles_text.label, styles.text_ingredient_amount]}>{ingredient.amount}</Text>

        {isEdit ?
          <Button_Icon size={stlButtons_size.size_s} type={stlButtons_type.edit} />
          : <></>}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container_footer: {
    flexDirection: "row",
  },

  container_meal: {
    flexDirection: "row",
    borderColor: _border_color_section,
    borderBottomWidth: _border_size_section,
    marginBottom: _space_item_margin_v
  },
  div_meal_meal: {
    flex: ratio_mealIngredient_meal,
    
  },
  div_meal_ingredient: {
    flex: ratio_mealIngredient_ing,
  },

  container_ingredient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  text_ingredient_label: {
    flex: ratio_ingredientAmount_ing
  },
  text_ingredient_amount: {
    flex: ratio_ingredientAmount_amount
  },
});