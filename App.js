import { StyleSheet, View } from 'react-native';
import ExercisesList from './screens/ExercisesList';



export default function App() {
  return (
    <View style={styles.container}>
      <ExercisesList/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
