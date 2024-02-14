import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { _color_icon, _iconSize_m } from '../../styles/styles';
import Button from './Button';



export default function Button_Icon(props) {
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
    <Button onPress={onPress} style={style} styleButton={styleButton}>
      <Icon name={icon} size={size ? size : _iconSize_m} color={color ? color : _color_icon}/>
      {props.children}
    </Button>
  );
}
