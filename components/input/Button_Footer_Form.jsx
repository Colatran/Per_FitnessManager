import { StyleSheet, View } from "react-native";
import { _borderWidth_xs, 
  _color_baseBorder_front, _color_button_green, _color_button_red,
  _icon_add, _icon_delete, _icon_save,
  _space_l, _space_m, _space_s, _space_xl, _space_xs,
  styles_footer
} from "../../styles/styles";
import Button_Icon from "./Button_Icon";



export default function Button_Footer_Form(props) {
  const isEdit = props.isEdit;
  const onPressSaveNew = props.onPressSaveNew;
  const onPressSave = props.onPressSave;
  const onPressDelete = props.onPressDelete;

  return (
    <View style={styles_footer.container}>
      {
        isEdit ?
        <View style={styles.container_button}>
          <Button_Icon 
            style={[styles.button, styles.button_save]}
            icon={_icon_save}
            onPress={onPressSave}
          />
          <View style={styles.button_seperator}/>
          <Button_Icon 
            style={[styles.button, styles.button_delete]}
            icon={_icon_delete}
            onPress={onPressDelete}
          /> 
        </View>
        :
        <Button_Icon 
          style={[styles.button, styles.button_save]}
          icon={_icon_add}
          onPress={onPressSaveNew}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: _space_l,
  },

  container_button: {
    flex:1,
    flexDirection: "row"
  },

  button: {
    flex: 1, 
  },
  button_save: {
    backgroundColor: _color_button_green,
  },
  button_delete: {
    backgroundColor: _color_button_red,
  },

  button_seperator: {
    marginHorizontal: _space_s,
  }
});