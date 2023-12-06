import { View, Text } from "react-native";
import React from "react";
import { 
  _borderWidth_xs,
  _color_back_0, _color_back_1, _color_icon,
  _iconSize_m, _icon_alert, _icon_select,
  _size_xs,
  _space_l, _space_m, _space_s, _space_xl,
  styles_buttons, styles_common, styles_lists, styles_text } from "../../styles/styles";
import List from "../List";
import Popup from "../Popup";
import Button_Close from "./Button_Close";
import Button_Select from "./Button_Select";



export default function Popup_ServingList(props) {
  const list = props.list;
  const isUp = props.isUp;
  const onPressSelect = props.onPressSelect;
  const onPressClose = props.onPressClose;
  const gps = props.gps;

  return (
    <Popup isVisible={isUp}>
      <View style={{flex: 1}}/>
      <View style={[styles_common.form, {flex: 4}]}>
        <View style={{flex: 1}}>
          <List data={list}>
            <ListItem_Serving 
              gps={gps} 
              onPressSelect={onPressSelect}
            />
          </List>
        </View>
      </View>
      <View style={styles_buttons.container_footer}>
        <Button_Close style={styles_buttons.button_fill} onPress={onPressClose} />
      </View>
      <View style={{flex: 1}}/>
    </Popup>   
  );
}

function ListItem_Serving(props) {
  const { item, index } = props;

  const gps = props.gps;

  const onPressSelect = () => {
    props.onPressSelect(index);
  };

  return (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row", alignItems: "center" }]}>
        <Text style={[styles_text.common, {flex: 1}]}>{item.amount}{gps}</Text>
        <Text style={[styles_text.label, {flex: 3}]}>{item.label}</Text>
      </View>
      <Button_Select onPress={onPressSelect}/>
    </View>
  );
}