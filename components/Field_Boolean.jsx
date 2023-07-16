import { StyleSheet, Pressable, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { android_ripple_style } from "../utils/styles";



export default function Field_Boolean(props) {
  const on = props.on;
  const onPress = props.onPress;

  return (
    <View style={styles.container}>
      <Pressable
        style={on ? styles.pressable_on : styles.pressable_off}
        android_ripple={android_ripple_style}
        onPress={onPress}
      >
        <MaterialIcons name={"check"} size={30}/>
      </Pressable>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
    margin: 2,
    width: 31,
    height: 31,
  },

  pressable_on: {
    flex: 1,
    backgroundColor: "white",
  },
  pressable_off: {
    flex: 1,
    backgroundColor: "black",
  }
});
