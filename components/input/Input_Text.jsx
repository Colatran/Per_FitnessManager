import { StyleSheet, View, TextInput } from "react-native";
import { _color_input, _space_m, _textColor, styles_common } from "../../styles/styles";


export default function Input_Text(props) {
  const style = props.style;
  const styleText = props.styleText;
  const value = props.value;
  const setValue = props.setValue;
  const placeholder = props.placeholder;
  const keyboardType = props.keyboardType;
  
  return (
    <View style={[styles_common.container_front, styles.container, style]}>
      <TextInput
        style={[styles.input, styleText]}
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
    backgroundColor: _color_input,
  },
  input: {
    marginHorizontal: _space_m,
    color: _textColor,
  }
});