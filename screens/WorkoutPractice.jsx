import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, exercises, workout_exercises } from "../firebase.config";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from "../components/Ritch_Button";
import { styles_text } from "../utils/styles";
import { FlatList } from "react-native-gesture-handler";
import Display_Set from "../components/Display_Set";
import TextInput from "../components/Ritch_TextInput";



const ref_workout_exercises = collection(db, workout_exercises);

export default function WorkoutPractice({ navigation, route }) {
  const { workout } = route.params;
  
  const [started, setStarted] = useState(false);

  const [exerciseDocs, setExerciseDocs] = useState([]);
  const [exerciseNames, setExerciseNames] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseSetIndex, setExerciseSetIndex] = useState(0);
  const [exerciseHistoryDocs, setExerciseHistoryDocs] = useState([]);
  
  const [exerciseCurr, setExerciseCurr] = useState({});
  const [achievedReps, setAchievedReps] = useState(0);
  const [achievedLoad, setAchievedLoad] = useState(0);



  useEffect(() => {
    return onSnapshot(ref_workout_exercises, (snapshot) => {
      //Set Docs
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

      //Set Name docs
      const names = [];
      data.forEach(async (e, i) => {
        const docRef = doc(db, exercises, e.exerciseId);
        await getDoc(docRef)
        .then((nameDoc) => {
          names.push(nameDoc.data().name);
        });
      });

      //Set History docs
      const historyData = data.map((o) => ({
        exerciseId:   o.exerciseId,
        imbalance:    o.imbalance,
        index:        o.index,
        restTime:     o.restTime,
        sidedReps:    o.sidedReps,
        sidedLoad:    o.sidedLoad,
        set_target:   o.target.map((oo) => ({...oo})),
        set_achieved: o.target.map((oo) => ({reps: 0, load: oo.load})),
        workoutId:    o.workoutId,
        date:         new Date()
      }));
      
      setExerciseDocs(data);
      setExerciseNames(names);
      setExerciseHistoryDocs(historyData);
    });
  }, []);
  


  const setNewExercise = (index) => {
    setExerciseSetIndex(0);
    setExerciseCurr({...exerciseDocs[index], name: exerciseNames[index]});
  }

  const StartWorkout = () => {
    setExerciseIndex(0);
    setNewExercise(0);
    setStarted(true);
  }
  const NextSet = () => {
    if(exerciseSetIndex < exerciseCurr.target.length - 1) {
      setAchievedReps(0);
      setAchievedLoad(exerciseCurr.target[exerciseSetIndex + 1].load);
      setExerciseSetIndex(exerciseSetIndex + 1);
    }
  }
  const PreviousSet = () => {
    if(exerciseSetIndex > 0) {
      setAchievedReps(0);
      setAchievedLoad(exerciseCurr.target[exerciseSetIndex - 1].load);
      setExerciseSetIndex(exerciseSetIndex - 1);
    }
  }
  const NextExercise = () => {
    if(exerciseIndex < exerciseDocs.length - 1) {
      setNewExercise(exerciseIndex + 1);
      setExerciseIndex(exerciseIndex + 1);
    }
  }
  const PreviousExercise = () => {
    if(exerciseIndex > 0) {
      setNewExercise(exerciseIndex - 1);
      setExerciseIndex(exerciseIndex - 1);
    }
  }



  const onPressStartWorkout = () => {
    StartWorkout();
  }

  const onPressSetNext = () => {
    NextSet();
  }
  const onPressSetPrevious = () => {
    PreviousSet();
  }
  const onPressExerciseNext = () => {
    NextExercise();
  }
  const onPressExercisePrevious = () => {
    PreviousExercise();
  }



  return (
    <View style={styles.container}>
      <View style={{alignItems: "center", margin: 40}}>
        <Text style={styles.text_title}>{workout.name}</Text>
      </View>

      {
        started ? 
        <>
          <View style={{flexDirection: "row", marginHorizontal: 10, marginBottom: 10}}>
            <View style={{flex: 1}}>
              <Text style={styles.text_title}>{exerciseCurr.name}</Text>
            </View>

            <View style={{flex: 1}}>
              <FlatList
                data={exerciseCurr.target}
                renderItem={({item, index}) =>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  {
                    index === exerciseSetIndex ?
                      <MaterialIcons name={"keyboard-arrow-right"} size={30} color='white' />
                    :
                      <View style={{width: 30}}/>
                  }
                  <Display_Set
                    style={index === exerciseSetIndex ? styles_text.bold : styles_text.common}
                    reps={item.reps}
                    load={item.load}
                    sidedReps={exerciseCurr.sidedReps}
                    sidedLoad={exerciseCurr.sidedLoad}
                  />
                </View>
                }
              />
            </View>
          </View>

          <View style={{flexDirection: "row", marginVertical: 10}}>
            <View style={{flex:1}}>
              <TextInput
                keyboardType={"numeric"}
                value={achievedReps.toString()}
                onChangeText={(text) => setAchievedReps(text === "" ? 0 : parseInt(text))}
              />
              <TextInput
                keyboardType={"numeric"}
                value={achievedLoad.toString()}
                onChangeText={(text) => setTargetLoad(text === "" ? 0.0 : parseFloat(text))}
              />
            </View>
            <View style={{flex:1}}>
              <Button icon={"keyboard-arrow-right"} onPress={() => onPressSetNext()}/>
            </View>
          </View>

          <View style={{flexDirection: "row", marginHorizontal: 10, backgroundColor: "#f00"}}>
            <View style={{flex:1}}>
              <Button icon={"keyboard-arrow-left"} onPress={() => onPressExercisePrevious()}/>
            </View>
            <View style={{flex:1}}>
              <Button icon={"keyboard-arrow-right"} onPress={() => onPressExerciseNext()}/>
            </View>
          </View>
        </>
        :
        <>
          <Button icon={"play-arrow"} onPress={onPressStartWorkout} style={{marginBottom: 20}}/>

          <View style={{flex: 1}}>
            <FlatList
              data={exerciseDocs}
              renderItem={({item, index}) => 
                <View>
                  <Text style={styles_text.common}>{exerciseNames[index]}</Text>
                  <SetList target={item.target} sidedReps={item.sidedReps} sidedLoad={item.sidedLoad}/>
                </View>
              }
            />
          </View>
        </>
      }
    </View>
  );
}



const SetList = (props) => {
  const target = props.target;
  const sidedReps = props.sidedReps;
  const sidedLoad = props.sidedLoad;

  return (
    <View style={{marginHorizontal: 10, marginBottom: 10}}>
      <FlatList 
        data={target}
        renderItem={({item}) =>
          <Display_Set 
            reps={item.reps}
            load={item.load} 
            sidedReps={sidedReps}
            sidedLoad={sidedLoad}
          />
        }
      />
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
