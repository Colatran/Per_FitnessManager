import { View, Text } from "react-native";

import { styles_lists, styles_text } from "../../../styles/styles";
import List from "../../../components/List";
import Popup_Flex4_Close from "../../../components/screen/Popup_Flex4_Close";
import Button_Add from "../../../components/screen/Button_Add";



export default function Popup_Ingredient_Add(props) {
  const isVisible = props.isVisible;
  const setIsVisible = props.setIsVisible;
  const listData = props.listData;
  const onPressItemAdd = props.onPressItemAdd;

  return (
    <Popup_Flex4_Close isVisible={isVisible} setIsVisible={setIsVisible}>
      <List data={listData}>
        <ListItem onPressAdd={onPressItemAdd} />
      </List>
    </Popup_Flex4_Close>
  );
}



function ListItem(props) {
  const { item, index } = props;

  const onPressAdd = props.onPressAdd;

  return item.include ? (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row" }]}>
        <Text style={styles_text.label}>{item.label}</Text>
      </View>
      <Button_Add onPress={() => onPressAdd(index)} />
    </View>
  ) : (
    <></>
  );
}