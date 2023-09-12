import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from "./Button";

export default function Button_Icon(props) {
  const style = props.style;
  const onPress = props.onPress;

  const icon = props.icon;
  const size = props.size;

  return (
    <Button onPress={onPress} style={[{justifyContent: "center", alignItems: "center", height: 36, width: 36}, style]}>
      <Icon name={icon} size={size ? size : 30} color='white' />
    </Button>
  );
}