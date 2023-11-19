import { View, Text} from "react-native";

import { _space_m, styles_text } from "../styles/styles";



export default function Label(props) {
  const label = props.label;
  
  return (
    <View style={{marginBottom: _space_m}}>
      <Text style={styles_text.label}>{label} </Text>
      {props.children}
    </View>
  );
}