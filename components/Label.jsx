import { View, Text} from "react-native";

import { styles_text } from "../styles/styles";



export default function Label(props) {
  const label = props.label;
  const noMargin = props.noMargin;
  
  return (
    <View>
      <Text style={styles_text.bold}> {label} </Text>
      {props.children}
      {
        noMargin ?
        <></>
        :
        <View style={{margin: 5}}/>
      }
    </View>
  );
}