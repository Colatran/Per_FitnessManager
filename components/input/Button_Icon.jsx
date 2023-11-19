import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { _color_button, _color_icon, _iconSize_m, _size_xs } from '../../styles/styles';
import Button from "./Button";



export default function Button_Icon(props) {
  const style = props.style;
  const onPress = props.onPress;

  const icon = props.icon;
  const size = props.size;
  const color = props.color;

  return (
    <Button onPress={onPress} style={[styles.button, style]}>
      <Icon name={icon} size={size ? size : _iconSize_m} color={color ? color : _color_icon } />
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: _size_xs,
    width: _size_xs,
  },
});