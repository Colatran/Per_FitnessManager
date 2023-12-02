import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FloorValue, getPhysicalState } from "../../utils/Functions";
import { 
  _borderWidth_xs,
  _color_back_0, _color_back_1,
  _color_icon,
  _iconSize_m,
  _icon_alert,
  _icon_select,
  _size_xs,
  _space_l, _space_m, _space_s, _space_xl,
  styles_buttons,
  styles_common, styles_lists, styles_text } from "../../styles/styles";
import Popup from "../../components/Popup";
import Label from "../../components/Label";
import Button_Close from "../../components/screen/Button_Close";
import List from "../../components/List";
import Button from "../../components/input/Button";
import Button_Select from "../../components/screen/Button_Select";



export default function IngredientCheck({ navigation, route }) {
  const { ingredient } = route.params;

  const label         = ingredient.label;
  const isSolid       = ingredient.isSolid;
  const unit_price    = ingredient.unit_price;
  const unit_weight   = ingredient.unit_weight;
  const servings      = ingredient.servings;
  const servings_fav  = ingredient.servings_fav;
  const nut_calories  = ingredient.nut_calories;
  const nut_fats      = ingredient.nut_fats;
  const nut_saturates = ingredient.nut_saturates;
  const nut_carbs     = ingredient.nut_carbs;
  const nut_sugars    = ingredient.nut_sugars;
  const nut_protein   = ingredient.nut_protein;
  const nut_fiber     = ingredient.nut_fiber;
  const nut_salt      = ingredient.nut_salt;
  
  const [servingSelect_popup, setServingSelect_popup] = useState(false);
  const [serving_amount, setServing_amount] = useState(servings[servings_fav].amount);
  const [serving_label, setServing_label] = useState(servings[servings_fav].label);



  const price_100 = 100 * unit_price / unit_weight;
  

  
  const setServing = (index) => {
    setServing_amount(servings[index].amount);
    setServing_label(servings[index].label);
  }



  const gps = () => {
    return getPhysicalState(isSolid);
  }

  const onPress_selectServing = () => {
    setServingSelect_popup(true);
  }

  const onPress_popupServingSelect_close = () => {
    setServingSelect_popup(false)
  }
  const onPress_popupServingSelect_select = (index) => {
    setServing(index);
    setServingSelect_popup(false)
  }



  return (
    <View style={styles_common.container}>
      <Popup isVisible={servingSelect_popup}>
        <View style={{flex: 1}}/>
        <View style={[styles_common.form, {flex: 4}]}>
          <View style={{flex: 1}}>
            <List data={servings}>
              <ListItem_Serving 
                gps={gps()} 
                onPressSelect={onPress_popupServingSelect_select}
              />
            </List>
          </View>
        </View>
        <View style={styles_buttons.container_footer}>
          <Button_Close style={styles_buttons.button_fill} onPress={onPress_popupServingSelect_close} />
        </View>
        <View style={{ flex: 1 }}/>
      </Popup>

      <View style={styles_common.form}>
        <View style={styles.container_label}>
          <Text style={styles_text.bold}>{label}</Text>
        </View>

        <View style={styles.container_data}>
          <View style={styles.container_section}>
            <Parameter label={"Unit Price"}           value={`${unit_price}€`}/>
            <Parameter label={"Unit Weight"}          value={`${unit_weight}(${gps()})`}/>
            <Parameter label={"Price Protein(100g)"}  value={nut_protein > 0 ? `${FloorValue(price_100 / nut_protein * 100)}€` : '--'}/>
            <Parameter label={"Price 100cal"}         value={`${FloorValue(price_100 / nut_calories * 100)}€`}/>
          </View>

          <Label label={'Serving:'}>
            <View style={{marginHorizontal: _space_m, marginBottom: _space_m, flexDirection: "row", alignItems: "center"}}>
              <View style={{flex:1}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <View style={{flex:1}}>
                    <Text style={styles_text.common}>{serving_label}</Text>
                  </View>
                  <View style={{flex:1, flexDirection: "row"}}>
                    <Button_Select onPress={onPress_selectServing} style={styles_buttons.button_fill}/>
                  </View>
                </View>
                <Parameter label={"Weight"}  value={`${serving_amount}${gps()}`}/>
                <Parameter label={"Serving Price"}  value={`${serving_amount * unit_price / unit_weight}€`}/>
              </View>
            </View>
          </Label>

          <Label label={`Nutrition:`}>
            <View style={styles.container_table}>
              <View style={styles.container_nutrient}>
                <View style={[styles.container_nutrient_parameter]}>
                  <Text style={[styles_text.label, {flex:1}]}>per %~</Text>
                </View>
                <View style={styles.container_nutrient_parameter}>
                  <Text style={styles_text.common}>100{gps()}</Text>
                </View>
                <View style={[styles.container_nutrient_parameter, {flexDirection: "row", marginRight: _space_m}]}>
                  <Text style={styles_text.common}>{serving_amount}{gps()}</Text>
                </View>
              </View>
              <View style={{backgroundColor: _color_back_1}}>
                <ParameterNut label={"Energy"}        value={nut_calories}  sufix={"cal"} serving={serving_amount}/>
                <ParameterNut label={"Fats"}          value={nut_fats}      sufix={"g"}   serving={serving_amount}/>
                <ParameterNut label={"   Saturates"}  value={nut_saturates} sufix={"g"}   serving={serving_amount}/>
                <ParameterNut label={"Carbs"}         value={nut_carbs}     sufix={"g"}   serving={serving_amount}/>
                <ParameterNut label={"    Sugars"}    value={nut_sugars}    sufix={"g"}   serving={serving_amount}/>
                <ParameterNut label={"Protein"}       value={nut_protein}   sufix={"g"}   serving={serving_amount}/>
                <ParameterNut label={"Fiber"}         value={nut_fiber}     sufix={"g"}   serving={serving_amount}/>
                <ParameterNut label={"Salt"}          value={nut_salt}      sufix={"g"}   serving={serving_amount}/>
              </View>
            </View>
          </Label>
        </View>
      </View>
    </View>
  );
}



function Parameter(props) {
  const label = props.label;
  const value = props.value;

  return (
    <View style={styles.container_parameter}>
      <View style={{flex:1}}><Text style={styles_text.label}>{label}:</Text></View>
      <View style={{flex:1}}><Text style={styles_text.common}>{value}</Text></View>
    </View>
  );
}
function ParameterNut(props) {
  const label = props.label;
  const value = props.value;
  const sufix = props.sufix;
  const wServing = props.wServing;
  const even = props.even;


  return (
    <View style={styles.container_nutrient}>
      <View style={[styles.container_nutrient_parameter]}>
        <Text style={[styles_text.label, {flex:1}]}>{label}</Text>
      </View>
      <View style={[styles.container_nutrient_parameter]}>
        <Text style={styles_text.common}>{FloorValue(value)}{sufix}</Text>
      </View>
      <View style={[styles.container_nutrient_parameter]}>
        <Text style={styles_text.common}>{FloorValue(wServing * value / 100)}{sufix}</Text>
      </View>
    </View>
  );
}

function ListItem_Serving(props) {
  const { item, index } = props;

  const gps = props.gps;

  const onPressSelect = () => {
    props.onPressSelect(index);
  };

  return (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row", alignItems: "center" }]}>
        <Text style={[styles_text.common, {flex: 1}]}>{item.amount}{gps}</Text>
        <Text style={[styles_text.label, {flex: 3}]}>{item.label}</Text>
      </View>
      <Button_Select onPress={onPressSelect}/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: _space_s,
    paddingLeft: _space_m,
  },

  container_label: {
    paddingLeft: _space_m,
    paddingVertical: _space_m
  },

  container_data: {
    paddingHorizontal: _space_xl,
    paddingBottom: _space_xl,
  },
  container_section: {
    paddingBottom: _space_l
  },

  container_parameter: {
    flexDirection: "row",
    alignItems: "center",
  },


  container_table: {
    backgroundColor: _color_back_0,
    paddingHorizontal: 0,
  },
  container_nutrient: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: _borderWidth_xs,
    borderColor: _color_back_0
  },

  container_nutrient_parameter: {
    flex: 1,
    paddingLeft: _space_xl,
    paddingVertical: _space_s,
  },


  
});