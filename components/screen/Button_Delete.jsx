import { View, Text } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { _color_warning_0, _iconSize_l, _iconSize_m, _icon_alert, _icon_delete, styles_buttons, styles_common, styles_text } from '../../styles/styles';
import Button_Icon from '../input/Button_Icon';
import Button_YesNo from './Button_YesNo';
import Popup from '../Popup';


export default function Button_Delete(props) {
  const [confirm, setConfirm] = useState(false);

  const style = props.style;
  const onPress = props.onPress;
  const message = props.message;

  return (
    <Button_Icon
      style={[style, styles_buttons.button_n]}
      onPress={() => setConfirm(true)}
      icon={_icon_delete}
    >
      <Popup isVisible={confirm}>
        <View style={[styles_common.form, {alignItems: "center"}]}>
          <Icon name={_icon_alert} size={_iconSize_l} color={_color_warning_0} />
          <Text style={[styles_text.bold, styles_text.centred]}>{message}</Text>
        </View>

        <View style={styles_buttons.container_footer}>
          <Button_YesNo
            style={[styles_buttons.button_fill, style]}
            onPressYes={onPress}
            onPressNo={() => setConfirm(false)}
          />
        </View>
      </Popup>
    </Button_Icon>
  );
}