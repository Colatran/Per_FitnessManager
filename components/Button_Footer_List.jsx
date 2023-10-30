import { View } from "react-native";
import { color_button_green } from "../styles/styles";
import Button_Icon from "./Button_Icon";



export default function Button_Footer_List(props) {
  const onPressAdd = props.onPressAdd

  return (
    <View style={{flexDirection: "row", alignItems: "flex-end", marginVertical: 20}}>
      <Button_Icon 
        style={{flex: 1, backgroundColor: color_button_green}}
        icon="plus"
        onPress={onPressAdd}
      />
    </View>
  );
}