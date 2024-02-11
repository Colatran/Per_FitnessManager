import { Pressable, View } from "react-native";
import { android_ripple_style } from "../../styles/styles";
import { stlButtons } from "../../styles/stylesButtons";
import { useState } from "react";



export default function Button(props) {
  {/*Use style to set up buttons height, width and flex*/}
  {/*Use styleButton to set button's design and content alignament*/}
  const style = props.style;
  {/*Use style to set up buttons height, width and flex*/}
  {/*Use styleButton to set button's design and content alignament*/}
  const styleButton = props.styleButton;
  
  const onPress = props.onPress;

  const [press, setPress] = useState(false);  
  const elevationStyle = press ? stlButtons.button_press : stlButtons.button_idle;


  
  const handlePressIn = () => {
    setPress(true);
  }
  const handlePressOut = () => {
    setPress(false);
  }



  return (
    <View style={[stlButtons.container, elevationStyle, style]}>
      <View style={[stlButtons.pressableContainer, styleButton]}>
        <Pressable
          style={stlButtons.pressable}
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