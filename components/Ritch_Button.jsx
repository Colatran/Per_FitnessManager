import { StyleSheet, Pressable, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { android_ripple_style } from "../utils/styles";



export default function Button(props) {
  const icon = props.icon;
  const onPress = props.onPress;
  const size = props.size;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        android_ripple={android_ripple_style}
        onPress={onPress}
      >
        <MaterialIcons name={icon} size={size ? size : 30} color='white' />
      </Pressable>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
    margin: 2,
  },

  pressable: {
    alignItems: "center",
    justifyContent: "center",
  }
});