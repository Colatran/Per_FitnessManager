import { _color_input, _icon_boolean_false, _icon_boolean_true } from "../../styles/styles";
import Button_Icon from "../../components/input/Button_Icon";


export default function Input_Boolean(props) {
  const isOn = props.isOn;
  const onPress = props.onPress;

  return (
    <Button_Icon 
      icon={isOn ? _icon_boolean_true : _icon_boolean_false}
      onPress={onPress}
      style={{backgroundColor: _color_input}}
    />
  );
}