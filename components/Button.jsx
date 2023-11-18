import { Pressable, View } from "react-native";
import { _color_button, android_ripple_style, styles_common } from "../styles/styles";
import { StyleSheet } from "react-native";



export default function Button(props) {
  const style = props.style;
  const onPress = props.onPress;

  return (
    <View style={[styles_common.container_front, styles.container, style]}>
      <Pressable
        style={styles.pressable}
        android_ripple={android_ripple_style}
        onPress={onPress}
      >
        {props.children}
      </Pressable>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: _color_button,
  },

  pressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});