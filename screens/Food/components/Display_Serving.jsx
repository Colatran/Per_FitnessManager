import { View, Text} from "react-native";
import { styles_text } from "../../../styles/styles";
import { getPhysicalState } from "../../../utils/Functions";




export default function Display_Serving(props) {
  const isSolid = props.isSolid;
  const amount = props.amount;
  const label = props.label;
  const flex = props.flex;

  return (
    <View style={{flexDirection: "row"}}>
      <Text style={[styles_text.common, {flex: 1}]}>{amount}{getPhysicalState(isSolid)}</Text>
      <Text style={[styles_text.label, {flex: flex}]}>{label}</Text>
    </View>
  );
}