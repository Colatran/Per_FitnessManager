import { View, Text} from "react-native";
import { styles_text } from "../../../styles/styles";




export default function Display_Serving(props) {
  const gps = props.gps;
  const amount = props.amount;
  const label = props.label;
  const flex = props.flex;

  return (
    <View style={{flexDirection: "row"}}>
      <Text style={[styles_text.common, {flex: 1}]}>{amount}{gps}</Text>
      <Text style={[styles_text.label, {flex: flex}]}>{label}</Text>
    </View>
  );
}