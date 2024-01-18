import { StyleSheet, View, Text } from "react-native";

import { _color_button, _size_m, _space_m, styles_common, styles_text } from "../../styles/styles";
import Button from "../../components/input/Button";



export default function Food({ navigation }) {
  return (
    <View style={styles_common.container}>
      <View style={styles.container}>
        <Button_Option label="Ingredients" onPress={() => navigation.navigate("IngredientList")}/>  
      </View>

      <View style={styles.container}>
        <Button_Option label="Recipes" onPress={() => navigation.navigate("RecipeList")}/>
      </View>

      <View style={styles.container}>
        <Button_Option label="Meals" onPress={() => navigation.navigate("MealList")}/>
      </View>

      <View style={styles.container}>
        <Button_Option label="Diets" onPress={() => navigation.navigate("DietList")}/>
      </View>
    </View>
  );
}



function Button_Option(props) {
  const label = props.label;
  const onPress = props.onPress;
  
  return (
    <Button style={{flex: 1}} onPress={onPress}>
      <Text style={styles_text.bold}>{label}</Text>
    </Button>
  );
}



const styles = StyleSheet.create({
  container: {
    marginTop: _space_m,
    height: _size_m,
    flexDirection: "row",
  },
});