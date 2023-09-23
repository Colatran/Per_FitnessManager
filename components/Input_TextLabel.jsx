import { View, Text} from "react-native";

import Input_Text from "./Input_Text";
import { styles_text } from "../styles/styles";



export default function Input_TextLabel(props) {
  const label = props.label;
  const style = props.style;
  const value = props.value;
  const setValue = props.setValue;
  const placeholder = props.placeholder;
  const keyboardType = props.keyboardType;
  
  return (
    <View>
      <Text style={styles_text.bold}> {label} </Text>
      <Input_Text style={style} value={value} setValue={setValue} placeholder={placeholder} keyboardType={keyboardType}/>
    </View>
  );
}