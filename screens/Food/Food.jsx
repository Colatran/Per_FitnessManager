import { StyleSheet, View, Text } from "react-native";

import { _borderRadius_m, _color_button, _size_m, _space_m, styles_common, styles_text } from "../../styles/styles";
import Button from "../../components/buttons/Button";



export default function Food({ navigation }) {
  return (
    <View style={styles_common.container}>
      <Button_Option label="Ingredients" onPress={() => navigation.navigate("IngredientList")}/>  

      <Button_Option label="Recipes" onPress={() => navigation.navigate("RecipeList")}/>

      <Button_Option label="Meals" onPress={() => navigation.navigate("MealList")}/>

      <Button_Option label="Diets" onPress={() => navigation.navigate("DietList")}/>

    </View>
  );
}



function Button_Option(props) {
  const label = props.label;
  const onPress = props.onPress;
  
  return (
    <View style={{flexDirection: "row"}}>
      <Button style={styles.button} onPress={onPress}>
        <Text style={styles_text.bold}>{label}</Text>
      </Button>
    </View>
  );
}



const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginTop: _space_m,
    height: _size_m,
  },
});