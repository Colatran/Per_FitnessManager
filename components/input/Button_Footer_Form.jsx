import { View } from "react-native";
import { _icon_add, _icon_delete, _icon_save, styles_buttons } from "../../styles/styles";
import Button_Icon from "./Button_Icon";



export default function Button_Footer_Form(props) {
  const style = props.style;
  const isEdit = props.isEdit;
  const onPressSaveNew = props.onPressSaveNew;
  const onPressSave = props.onPressSave;
  const onPressDelete = props.onPressDelete;

  return (
    <View style={[styles_buttons.container, style]}>
      {
        isEdit ?
        <View style={styles_buttons.container_button}>
          <Button_Icon 
            style={[styles_buttons.button, styles_buttons.button_y]}
            icon={_icon_save}
            onPress={onPressSave}
          />
          <View style={styles_buttons.button_seperator}/>
          <Button_Icon 
            style={[styles_buttons.button, styles_buttons.button_n]}
            icon={_icon_delete}
            onPress={onPressDelete}
          /> 
        </View>
        :
        <Button_Icon 
          style={[styles_buttons.button, styles_buttons.button_y]}
          icon={_icon_add}
          onPress={onPressSaveNew}
        />
      }
    </View>
  );
}

