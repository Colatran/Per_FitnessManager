import { View, Text} from "react-native";

import { _space_m, styles_text } from "../styles/styles";



export default function Label(props) {
  const label = props.label;
  const style = props.style;

  return (
    <View style={[{marginBottom: _space_m}, style]}>
      <Text style={styles_text.label}>{label} </Text>
      {props.children}
    </View>
  );
}