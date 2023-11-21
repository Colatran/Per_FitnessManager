import { StyleSheet, View } from "react-native";
import { _color_button_green, _icon_add, styles_buttons } from "../../styles/styles";
import Button_Icon from "./Button_Icon";



export default function Button_Footer_Add(props) {
  const style = props.style;
  const onPressAdd = props.onPressAdd;

  return (
    <View style={[styles_buttons.container, style]}>
      <Button_Icon 
        style={styles.button}
        icon={_icon_add}
        onPress={onPressAdd}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  button: {
    flex: 1, 
    backgroundColor: _color_button_green
  },
});