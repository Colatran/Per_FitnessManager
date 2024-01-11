import { View } from "react-native";
import { useContext } from "react";

import { UserContext } from "../../utils/UserContext";
import { styles_common } from "../../styles/styles";
import List from "../../components/List";
import ListItem_EditCheck from "../../components/screen/ListItem_EditCheck";
import Button_Footer_Add from "../../components/screen/Button_Footer_Add";



export default function MealList({ navigation }) {
  const { mealDocs, ingredientDocs } = useContext(UserContext);



  const getIngredientFromMeal = (meal) => {
    const ingredients = meal.ingredients;
    const ingDocs = [];

    ingredients.forEach(element => {
      const index = ingredientDocs.findIndex(item => item.id === element.ingredientId);
      ingDocs.push(ingredientDocs[index]);
    });

    console.log(ingDocs)
  }



  const onPress_add = () => {
    navigation.navigate("MealEdit", {});
  }
  const onPress_edit = (item) => {
    navigation.navigate("MealEdit", { meal: item });
  }
  const onPress_check = (item) => {
    getIngredientFromMeal(item);
    //navigation.navigate("IngredientCheck_Meal", { meal: getIngredientFromMeal(item) });
  }



  return (
    <View style={styles_common.container}>
      <List data={mealDocs}>
        <ListItem 
          onPressEdit={onPress_edit}
          onPressCheck={onPress_check}
        />
      </List>
      <Button_Footer_Add onPress={onPress_add} />
    </View>
  );
}



function ListItem(props) {
  const { item } = props;

  const onPressEdit = props.onPressEdit;
  const onPressCheck = props.onPressCheck;

  return (
    <ListItem_EditCheck
      label={item.label}
      showEdit={true}
      showCheck={true}
      onPressEdit={() => onPressEdit(item)}
      onPressCheck={() => onPressCheck(item)}
    />
  );
}
