import { _icon_save, styles_buttons } from '../../styles/styles';
import Button_Icon from '../buttons/Button_Icon';

export default function Button_Save(props) {
  const style = props.style;
  const onPress = props.onPress;

  return (
    <Button_Icon 
      style={[style, styles_buttons.button_y]}
      onPress={onPress}
      icon={_icon_save}
    />
  );
}