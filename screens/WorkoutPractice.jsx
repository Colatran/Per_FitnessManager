import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, exercises, workout_exercises } from "../firebase.config";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from "../components/Ritch_Button";
import Display_Set from "../components/Display_Set";
import TextInput from "../components/Ritch_TextInput";
import { styles_text } from "../utils/styles";



const ref_workout_exercises = collection(db, workout_exercises);

export default function WorkoutPractice({ navigation, route }) {
  const { workout } = route.params;
  
  const [started, setStarted] = useState(false);

  const [docs, setDocs] = useState([]);
  const [names, setNames] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [history, setHistory] = useState([]);
  
  const [achievedReps, setAchievedReps] = useState(0);
  const [achievedLoad, setAchievedLoad] = useState(0.0);



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
      
      setDocs(data);
      setNames(names);
      setHistory(historyData);
    });
  }, []);

  
  
  const StartWorkout = () => {
    setExerciseIndex(0);
    setSetIndex(0);
    const exerciseHistory = history[exerciseIndex];
    setAchievedReps(exerciseHistory.set_achieved[0].reps);
    setAchievedLoad(exerciseHistory.set_achieved[0].load);
    setStarted(true);
  }

  const SaveCurrentSet = () => {
    const exerciseHistory = {...history[exerciseIndex]};
    exerciseHistory.set_achieved[setIndex] = {
      reps: achievedReps,
      load: achievedLoad,
    };
    const newHistory = [...history];
    newHistory.splice(exerciseIndex, 1, exerciseHistory);
    setHistory(newHistory);
  }
  const SetCurrentSet = (exerciseIndex, setIndex) => {
    const exercise = history[exerciseIndex];
    setAchievedReps(exercise.set_achieved[setIndex].reps);
    setAchievedLoad(exercise.set_achieved[setIndex].load);
  }

  const NextSet = () => {
    if(setIndex < docs[exerciseIndex].target.length - 1) {
      SaveCurrentSet();
      const newSetIndex = setIndex + 1;
      SetCurrentSet(exerciseIndex, newSetIndex);
      setSetIndex(newSetIndex);
    }
  }
  const PreviousSet = () => {
    if(setIndex > 0) {
      SaveCurrentSet();
      const newSetIndex = setIndex - 1;
      SetCurrentSet(exerciseIndex, newSetIndex);
      setSetIndex(newSetIndex);
    }
    else {
      PreviousExercise();
    }
  }

  const NextExercise = () => {
    SaveCurrentSet();
    if(exerciseIndex < docs.length - 1) {
      const newExerciseIndex = exerciseIndex + 1;
      const newSetIndex = 0;
      setSetIndex(newSetIndex);
      setExerciseIndex(newExerciseIndex);
      SetCurrentSet(newExerciseIndex, newSetIndex);
    }
  }
  const PreviousExercise = () => {
    if(exerciseIndex > 0) {
      SaveCurrentSet();
      const newExerciseIndex = exerciseIndex - 1;
      const newSetIndex = 0;
      setSetIndex(newSetIndex);
      setExerciseIndex(newExerciseIndex);
      SetCurrentSet(newExerciseIndex, newSetIndex);
    }
  }



  const onPressStartWorkout = () => { StartWorkout(); }
  const onPressSetNext = () => { NextSet(); }
  const onPressSetPrevious = () => { PreviousSet(); }
  const onPressExerciseNext = () => { NextExercise(); }
  const onPressExercisePrevious = () => { PreviousExercise(); }



  return (
    <View style={styles.container}>   
      {
        started ? 
        <>
          <View style={{margin: 10}}>
            <Text style={styles.text_title}>{names[exerciseIndex]}</Text>
            {
              docs[exerciseIndex].imbalance === 0 ?
              <></>
              :
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <MaterialIcons name={"warning"} size={30} color='yellow' />
                <Text style={styles.text_warning}>  Weak {docs[exerciseIndex].imbalance === -1 ? "Left" : "Right"}</Text>
              </View>
            }
          </View>
          
          <View style={{flexDirection: "row", marginBottom: 20}}>
            <View style={{flex: 2}}>              
              <FlatList
                data={docs[exerciseIndex].target}
                renderItem={({item, index}) =>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    {
                      index === setIndex ?
                      <MaterialIcons name={"keyboard-arrow-right"} size={30} color='white' />
                      :
                      <View style={{width: 30}}/>
                    }
                    <View style={{flex: 1}}>
                      <Display_Set
                        style={index === setIndex ? styles_text.bold : styles_text.common}
                        reps={item.reps}
                        load={item.load}
                        sidedReps={docs[exerciseIndex].sidedReps}
                        sidedLoad={docs[exerciseIndex].sidedLoad}
                      />
                    </View>
                    <View style={{flex: 1}}>
                    {
                      history[exerciseIndex].set_achieved[index].reps === 0 ?
                      <></>
                      :
                      <Display_Set
                        style={index === setIndex ? styles_text.bold : styles_text.common}
                        reps={history[exerciseIndex].set_achieved[index].reps}
                        load={history[exerciseIndex].set_achieved[index].load}
                        sidedReps={docs[exerciseIndex].sidedReps}
                        sidedLoad={docs[exerciseIndex].sidedLoad}
                      />
                    }
                    </View>
                  </View>
                }
              />
            </View>

            <View style={{flex: 1, height: 100}}>
              <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{justifyContent: "space-evenly"}}>
                  <Text style={styles_text.common}>Reps </Text>
                  <Text style={styles_text.common}>Load </Text>
                </View>
                <View style={{flex: 1}}>
                  <TextInput
                    keyboardType={"numeric"}
                    value={achievedReps.toString()}
                    onChangeText={(text) => setAchievedReps(text === "" ? 0 : parseInt(text))}
                  />
                  <TextInput
                    keyboardType={"numeric"}
                    value={achievedLoad.toString()}
                    onChangeText={(text) => setAchievedLoad(text === "" ? 0.0 : parseFloat(text))}
                  />
                </View>
              </View>

              <View style={{flexDirection: "row"}}>
                <View style={{flex: 1}}>
                {
                  setIndex === 0 ?
                    exerciseIndex === 0 ?
                    <></>
                    :
                    <Button icon={"arrow-back"} onPress={() => onPressExercisePrevious()}/>
                  :
                  <Button icon={"keyboard-arrow-left"} onPress={() => onPressSetPrevious()}/>
                }
                </View>
                <View style={{flex: 1}}>
                {
                  setIndex === docs[exerciseIndex].target.length - 1 ?
                    exerciseIndex === docs.length - 1 ?
                    <Button icon={"check"} onPress={() => {}}/>
                    :
                    <Button icon={"arrow-forward"} onPress={() => onPressExerciseNext()}/>
                  :
                  <Button icon={"keyboard-arrow-right"} onPress={() => onPressSetNext()}/>
                }
                </View>
              </View>
            </View>
          </View>

          <View style={{flexDirection: "row", backgroundColor: "#f00"}}>
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
          <View style={{alignItems: "center", margin: 10}}>
            <Text style={styles.text_title}>{workout.name}</Text>
          </View>

          <Button icon={"play-arrow"} onPress={onPressStartWorkout} style={{marginBottom: 20}}/>

          <View style={{flex: 1}}>
            <FlatList
              data={docs}
              renderItem={({item, index}) => 
                <View>
                  <Text style={styles_text.common}>{names[index]}</Text>
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
  },

  text_warning: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  } 
});
