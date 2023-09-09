import { StyleSheet, Pressable, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { android_ripple_style } from "../styles/styles";



export default function Button(props) {
  const icon = props.icon;
  const onPress = props.onPress;
  const size = props.size;

  return (
    <View style={[styles.container, props.style]}>
      <Pressable
        style={styles.pressable}
        android_ripple={android_ripple_style}
        onPress={onPress}
      >
        <Icon name={icon} size={size ? size : 30} color='white' />
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