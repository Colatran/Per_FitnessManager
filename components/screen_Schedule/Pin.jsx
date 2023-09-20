import { View, Text } from "react-native";
import Button_Icon from "../Button_Icon";

import { getDurationText_FromMinuts, getTimeText_FromMinutes } from "../../utils/Funtions";
import { styles_text } from "../../styles/styles";



export default function Pin(props) {
  const pos = props.pos;
  const label = props.label;
  const color = props.color;
  const marginFactor = props.marginFactor;
  const index = props.index;
  const blockHeight = props.blockHeight;
  const height = props.height;

  return (
    <View style={{
      position: "relative",
      top:  marginFactor * blockHeight - index * height*2,
      height: height,
      paddingBottom: height,
      alignItems: "center",
      flexDirection: "row",
    }}>
      <View style={{
        backgroundColor: "#fff",
        width: 10,
        height: 1}}/>
      <View style={{
        backgroundColor: color,
        height: height,
        borderRadius: height}}>
        <Text style={[styles_text.common, {zIndex:10}]}>  {getTimeText_FromMinutes(pos)} - {label}  </Text>
      </View>
  </View>
  );
}