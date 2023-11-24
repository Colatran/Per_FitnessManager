import { _icon_no, styles_buttons } from '../../styles/styles';
import Button_Icon from '../input/Button_Icon';

export default function Button_Close(props) {
  const style = props.style;
  const onPress = props.onPress;

  return (
    <Button_Icon 
      style={[style, styles_buttons.button_n]}
      onPress={onPress}
      icon={_icon_no}
    />
  );
}