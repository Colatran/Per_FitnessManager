import { View, Text } from "react-native";
import Button_Icon from "../Button_Icon";

import { getDurationText_FromMinuts, getTimeText_FromMinutes } from "../../utils/Funtions";
import { styles_text } from "../../styles/styles";



export default function Pin(props) {
  const pos = props.pos;
  const margin = props.margin;
  const label = props.label;
  const color = props.color;
  const height = props.height;

  return (
    <View style={{
      height: height,
      backgroundColor: color,
      borderRadius: 10,
      marginTop: margin,
    }}>
      <Text style={styles_text.common}> {getTimeText_FromMinutes(pos)} - {label} </Text>
    </View>
  );
}