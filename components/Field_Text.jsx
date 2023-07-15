import { StyleSheet, View, TextInput } from "react-native";
import Button from "./ButtonRitch";


export default function Field_Text(props) {
  const value = props.value;
  const setValue = props.setValue;
  const onPress = props.onPress;
  const icon = props.icon;
  const styles = props.styles;


  
  return (
    <View style={[_styles.container, styles]}>
      <View style={_styles.container_input}>
        <TextInput
          style={_styles.input}
          value={value}
          onChangeText={text => setValue(text)}
        />
      </View>
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
  container_input: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginLeft: 4,
    paddingLeft: 10,
    backgroundColor: "#fff"
  },
  container_button: {
    alignItems: 'flex-end'
  },
});