import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, exercises, workout_exercises, workouts } from "../firebase.config";

import Button from "../components/Ritch_Button";
import Field_TextButton from "../components/Field_TextButton";
import Display_Set from "../components/Display_Set";
import { styles_text } from "../utils/styles";



const ref_workout_exercises = collection(db, workout_exercises);
const ref_workouts = collection(db, workouts);

export default function WorkoutEdit({navigation, route}) {
  const { id, name } = route.params;

  const [newName, setNewName] = useState(name);
  const [exerciseDocs, setExerciseDocs] = useState([]);

  const [changed, setChanged] = useState(false);
  const [lockChanged, setLockChanged] = useState(false);

  

  useEffect(() => {
    return onSnapshot(ref_workout_exercises, (snapshot) => {
      const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((doc) => doc.workoutId === id);

      data.sort((a, b) => {
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

      setExerciseDocs(data);
    });
  }, []);



  const onPressSaveName = async () => {
    const docRef = doc(ref_workouts, id);
    await updateDoc(docRef, {name: newName});
  }
  const onPressAddExercise = () => {
    navigation.navigate('WorkoutEdit_Exercise', {workoutId: id, exerciseCount: exerciseDocs.length});
  }
  const onPressExerciseEdit = (exercise) => {
    navigation.navigate('WorkoutEdit_Exercise', {workoutId: id, exerciseCount: exerciseDocs.length, exercise: exercise});
  }
  const onPressExerciseMoveUp = (index) => {
    const previousItem = exerciseDocs[index - 1];
    const item = exerciseDocs[index];
    const newDocs = [...exerciseDocs];
    previousItem.index = index;
    item.index = index - 1;
    newDocs.splice(index - 1, 2, item, previousItem);
    setExerciseDocs(newDocs);
    setChanged(true);
  }
  const onPressExerciseMoveDown = (index) => {
    const nextItem = exerciseDocs[index + 1];
    const item = exerciseDocs[index];
    const newDocs = [...exerciseDocs];
    nextItem.index = index;
    item.index = index + 1;
    newDocs.splice(index, 2, nextItem, item);
    setExerciseDocs(newDocs);
    setChanged(true);
  }
  const onPressSaveExercises = () => {
    if(lockChanged) return;
    setLockChanged(true);

    exerciseDocs.forEach(async (element, index) => {
      const docRef = doc(ref_workout_exercises, element.id);
      await updateDoc(docRef, {index: element.index});
    });
    
    setExerciseDocs([]);
    setLockChanged(false);
    setChanged(false);
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
        renderItem={({item, index}) => 
          <ExerciseListItem 
            exercise={item}
            index={index}
            length={exerciseDocs.length}
            onEdit={() => onPressExerciseEdit(item)}
            onMoveUp={() => onPressExerciseMoveUp(index)}
            onMoveDown={() => onPressExerciseMoveDown(index)}
          />
        }
      />
    
      {
        changed ?
          <Button
            icon={"check"}
            onPress={onPressSaveExercises}
          />
        :
        <></>
      }

    </View>
  );
}



function ExerciseListItem(props) {
  const exercise = props.exercise;
  const index = props.index;
  const length = props.length;
  const onEdit = props.onEdit;
  const onMoveUp = props.onMoveUp;
  const onMoveDown = props.onMoveDown;

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
    onMoveUp(exercise);
  }
  const onPressMoveDown = () => {
    onMoveDown(exercise);
  }
  const onPressEdit = () => {
    onEdit(exercise);
  }
  const onPressDelete = () => {
    const docRef = doc(ref_workout_exercises, exercise.id);
    deleteDoc(docRef);
  }



  return (
    <View style={{flexDirection: "row", borderBottomColor: "#fff", borderBottomWidth: 1, marginBottom: 10}}>

      <View style={{flex: 2}}>
        <Text style={styles_text.bold}>{name}</Text>

        <View style={{marginHorizontal: 10, marginBottom: 5, flexDirection:"row"}}>
          <View style={{flex: 1}}>
            <FlatList 
              data={exercise.target}
              renderItem={({item}) => 
                <Display_Set
                  reps={item.reps}
                  load={item.load}
                  sidedReps={exercise.sidedReps}
                  sidedLoad={exercise.sidedLoad}
                />
              }
            />
          </View>
        
          <View style={{flex: 1}}>
            <View style={{flexDirection:"row"}}>
              <Text style={styles_text.bold}>Rest: </Text>
              <Text style={styles_text.common}>{exercise.restTime}min</Text>
            </View>
            {
              (exercise.imbalance === 0) ?
              <></>
              :
              <View style={{flexDirection:"row"}}>
                <Text style={styles_text.bold}>Imbalance: </Text>
                {
                  (exercise.imbalance === 1) ?
                  <Text style={styles_text.common}>R</Text>
                  :
                  <Text style={styles_text.common}>L</Text>
                }
              </View>
            }
          </View>
        </View>
      </View>
      
      <View style={{flex: 1, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-end"}}>
        {
          deleteConf ? 
          <>
            <Button icon={"check"} onPress={() => onPressDelete()} style={{marginRight: 74}}/>
            <Button icon={"close"} onPress={() => setDeleteConf(false)}/>
          </>
          :
          <>
            {
              index === 0 ?
              <></>
              :
              <Button icon={"keyboard-arrow-up"}    onPress={() => onPressMoveUp()}/>
            }
            {
              index === length - 1 ?
              <></>
              :
              <Button icon={"keyboard-arrow-down"}  onPress={() => onPressMoveDown()}/>
            }
            <Button icon={"edit"}                 onPress={() => onPressEdit()}/>
            <Button icon={"delete"}               onPress={() => setDeleteConf(true)}/>
          </>
        }
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