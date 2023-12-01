import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { _color_favourite, _iconSize_m, _icon_favourite, styles_common } from "../styles/styles";

export default function Icon_Favourite(props) {
  const isFavourite = props.isFavourite;

  return isFavourite ? (
    <Icon name={_icon_favourite} size={_iconSize_m} color={_color_favourite}/>
  ) : (
    <View style={styles_common.icon_margin}/>
  );
}