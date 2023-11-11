import { View, Text } from "react-native";
import { useContext } from "react";

import { styles_common, styles_text } from "../../styles/styles";
import { nut_blue, nut_green_01, nut_green_02, nut_green_03, nut_red, nut_silver, nut_yellow_01, nut_yellow_02 } from "../../styles/colors";
import { UserContext } from "../../utils/UserContext";



export default function Display_DailyAverage() {
  const { ingredientDocs, mealDocs } = useContext(UserContext);



  return (
    <View style={[styles_common.container_front, {paddingVertical: 10, marginBottom: 15}]}>
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles_text.common}>Daily Average:</Text>
      </View>

      <View style={{flexDirection: "row"}}>
        <NutValue color={nut_blue}      text={"Cal: 1000"}/>
        <NutValue color={nut_green_01}  text={"Carbs: 1000g"}/>
        <NutValue color={nut_red}       text={"Prot: 1000g"}/>
        <NutValue color={nut_yellow_01} text={"Fat: 1000g"}/>
      </View>
      <View style={{flexDirection: "row"}}>
        <NutValueDummy/>
        <NutValue color={nut_green_02}  text={"Sugar: 1000g"}/>
        <NutValueDummy/>
        <NutValue color={nut_yellow_02} text={"Sat: 1000g"}/>
      </View>
      <View style={{flexDirection: "row"}}>
        <NutValueDummy/>
        <NutValue color={nut_green_03}  text={"Fiber: 1000g"}/>
        <NutValueDummy/>
        <NutValueDummy/>
      </View>
      <View style={{flexDirection: "row"}}>
        <NutValue color={nut_silver}    text={"Expenditure: 1000€"}/>
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

