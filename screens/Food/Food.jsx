import { View, Text } from "react-native";

import { styles_common, styles_text } from "../../styles/styles";
import Button from "../../components/Button";



export default function Food({ navigation }) {
  return (
    <View style={styles_common.container}>
      <View style={{marginTop: 10, flexDirection: "row", height: 100}}>
        <Button_Option label="Ingredients" onPress={() => navigation.navigate("IngredientList")}/>
        <View style={{marginHorizontal: 5}}/>
        <Button_Option label="Recipes" onPress={() => navigation.navigate("RecipeList")}/>
      </View>
    </View>
  );
}



function Button_Option(props) {
  const label = props.label;
  const onPress = props.onPress;
  
  return (
    <Button style={[{flex: 1}]} onPress={onPress}>
      <Text style={styles_text.bold}>{label}</Text>
    </Button>
  );
}



