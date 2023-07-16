import { StyleSheet, View, TextInput } from "react-native";



export default function Ritch_TextInput(props) {
  const value = props.value;
  const onChangeText = props.onChangeText;
  const keyboardType = props.keyboardType;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    paddingLeft: 10,
    backgroundColor: "#fff"
  },
});