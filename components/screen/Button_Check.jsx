import { _icon_checkout, styles_buttons } from '../../styles/styles';
import Button_Icon from '../buttons/Button_Icon';

export default function Button_Check(props) {
  const style = props.style;
  const onPress = props.onPress;

  return (
    <Button_Icon 
      style={[style, styles_buttons.button_check]}
      onPress={onPress}
      icon={_icon_checkout}
    />
  );
}