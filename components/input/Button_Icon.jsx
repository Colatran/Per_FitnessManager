import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { _color_icon, _iconSize_m, styles_buttons } from '../../styles/styles';
import Button from './Button';

export default function Button_Icon(props) {
  const style = props.style;
  const onPress = props.onPress;
  const icon = props.icon;
  const size = props.size;
  const color = props.color;

  return (
    <Button onPress={onPress} style={[styles_buttons.button, style]}>
      <Icon name={icon} size={size ? size : _iconSize_m} color={color ? color : _color_icon}/>
      {props.children}
    </Button>
  );
}
