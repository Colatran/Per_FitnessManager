import { StyleSheet, View } from "react-native";

import Button from "./Ritch_Button";
import TextInput from "./Ritch_TextInput";



export default function Field_TextButton(props) {
  const value = props.value;
  const setValue = props.setValue;
  const onPress = props.onPress;
  const icon = props.icon;
  const styles = props.styles;


  
  return (
    <View style={[_styles.container, styles]}>
      <TextInput
        style={_styles.input}
        value={value}
        onChangeText={text => setValue(text)}
      />
      <View style={_styles.container_button}>
        <Button 
          icon={icon}
          onPress={() => onPress()}
        />
      </View>
    </View>
  );
}



const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  container_button: {
    alignItems: 'flex-end'
  },
});