import { StyleSheet } from "react-native";
import { Pressable, View } from "react-native";
import { _color_button, android_ripple_style, styles_common } from "../../styles/styles";



export default function Button(props) {
  const style = props.style;
  const onPress = props.onPress;

  return (
    <View style={[styles_common.container_front, styles.container, style]}>
      <View style={{flex:1}}>
        <Pressable
          style={styles.pressable}
          android_ripple={android_ripple_style}
          onPress={onPress}
        >
          {props.children}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: _color_button,
  },

  pressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});