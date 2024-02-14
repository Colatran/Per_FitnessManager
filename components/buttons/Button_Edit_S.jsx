import { stlButtons } from '../../styles/stlButtons';
import { _icon_edit } from '../../styles/styles';
import Button_Icon_S from './Button_Icon_S';



export default function Button_Edit_S(props) {
  {/*Use style to set up buttons height, width and flex*/}
  {/*Use styleButton to set button's design and content alignament*/}
  const style = props.style;
  {/*Use style to set up buttons height, width and flex*/}
  {/*Use styleButton to set button's design and content alignament*/}
  const styleButton = props.styleButton;
  const onPress = props.onPress;

  return (
    <Button_Icon_S
      style={style}
      styleButton={[stlButtons.b_type_edit, styleButton]}
      onPress={onPress}
      icon={_icon_edit}
    />
  );
}