import { View } from "react-native";
import { styles_buttons } from "../../styles/styles";
import Button_AddSaveDelete from "./Button_AddSaveDelete";



export default function Button_Footer_Form(props) {
  const isEdit = props.isEdit;
  const onPressAdd = props.onPressAdd;
  const onPressSave = props.onPressSave;
  const onPressDelete = props.onPressDelete;

  return (
    <View style={styles_buttons.container_footer}>
      <Button_AddSaveDelete 
        isEdit={isEdit}
        style={styles_buttons.button_fill}
        onPressAdd={onPressAdd}
        onPressSave={onPressSave}
        onPressDelete={onPressDelete}
      />
    </View>
  );
}

