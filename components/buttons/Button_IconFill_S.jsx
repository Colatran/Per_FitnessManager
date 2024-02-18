import { View } from "react-native";
import Button_Icon from "./Button_Icon";



export default function Button_IconFill_S(props) {
  {/**@description Use style to set up buttons height, width and flex*/}
  {/**@description Use styleButton to set button's design and content alignament*/}
  const style = props.style;
  {/**@description Use style to set up buttons height, width and flex*/}
  {/**@description Use styleButton to set button's design and content alignament*/}
  const styleButton = props.styleButton;
  
  const onPress = props.onPress;
  const icon = props.icon;
  const size = props.size;
  const color = props.color;

  return (
    <View style={{flexDirection: "row"}}>
      <Button_Icon 
        style={[{flex: 1}, style]}
        styleButton={styleButton}
        onPress={onPress}
        icon={icon}
        size={size}
        color={color}
      />
    </View>
  );
}
