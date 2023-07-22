import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, exercises, workout_exercises, workouts } from "../firebase.config";

import Button from "../components/Ritch_Button";
import Field_TextButton from "../components/Field_TextButton";
import { styles_text } from "../utils/styles";



const ref_workout_exercises = collection(db, workout_exercises);

export default function WorkoutEdit({navigation, route}) {
  const { id, name } = route.params;

  const [newName, setNewName] = useState(name);
  const [exerciseDocs, setExerciseDocs] = useState([]);

  const ref_workouts = collection(db, workouts);



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
  const onPressExerciseEdit = (exercise) => {
    navigation.navigate('WorkoutEdit_Exercise', {workoutId: id, exercise: exercise});
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
        renderItem={({item}) => 
          <ExerciseListItem 
            exercise={item} 
            onEdit={() => onPressExerciseEdit(item)}
          />
        }
      />
    
    </View>
  );
}



function ExerciseListItem(props) {
  const exercise = props.exercise;
  const onEdit = props.onEdit;
  
  const [name, setName] = useState("");
  const [deleteConf, setDeleteConf] = useState(false);



  useEffect(() => {
    const f = async () => {
      const docRef = doc(db, exercises, exercise.exerciseId);
      getDoc(docRef)
      .then(data => { setName(data.data().name); });
    }
    f();
  }, []);

  

  const onPressMoveUp = () => {
    
  }
  const onPressMoveDown = () => {

  }
  const onPressEdit = () => {
    onEdit(exercise);
  }
  const onPressDelete = () => {
    const docRef = doc(ref_workout_exercises, exercise.id);
    deleteDoc(docRef);
  }



  return (
    <View style={{borderBottomColor: "#fff", borderBottomWidth: 1, marginBottom: 10}}>
      <View style={{flexDirection: "row"}}>
        <View style={{flex: 1}}>
          <Text style={styles_text.bold}>{name}</Text>
        </View>

        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          {
            deleteConf ? 
            <>
              <Button icon={"check"} onPress={() => onPressDelete()} style={{marginRight: 74}}/>
              <Button icon={"close"} onPress={() => setDeleteConf(false)}/>
            </>
            :
            <>
              <Button icon={"keyboard-arrow-up"}    onPress={() => onPressMoveUp()}/>
              <Button icon={"keyboard-arrow-down"}  onPress={() => onPressMoveDown()}/>
              <Button icon={"edit"}                 onPress={() => onPressEdit()}/>
              <Button icon={"delete"}               onPress={() => setDeleteConf(true)}/>
            </>
          }
        </View>
      </View>

      <View style={{marginHorizontal: 10, marginBottom: 5}}>
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