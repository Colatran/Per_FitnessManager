import { View, Text} from "react-native";

import { styles_text } from "../styles/styles";



export default function Label(props) {
  const label = props.label;
  
  return (
    <View style={{marginBottom: 5}}>
      <Text style={styles_text.bold}> {label} </Text>
      {props.children}
    </View>
  );
}