import { Text, View } from "react-native";

import { styles_buttons, styles_lists, _space_s, styles_text } from "../../../styles/styles";
import List from "../../../components/List";
import Popup_Flex4_Close from "../../../components/screen/Popup_Flex4_Close";
import Button_Add from "../../../components/screen/Button_Add";
import Button_Edit from "../../../components/screen/Button_Edit";
import Button_Favourite from "../../../components/screen/Button_Favourite";



export default function Popup_ServingsEdit_List(props) {
  const isVisible = props.isVisible;
  const setIsVisible = props.setIsVisible;
  const list = props.list;
  const favIndex = props.favIndex;
  const sufix = props.sufix;
  const onPressAdd = props.onPressAdd;
  const onPressEdit = props.onPressEdit;
  const onPressFavourite = props.onPressFavourite;



  return (
    <Popup_Flex4_Close isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={{ flex: 1 }}>
        <List data={list}>
          <ListItem
            favIndex={favIndex}
            sufix={sufix}
            onPressEdit={onPressEdit}
            onPressFavourite={onPressFavourite}
          />
        </List>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button_Add style={styles_buttons.button_fill} onPress={onPressAdd}/>
      </View>
    </Popup_Flex4_Close>
  );
}



function ListItem(props) {
  const { item, index } = props;

  const favIndex = props.favIndex;
  const sufix = props.sufix;

  const i_amount = item.amount;
  const i_label = item.label;



  const onPressEdit = () => {
    props.onPressEdit(index);
  };
  const onPressFavourite = () => {
    props.onPressFavourite(index);
  };



  return (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row", alignItems: "center" }]}>
        <View style={{flexDirection: "row"}}>
          <Text style={[styles_text.common, {flex: 1}]}>{i_amount} {sufix}</Text>
          <Text style={[styles_text.label, {flex: 1}]}>{i_label}</Text>
        </View>
      </View>
      <Button_Favourite isFavourite={favIndex == index} onPress={onPressFavourite} style={{ marginHorizontal: _space_s }}/>
      <Button_Edit onPress={onPressEdit}/>
    </View>
  );
}