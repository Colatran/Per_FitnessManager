import { View } from "react-native";
import { _icon_close, _icon_yes, styles_buttons } from "../../styles/styles";
import Button_Icon from "./Button_Icon";



export default function Button_Footer_YesClose(props) {
  const style = props.style;
  const onPressYes = props.onPressYes;
  const onPressClose = props.onPressClose;

  return (
    <View style={[styles_buttons.container, style]}>
      <View style={styles_buttons.container_button}>
        <Button_Icon
          style={[styles_buttons.button, styles_buttons.button_y]}
          icon={_icon_yes}
          onPress={onPressYes}
        />
        <View style={styles_buttons.button_seperator} />
        <Button_Icon
          style={[styles_buttons.button, styles_buttons.button_n]}
          icon={_icon_close}
          onPress={onPressClose}
        />
      </View>
    </View>
  );
}