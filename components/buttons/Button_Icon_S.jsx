import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { _color_icon, _iconSize_s } from '../../styles/styles';
import { stlButtons } from '../../styles/stlButtons';
import Button from './Button';



export default function Button_Icon_S(props) {
    {/**@description Use style to set up buttons height, width and flex*/}
  {/**@description Use styleButton to set button's design and content alignament*/}
  const style = props.style;
  {/**@description Use style to set up buttons height, width and flex*/}
  {/**@description Use styleButton to set button's design and content alignament*/}
  const styleButton = props.styleButton;

  const onPress = props.onPress;
  const icon = props.icon;
  const size = props.size;
  const color = props.color;


  
  return (
    <Button onPress={onPress} style={[stlButtons.c_size_s, style]} styleButton={styleButton}>
      <Icon name={icon} size={size ? size : _iconSize_s} color={color ? color : _color_icon}/>
      {props.children}
    </Button>
  );
}
