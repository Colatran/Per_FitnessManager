import { View } from "react-native";
import { color_button_green, color_button_red } from "../styles/styles";
import Button_Icon from "./Button_Icon";



export default function Button_FormFooter(props) {
  const isNew = props.isNew;
  const onPressSaveNew = props.onPressSaveNew;
  const onPressSave = props.onPressSave;
  const onPressDelete = props.onPressDelete;

  return (
    <View style={{flexDirection: "row", alignItems: "flex-end", marginVertical: 20}}>
      {
        isNew ?
        <Button_Icon 
          style={{flex: 1, backgroundColor: color_button_green}}
          icon="plus"
          onPress={onPressSaveNew}
        />
        :
        <View style={{flex:1, flexDirection: "row"}}>
          <Button_Icon 
            style={{flex: 1, backgroundColor: color_button_green, marginRight: 5}}
            icon="content-save"
            onPress={onPressSave}
          /> 
          <Button_Icon 
            style={{flex: 1, backgroundColor: color_button_red, marginLeft: 5}}
            icon="delete-forever"
            onPress={onPressDelete}
          /> 
        </View>
        
      }
      </View>
  );
}