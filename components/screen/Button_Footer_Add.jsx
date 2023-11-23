import { View } from "react-native";
import { styles_buttons } from "../../styles/styles";
import Button_Add from "./Button_Add";



export default function Button_Footer_Add(props) {
  const onPress = props.onPress;

  return (
    <View style={styles_buttons.container_footer}>
      <Button_Add style={styles_buttons.button_fill} onPress={onPress}/>
    </View>
  );
}

