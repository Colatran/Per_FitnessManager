import { View, Text } from "react-native";

import { styles_common, styles_text } from "../../styles/styles";
import Button from "../../components/Button";
import Display_DailyAverage from "../../components/screen_Food/Display_DailyAverage";



export default function Food({ navigation }) {
  return (
    <View style={styles_common.container}>
      <View style={{marginTop: 10, flexDirection: "row", height: 100}}>
        <Button_Option label="Ingredients" onPress={() => navigation.navigate("IngredientList")}/>  
      </View>

      <View style={{marginTop: 10, flexDirection: "row", height: 100}}>
        <Button_Option label="Recipes" onPress={() => navigation.navigate("RecipeList")}/>
      </View>

      <View style={{marginTop: 10, flexDirection: "row", height: 100}}>
        <Button_Option label="Day's Meals" onPress={() => navigation.navigate("MealList")}/>
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
