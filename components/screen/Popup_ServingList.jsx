import { View } from "react-native";
import React from "react";
import { styles_buttons, styles_common } from "../../styles/styles";
import Popup from "../Popup";
import Button_Close from "./Button_Close";



export default function Popup_ServingList(props) {
  const isVisible = props.isVisible;
  const setIsVisible = props.setIsVisible;

  const onPress_Close = () => {
    setIsVisible(false);
  }

  return (
    <Popup isVisible={isVisible}>
      <View style={{flex: 1}}/>

      <View style={[styles_common.form, {flex: 4}]}>
        <View style={{flex: 1}}>
          {props.children}
        </View>
      </View>

      <View style={styles_buttons.container_footer}>
        <Button_Close style={styles_buttons.button_fill} onPress={onPress_Close}/>
      </View>

      <View style={{flex: 1}}/>
    </Popup>   
  );
}
