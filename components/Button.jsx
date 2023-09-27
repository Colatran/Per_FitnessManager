import { Pressable, View } from "react-native";
import { android_ripple_style, styles_common } from "../styles/styles";



export default function Button(props) {
  const style = props.style;
  const onPress = props.onPress;

  return (
    <View style={[styles_common.container_front, style]}>
      <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-start"}}>
        <Pressable
          style={{flex: 1, justifyContent: "center", alignItems: "center"}}
          android_ripple={android_ripple_style}
          onPress={onPress}
        >
          {props.children}
        </Pressable>
      </View>
      
    </View>
  );
}