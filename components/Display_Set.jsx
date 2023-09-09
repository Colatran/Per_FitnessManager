import { Text } from "react-native";
import { styles_text } from "../styles/styles";

export default function Display_Set(props) {
  const reps = props.reps;
  const load = props.load;
  const sidedReps = props.sidedReps;
  const sidedLoad = props.sidedLoad;
  const style = props.style;
  
  return (
    <Text style={[styles_text.common, style]}>
      {`${reps}${sidedReps ? '/s' : ''}${(load==0) ? '': ` x ${load}kg`}${sidedLoad ? '/s' : ''}`}
    </Text>
  );
} 