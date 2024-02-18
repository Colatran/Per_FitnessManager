import { stlButtons } from '../../styles/stlButtons';
import { _icon_add, _icon_edit } from '../../styles/styles';
import Button_Icon from './Button_Icon';



export default function Button_Add(props) {
  {/*Use style to set up buttons height, width and flex*/}
  {/*Use styleButton to set button's design and content alignament*/}
  const style = props.style;
  {/*Use style to set up buttons height, width and flex*/}
  {/*Use styleButton to set button's design and content alignament*/}
  const styleButton = props.styleButton;
  const onPress = props.onPress;

  return (
    <Button_Icon 
      style={style}
      styleButton={[stlButtons.b_type_add, styleButton]}
      onPress={onPress}
      icon={_icon_add}
    />
  );
}