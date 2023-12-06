import { View, Text } from "react-native";

import { styles_text, styles_lists, _space_s } from "../../styles/styles";
import Button_Edit from "./Button_Edit";
import Button_Check from "./Button_Check";



export default function ListItem_EditCheck(props) {
  const label = props.label;
  const onPressEdit = props.onPressEdit;
  const onPressCheck = props.onPressCheck;
  const showEdit = props.showEdit;
  const showCheck = props.showEdit;

  return (
    <View style={styles_lists.container_item}>
      <View style={styles_lists.container_label}>
        <Text style={styles_text.common}>{label}</Text>
      </View>
      {
        showEdit ?
        <Button_Edit
          onPress={onPressEdit}
          style={{ marginRight: _space_s }}
        />
        :
        <></>
      }
      {
        showCheck ?
        <Button_Check
          onPress={onPressCheck}
        />
        :
        <></>
      }
    </View>
  );
}