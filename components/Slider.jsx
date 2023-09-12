import SliderCommunity from '@react-native-community/slider';

export default function Slider(props) {
  const value = props.value;
  const onValueChange = props.onValueChange;

  return (
    <SliderCommunity
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#fff"
      maximumTrackTintColor="#000"
      thumbTintColor="#fff"
      value={value}
      onValueChange={onValueChange}
    />
  );
}