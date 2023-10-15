import { StyleSheet, View, Text } from "react-native";
import { color_background_dark, color_background_light, styles_common, styles_text } from "../../styles/styles";
import { FloorValue, getPhysicalState } from "../../utils/Funtions";



export default function IngredientCheck({ navigation, route }) {
  const { ingredient } = route.params;



  const label         = ingredient.label;
  const isSolid       = ingredient.isSolid;
  const unit_price    = ingredient.unit_price;
  const unit_weight   = ingredient.unit_weight;
  const unit_servings = ingredient.unit_servings;
  const nut_energy    = ingredient.nut_energy;
  const nut_fats      = ingredient.nut_fats;
  const nut_saturates = ingredient.nut_saturates;
  const nut_carbs     = ingredient.nut_carbs;
  const nut_sugars    = ingredient.nut_sugars;
  const nut_protein   = ingredient.nut_protein;
  const nut_fiber     = ingredient.nut_fiber;
  const nut_salt      = ingredient.nut_salt;
  
  const unit_serving  = FloorValue(unit_weight / unit_servings);
  const price_100 = 100 * unit_price / unit_weight;


  const gps = () => {return getPhysicalState(isSolid);}

  

  return (
    <View style={styles_common.container}>
      <View style={{paddingLeft: 10, marginVertical: 10}}>
        <Text style={styles_text.bold}>{label}</Text>
      </View>

      <Parameter label={"Unit Price"}   value={`${unit_price}€`}/>
      <Parameter label={"Unit Weight"}  value={`${unit_weight}(${gps()}) (${unit_servings} servings)`}/>
      <Parameter label={"Serving Weight"}  value={`${unit_serving}(${gps()})`}/>

      <View style={{flexDirection: "row", borderColor: "#fff", borderTopWidth: 1, borderBottomWidth: 1, marginTop: 20}}>
        <View style={[styles.container, {backgroundColor: color_background_light}]}>
          <Text style={styles_text.common}>per %~</Text>
        </View>
        <View style={[styles.container, {backgroundColor: color_background_dark}]}>
          <Text style={styles_text.bold}>100{gps()}</Text>
        </View>
        <View style={[styles.container, {backgroundColor: color_background_dark}]}>
          <Text style={styles_text.bold}>Serving</Text>
          <Text style={styles_text.common}>{unit_serving}{gps()}</Text>
        </View>
        <View style={[styles.container, {backgroundColor: color_background_dark}]}>
          <Text style={styles_text.bold}>Unit</Text>
          <Text style={styles_text.common}>{unit_weight}{gps()}</Text>
        </View>
      </View>
      <View style={{marginBottom: 20}}>
        <ParameterNut label={"Energy"}       value={nut_energy}    sufix={"cal"} wUnit={unit_weight}  wServing={unit_serving}/>
        <ParameterNut label={"Fats"}         value={nut_fats}      sufix={"g"}   wUnit={unit_weight}  wServing={unit_serving}/>
        <ParameterNut label={"   Saturates"} value={nut_saturates} sufix={"g"}   wUnit={unit_weight}  wServing={unit_serving}/>
        <ParameterNut label={"Carbs"}        value={nut_carbs}     sufix={"g"}   wUnit={unit_weight}  wServing={unit_serving}/>
        <ParameterNut label={"    Sugars"}   value={nut_sugars}    sufix={"g"}   wUnit={unit_weight}  wServing={unit_serving}/>
        <ParameterNut label={"Protein"}      value={nut_protein}   sufix={"g"}   wUnit={unit_weight}  wServing={unit_serving}/>
        <ParameterNut label={"Fiber"}        value={nut_fiber}     sufix={"g"}   wUnit={unit_weight}  wServing={unit_serving}/>
        <ParameterNut label={"Salt"}         value={nut_salt}      sufix={"g"}   wUnit={unit_weight}  wServing={unit_serving}/>
      </View>

      <Parameter label={"Price Serving"}        value={`${FloorValue(unit_price / unit_servings)}€`}/>
      <Parameter label={"Price Protein(100g)"}  value={`${FloorValue(price_100 / nut_protein * 100)}€`}/>
      <Parameter label={"Price 100cal"}         value={`${FloorValue(price_100 / nut_energy * 100)}€`}/>
    </View>
  );
}



function Parameter(props) {
  const label = props.label;
  const value = props.value;

  return (
    <View style={{paddingLeft: 20, flexDirection: "row"}}>
      <View style={{flex:2}}><Text style={styles_text.common}>{label}:</Text></View>
      <View style={{flex:3}}><Text style={styles_text.common}>{value}</Text></View>
    </View>
  );
}
function ParameterNut(props) {
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