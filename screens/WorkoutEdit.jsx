import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, exercises, workout_exercises, workouts } from "../firebase.config";

import Button from "../components/Ritch_Button";
import Field_TextButton from "../components/Field_TextButton";
import { styles_text } from "../utils/styles";



export default function WorkoutEdit({navigation, route}) {
  const { id, name } = route.params;

  const [newName, setNewName] = useState(name);
  const [exerciseDocs, setExerciseDocs] = useState([]);

  const ref_workouts = collection(db, workouts);
  const ref_workout_exercises = collection(db, workout_exercises);



  useEffect(() => {
    return onSnapshot(ref_workout_exercises, (snapshot) => {
      const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((doc) => doc.workoutId === id);
      setExerciseDocs(data);
    });
  }, []);



  const onPressSaveName = async () => {
    const docRef = doc(ref_workouts, id);
    await updateDoc(docRef, {name: newName});
  }

  const onPressAddExercise = (item) => {
    navigation.navigate('WorkoutEdit_Exercise', {workoutId: id});
  }



  return (
    <View style={styles.container}>

      <Field_TextButton
        value={newName}
        setValue={setNewName}
        onPress={onPressSaveName}
        icon={"check"}
      />

      <Button 
        style={{marginBottom: 20}}
        icon={"add"}
        onPress={onPressAddExercise}
      />

      <FlatList
        data={exerciseDocs}
        renderItem={({item}) => <ExerciseList_Item exercise={item}/>}
      />
    
    </View>
  );
}



function ExerciseList_Item(props) {
  const exercise = props.exercise;
  
  const [name, setName] = useState("");



  useEffect(() => {
    const f = async () => {
      const docRef = doc(db, exercises, exercise.exerciseId);
      getDoc(docRef)
      .then(data => { setName(data.data().name); });
    }
    f();
  }, []);



  return (
    <View style={{borderBottomColor: "#fff", borderBottomWidth: 1, marginBottom: 10}}>
      <View>
        <Text style={styles_text.bold}>{name}</Text>
      </View>

      <View style={{marginHorizontal: 10, marginVertical: 5}}>
        <FlatList 
          data={exercise.target}
          renderItem={({item}) => 
            <Text style={styles_text.common}>
              {`${item.reps}r${exercise.sided ? '/s' : ''}${(item.load==0) ? '': ` + ${item.load}kg`}`}
            </Text>
          }
        />
      </View>      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});