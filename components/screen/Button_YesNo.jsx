import { View } from 'react-native';
import { _icon_no, _icon_yes, styles_buttons } from '../../styles/styles';
import Button_Icon from '../input/Button_Icon';



export default function Button_YesNo(props) {
  const style = props.style;

  const onPressYes = props.onPressYes;
  const onPressNo = props.onPressNo;

  return (
    <View style={styles_buttons.sided}>
      <Button_Icon 
        style={[style, styles_buttons.button_y]}
        icon={_icon_yes}
        onPress={onPressYes}
      />
      <View style={styles_buttons.seperator}/>
      <Button_Icon
        style={[style, styles_buttons.button_n]}
        icon={_icon_no}
        onPress={onPressNo}
      />
    </View>
  );
}