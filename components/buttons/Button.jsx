import { Pressable, View } from "react-native";
import { useState } from "react";
import { android_ripple_style } from "../../styles/styles";
import { stlButtons } from "../../styles/stlButtons";



export default function Button(props) {
  const onPress = props.onPress;
  /**
   * @description Use style to set up buttons height, width and flex
   * @description Use styleButton to set button's design and content alignament
   */
  const style = props.style;
  /**
   * @description Use style to set up buttons height, width and flex
   * @description Use styleButton to set button's design and content alignament
   */
  const styleButton = props.styleButton;



  const [press, setPress] = useState(false);
  const elevationStyle = press ? stlButtons.u_press_press : stlButtons.u_press_idle;



  const handlePressIn = () => {
    setPress(true);
  }
  const handlePressOut = () => {
    setPress(false);
  }



  return (
    <View style={[stlButtons.c_default, elevationStyle, style]}>
      <View style={[stlButtons.u_pressableContainer, styleButton]}>
        <Pressable
          style={stlButtons.b_default}
          android_ripple={android_ripple_style}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {props.children}
        </Pressable>
      </View>
    </View>
  );
}