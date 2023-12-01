import { _color_back_1, _color_back_2, _color_favourite, _color_input, _icon_favourite } from "../../styles/styles";
import Button_Icon from "../input/Button_Icon";


export default function Button_Favourite(props) {
  const isFavourite = props.isFavourite;
  const onPress = props.onPress;

  return (
    <Button_Icon 
      icon={_icon_favourite}
      color={isFavourite ? _color_favourite : _color_back_1}
      onPress={isFavourite ? ()=>{} : onPress}
    />
  );
}