import { Pressable, View } from "react-native";
import { android_ripple_style, color_background_light, styles_common } from "../styles/styles";



export default function Button(props) {
  const style = props.style;
  const onPress = props.onPress;

  return (
    <View style={[styles_common.container_front, style]}>
      <Pressable
        style={{alignItems: "center", justifyContent: "center",}}
        android_ripple={android_ripple_style}
        onPress={onPress}
      >
        {props.children}
      </Pressable>
    </View>
  );
}