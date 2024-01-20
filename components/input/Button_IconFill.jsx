import { View } from "react-native";
import Button_Icon from "./Button_Icon";



export default function Button_Footer_Add(props) {
  const style = props.style;
  const onPress = props.onPress;
  const icon = props.icon;
  const size = props.size;
  const color = props.color;

  return (
    <View style={{flexDirection: "row"}}>
      <Button_Icon style={[{flex: 1}, style]} onPress={onPress} icon={icon} size={size} color={color}/>
    </View>
  );
}
