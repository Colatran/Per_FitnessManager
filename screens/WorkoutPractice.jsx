import { StyleSheet, View, Text } from "react-native";

import { styles_text } from "../utils/styles";



export default function WorkoutPractice({ navigation, route }) {
  const { workout } = route.params;
  console.log(workout);


  return (
    <View style={styles.container}>
      <Text style={styles_text.common}>{workout.name}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
