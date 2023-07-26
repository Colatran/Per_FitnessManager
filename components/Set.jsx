import { Text } from "react-native";
import { styles_text } from "../utils/styles";

export default function Set(props) {
  const reps = props.reps;
  const load = props.load;
  const sidedReps = props.sidedReps;
  const sidedLoad = props.sidedLoad;

  
  return (
    <Text style={styles_text.common}>
      {`${reps}${sidedReps ? '/s' : ''}${(load==0) ? '': ` x ${load}kg`}${sidedLoad ? '/s' : ''}`}
    </Text>
  );
} 