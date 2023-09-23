import { StyleSheet, View, TextInput } from "react-native";
import { color_background_input, styles_common } from "../styles/styles";


export default function Input_Text(props) {
  const style = props.style;
  const value = props.value;
  const setValue = props.setValue;
  const placeholder = props.placeholder;
  const keyboardType = props.keyboardType;
  
  return (
    <View style={[styles_common.container_front, styles.container]}>
      <TextInput
        style={[{flex: 1, marginHorizontal: 10, color: "#fff"}, style]}
        value={value}
        onChangeText={text => setValue(text)}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color_background_input,
    flexDirection: 'row',
  },
});