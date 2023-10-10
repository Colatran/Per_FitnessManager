import { StyleSheet, View, Text } from "react-native";
import { color_background_dark, color_background_light, styles_common, styles_text } from "../../styles/styles";
import { FloorValue } from "../../utils/Funtions";



export default function IngredientCheck({ navigation, route }) {
  const { ingredient } = route.params;



  const label = ingredient.label;
  const unitPrice = ingredient.unitPrice;
  const unitWeight = ingredient.unitWeight;
  const servings = ingredient.servings;
  const energy = ingredient.energy;
  const fats = ingredient.fats;
  const saturates = ingredient.saturates;
  const carbs = ingredient.carbs;
  const sugars = ingredient.sugars;
  const protein = ingredient.protein;
  const fiber = ingredient.fiber;
  const salt = ingredient.salt;
  
  const unitServing = ingredient.unitWeight / ingredient.servings;

  

  return (
    <View style={styles_common.container}>
      <View style={{paddingLeft: 10, marginVertical: 3}}>
        <Text style={styles_text.bold}>{label}</Text>
      </View>
      <View style={{paddingLeft: 10, marginBottom: 10}}>
        <Text style={styles_text.common}>{label}</Text>
      </View>

      <View style={{flexDirection: "row", borderColor: "#fff", borderTopWidth: 1, borderBottomWidth: 1}}>
        <View style={[styles.container, {backgroundColor: color_background_light}]}>
          <Text style={styles_text.common}>per %~</Text>
        </View>
        <View style={[styles.container, {backgroundColor: color_background_dark}]}>
          <Text style={styles_text.bold}>100g/ml</Text>
        </View>
        <View style={[styles.container, {backgroundColor: color_background_dark}]}>
          <Text style={styles_text.bold}>Serving</Text>
          <Text style={styles_text.common}>{unitServing}g/ml</Text>
        </View>
        <View style={[styles.container, {backgroundColor: color_background_dark}]}>
          <Text style={styles_text.bold}>Unit</Text>
          <Text style={styles_text.common}>{unitWeight}g/ml</Text>
        </View>
      </View>

      <Parameter label={"Energy"}         value={energy}    sufix={"cal"} wUnit={unitWeight}  wServing={unitServing}/>
      <Parameter label={"Fats"}           value={fats}      sufix={"g"}   wUnit={unitWeight}  wServing={unitServing}/>
      <Parameter label={"   Saturates"}   value={saturates} sufix={"g"}   wUnit={unitWeight}  wServing={unitServing}/>
      <Parameter label={"Carbs"}          value={carbs}     sufix={"g"}   wUnit={unitWeight}  wServing={unitServing}/>
      <Parameter label={"    Sugars"}     value={sugars}    sufix={"g"}   wUnit={unitWeight}  wServing={unitServing}/>
      <Parameter label={"Protein"}        value={protein}   sufix={"g"}   wUnit={unitWeight}  wServing={unitServing}/>
      <Parameter label={"Fiber"}          value={fiber}     sufix={"g"}   wUnit={unitWeight}  wServing={unitServing}/>
      <Parameter label={"Salt"}           value={salt}      sufix={"g"}   wUnit={unitWeight}  wServing={unitServing}/>



      {
        //TODO
        /*
          -Price per unit
          -Price per serving
          -Price per gram of protein
          -FIX Recipe nutrition calculation
          -FIX ingredient edit screen
          -Fix recipe edit screen
        */
      }
    </View>
  );
}

function Parameter(props) {
  const label = props.label;
  const value = props.value;
  const sufix = props.sufix;
  const wServing = props.wServing;
  const wUnit = props.wUnit;

  return (
    <View style={{flexDirection: "row", borderColor: "#fff", borderBottomWidth: 1,}}>
      <View style={[styles.container, {backgroundColor: color_background_light}]}>
        <Text style={styles_text.bold}>{label}</Text>
      </View>
      <View style={[styles.container, {backgroundColor: color_background_dark}]}>
        <Text style={styles_text.common}>{FloorValue(value)}{sufix}</Text>
      </View>
      <View style={[styles.container, {backgroundColor: color_background_dark}]}>
        <Text style={styles_text.common}>{FloorValue(wServing * value / 100)}{sufix}</Text>
      </View>
      <View style={[styles.container, {backgroundColor: color_background_dark}]}>
        <Text style={styles_text.common}>{FloorValue(wUnit * value / 100)}{sufix}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 3,
    paddingLeft: 10,
  }
});