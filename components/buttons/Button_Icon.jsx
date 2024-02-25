import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import { _color_icon } from '../../styles/styles';
import { stlButtons_size, stlButtons_type } from '../../styles/stlButtons';



/**
 * @description Use stlbButtons_size to use the size options
 * @description Use stlButtons_type to use the type options
 * c_ for custom settings
 */
export default function Button_Icon(props) {
  const onPress = props.onPress;

  /**
   * @description Use style to set up buttons height, width and flex
   * @description Use styleButton to set button's design and content alignament
   */
  const c_style = props.style;
  /**
   * @description Use style to set up buttons height, width and flex
   * @description Use styleButton to set button's design and content alignament
   */
  const c_styleButton = props.styleButton;
  const c_icon_type = props.c_icon_type;
  const c_icon_size = props.c_icon_size;
  const c_icon_color = props.c_icon_color;

  /**
   * @description Use stlbButtons_size to use the size options
   */
  const size = props.size ? props.size : stlButtons_size.size_m;

  /**
   * @description Use stlButtons_type to use the type options
   */
  const type = props.type ? props.type : stlButtons_type.null;

  const isFill = props.isFill;


  if (isFill) return (
    <View style={{ flexDirection: "row" }}>
      <Button
        onPress={onPress}
        style={[size.style, {flex: 1}, c_style]}
        styleButton={[type.style, c_styleButton]}
      >
        <Icon
          name={c_icon_type ? c_icon_type : type.icon}
          size={c_icon_size ? c_icon_size : size.iconSize}
          color={c_icon_color ? c_icon_color : _color_icon}
        />
        {props.children}
      </Button>
    </View>
  );

  else return (
    <Button
      onPress={onPress}
      style={[size.style, c_style]}
      styleButton={[type.style, c_styleButton]}
    >
      <Icon
        name={c_icon_type ? c_icon_type : type.icon}
        size={c_icon_size ? c_icon_size : size.iconSize}
        color={c_icon_color ? c_icon_color : _color_icon}
      />
      {props.children}
    </Button>
  );
}