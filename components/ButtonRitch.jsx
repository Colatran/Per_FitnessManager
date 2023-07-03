import { StyleSheet, Pressable } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { android_ripple_style } from "../utils/styles";



export default function Button(props) {
  const icon = props.icon;
  const onPress = props.onPress;

  return (
    <Pressable style={styles.pressable}
      android_ripple={android_ripple_style}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={30} color='white' />
    </Pressable>
  );
}



const styles = StyleSheet.create({
  pressable: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
    margin: 2,
  }
});