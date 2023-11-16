import { View, Text } from "react-native";
import { useContext, useEffect, useState } from "react";

import { styles_common, styles_text } from "../../styles/styles";
import { nut_blue, nut_green_01, nut_green_02, nut_green_03, nut_red, nut_silver, nut_yellow_01, nut_yellow_02 } from "../../styles/styles";
import { UserContext } from "../../utils/UserContext";
import { FloorValue } from "../../utils/Funtions";



export default function Display_DailyAverage() {
  const { ingredientDocs, mealDocs } = useContext(UserContext);

  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs]       = useState(0);
  const [sugar, setSugar]       = useState(0);
  const [fiber, setFiber]       = useState(0);
  const [protein, setProtein]   = useState(0);
  const [fat, setFat]           = useState(0);
  const [saturate, setSaturate] = useState(0);
  const [expenses, setExpenses] = useState(0);



  const hasIngredients = ingredientDocs && ingredientDocs.length > 0;
  const hasMeals = mealDocs && mealDocs.length > 0;
  
  useEffect(() => {
    if (hasIngredients) RunCalculations();
  }, [ingredientDocs]);
  useEffect(() => {
    if (hasMeals) RunCalculations();
  }, [mealDocs]);

  const RunCalculations = () => {
    let tCals = 0;
    let tCarbs = 0;
    let tSugar = 0;
    let tFiber = 0;
    let tProtein = 0;
    let tFat = 0;
    let tSaturate = 0;
    let tExpenses = 0;

    if(hasIngredients && hasMeals) {
      mealDocs.forEach(meal => {
        meal.ingredients.forEach(ingredient => {
          const ingDoc = ingredientDocs.find(item => item.id === ingredient.ingredientId);
          const amount = ingredient.amount;
          
          tCals     += ingDoc.nut_energy    * amount / 100;
          tCarbs    += ingDoc.nut_carbs     * amount / 100;
          tSugar    += ingDoc.nut_sugars    * amount / 100;
          tFiber    += ingDoc.nut_fiber     * amount / 100;
          tProtein  += ingDoc.nut_protein   * amount / 100;
          tFat      += ingDoc.nut_fats      * amount / 100;
          tSaturate += ingDoc.nut_saturates * amount / 100;
          tExpenses += ingDoc.unit_price    * amount / ingDoc.unit_weight;
        });
      });
    }

    const size = mealDocs.length;
    setCalories(  FloorValue(tCals / size));
    setCarbs(     FloorValue(tCarbs / size));
    setSugar(     FloorValue(tSugar / size));
    setFiber(     FloorValue(tFiber / size));
    setProtein(   FloorValue(tProtein / size));
    setFat(       FloorValue(tFat / size));
    setSaturate(  FloorValue(tSaturate / size));
    setExpenses(  FloorValue(tExpenses / size));
  }



  return (
    <View style={[styles_common.container_front, {paddingVertical: 10, marginBottom: 15}]}>
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles_text.common}>Daily Average:</Text>
      </View>

      <View style={{flexDirection: "row"}}>
        <NutValue color={nut_blue}      text={`Cal: ${calories}`}/>
        <NutValue color={nut_green_01}  text={`Carbs: ${carbs}`}/>
        <NutValue color={nut_red}       text={`Prot: ${protein}`}/>
        <NutValue color={nut_yellow_01} text={`Fat: ${fat}`}/>
      </View>
      <View style={{flexDirection: "row"}}>
        <NutValueDummy/>
        <NutValue color={nut_green_02}  text={`Sugar: ${sugar}`}/>
        <NutValueDummy/>
        <NutValue color={nut_yellow_02} text={`Sat: ${saturate}`}/>
      </View>
      <View style={{flexDirection: "row"}}>
        <NutValueDummy/>
        <NutValue color={nut_green_03}  text={`Fiber: ${fiber}`}/>
        <NutValueDummy/>
        <NutValueDummy/>
      </View>
      <View style={{flexDirection: "row"}}>
        <NutValue color={nut_silver}    text={`Expenditure: ${expenses}`}/>
      </View>
    </View>
  );
}

function NutValue(props) {
  return (
    <View style={{flex:1, alignItems: "center"}}>
      <Text style={[styles_text.bold, {color: props.color }]}>
        {props.text}
      </Text>
    </View>
  );
}
function NutValueDummy() {
  return (<View style={{flex:1}}/>);
}

