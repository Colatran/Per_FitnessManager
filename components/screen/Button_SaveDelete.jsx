import { View } from "react-native";
import { styles_buttons } from "../../styles/styles";
import Button_Delete from "./Button_Delete";
import Button_Save from "./Button_Save";



export default function Button_SaveDelete(props) {
  const style = props.style;
  const onPressSave = props.onPressSave;
  const onPressDelete = props.onPressDelete;
  const message = props.message;

  return (
    <View style={styles_buttons.sided}>
      <Button_Save style={style} onPress={onPressSave} />
      <View style={styles_buttons.seperator} />
      <Button_Delete style={style} onPress={onPressDelete} message={message}/>
    </View>
  );
}