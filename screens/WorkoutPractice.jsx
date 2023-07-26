import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, exercises, workout_exercises } from "../firebase.config";

import Button from "../components/Ritch_Button";
import { styles_text } from "../utils/styles";


const ref_workout_exercises = collection(db, workout_exercises);

export default function WorkoutPractice({ navigation, route }) {
  const { workout } = route.params;
  
  const [exerciseDocs, setExerciseDocs] = useState([]);
  const [exerciseNames, setExerciseNames] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseCurr, setExerciseCurr] = useState({});
  const [exerciseHistoryDocs, setExerciseHistoryDocs] = useState([]);

  const [currName, setCurrName] = useState("");

  const names = [];
  useEffect(() => {
    return onSnapshot(ref_workout_exercises, (snapshot) => {
      const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((doc) => doc.workoutId === workout.id)
      .sort((a, b) => {
        const indexA = a.index;
        const indexB = b.index;
      
        if (indexA < indexB) {
          return -1;
        }
        if (indexA > indexB) {
          return 1;
        }
        return 0;
      });

      data.forEach(async (element, index) => {
        const docRef = doc(db, exercises, element.exerciseId);
        await getDoc(docRef)
        .then((nameDoc) => {
          names.push(nameDoc.data().name);
        });
      });

      setExerciseNames(names);
      setExerciseDocs(data);
      setExerciseCurr(data[0]);
      setCurrName(names[0]);
    });
  }, []);



  const onPressButton = () => {
    console.log(currName);
  }



  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", margin: 20}}>
        <Text style={styles.text_title}>{workout.name}</Text>
      </View>

      <View style={{alignItems: "center"}}>
        <Text style={styles_text.common}>0 {currName}</Text>
      </View>

      <Button onPress={onPressButton}></Button>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  text_title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  } 
});
