import { _icon_edit, styles_buttons } from '../../styles/styles';
import Button_Icon from '../input/Button_Icon';

export default function Button_Edit(props) {
  const style = props.style;
  const onPress = props.onPress;

  return (
    <Button_Icon 
      style={[style, styles_buttons.button_edit]}
      onPress={onPress}
      icon={_icon_edit}
    />
  );
}