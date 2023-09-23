import { StyleSheet, View, Text, FlatList } from "react-native";
import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db, exercises, workout_exercises } from "../firebase.config";
import { UserContext } from "../utils/UserContext";

import Button from "../components/Ritch_Button";
import Display_Set from "../components/Display_Set";
import TextInput from "../components/Ritch_TextInput";
import { styles_text } from "../styles/styles";



const ref_workout_exercises = collection(db, workout_exercises);

export default function WorkoutPractice({ navigation, route }) {
  const { getExerciseName } = useContext(UserContext);
  const { workout } = route.params;
  
  const [started, setStarted] = useState(false);
  const [docs, setDocs] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [achievedReps, setAchievedReps] = useState(0);
  const [achievedLoad, setAchievedLoad] = useState(0.0);

  

  useEffect(() => {
    return onSnapshot(ref_workout_exercises, (snapshot) => {
      //Set Docs
      const data = snapshot.docs
      .map((doc) => ({ id: doc.id, name: getExerciseName(doc.data().exerciseId), ...doc.data() }))
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

      //Set History docs
      const historyData = data.map((o) => ({
        exerciseId:   o.exerciseId,
        imbalance:    o.imbalance,
        index:        o.index,
        name:         o.name,
        restTime:     o.restTime,
        sidedReps:    o.sidedReps,
        sidedLoad:    o.sidedLoad,
        //set_target:   o.target.map((oo) => ({...oo})),
        //set_achieved: o.target.map((oo) => ({reps: 0, load: oo.load})),
        set_target:   o.target.map((oo) => ({reps: 20, load: 200})),
        set_achieved: o.target.map((oo) => ({reps: 20, load: 200})),

        workoutId:    o.workoutId,
        date:         new Date()
      }));

      setDocs(data);
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
    if(setIndex < currentExerciseTEMP.target.length - 1) {
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
    SaveCurrentSet();
    if(exerciseIndex > 0) {
      const newExerciseIndex = exerciseIndex - 1;
      const newSetIndex = 0;
      setSetIndex(newSetIndex);
      setExerciseIndex(newExerciseIndex);
      SetCurrentSet(newExerciseIndex, newSetIndex);
    }
  }



  const onPressStartWorkout = () => { StartWorkout(); }
  const onPressFinishWorkout = () => {}
  const onPressSetNext = () => { NextSet(); }
  const onPressSetPrevious = () => { PreviousSet(); }
  const onPressExerciseNext = () => { NextExercise(); }
  const onPressExercisePrevious = () => { PreviousExercise(); }
  const currentExercise = history[exerciseIndex];

  const currentExerciseTEMP = docs[exerciseIndex];



  return (
    <View style={styles.container}>   
      {
        started ? 
        <>
          <View style={{marginTop: 10, marginBottom: 20}}>
            <Text style={styles.text_title}>{workout.name}</Text>

            <View style={{flexDirection: "row"}}>
              <View style={{flex: 1}}>
                <FlatList
                  data={docs}
                  renderItem={({item, index}) =>
                    <ItemWithCursor
                      condition={index === exerciseIndex}
                      child_true={<Text style={styles_text.bold}>{item.name}</Text>}
                      child_false={<Text style={styles_text.common}>{item.name}</Text>}
                    />
                  }
                />
              </View>

              <View style={{flex: 1, alignItems: "flex-end"}}>
                <FlatList
                  data={currentExercise.set_target}
                  renderItem={({index}) =>
                    <ItemWithCursor
                      condition={index === setIndex}
                      child_true={
                        <SetHistory
                          style={{fontWeight: "bold"}}
                          viewStyle={{marginRight:20}}
                          exercise={currentExercise}
                          index={index}
                        />
                      }
                      child_false={
                        <SetHistory
                          style={{}}
                          viewStyle={{marginRight:0}}
                          exercise={currentExercise}
                          index={index}
                        />
                      }
                    />
                  }
                />
              </View>
            </View>
          </View>


          <View style={{borderColor: "#fff", borderTopWidth: 1, borderBottomWidth: 1, marginBottom: 20, height: 100}}/>





            <Text style={styles.text_title}>{currentExerciseTEMP.name}</Text>
            {
              currentExerciseTEMP.imbalance === 0 ?
              <></>
              :
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon name={"warning"} size={30} color='yellow' />
                <Text style={styles.text_warning}>  Weak {currentExerciseTEMP.imbalance === -1 ? "Left" : "Right"}</Text>
              </View>
            }
          
          <View style={{flexDirection: "row", marginBottom: 20}}>
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
                  setIndex === currentExerciseTEMP.target.length - 1 ?
                    exerciseIndex === docs.length - 1 ?
                    <Button icon={"check"} onPress={() => onPressFinishWorkout()}/>
                    :
                    <Button icon={"arrow-forward"} onPress={() => onPressExerciseNext()}/>
                  :
                  <Button icon={"keyboard-arrow-right"} onPress={() => onPressSetNext()}/>
                }
                </View>
              </View>
            </View>
          </View>

          <View style={{flexDirection: "row"}}>
            <View style={{flex:1}}>
              <Button icon={"arrow-back"} onPress={() => onPressExercisePrevious()}/>
            </View>
            <View style={{flex:1}}>
              <Button icon={"arrow-forward"} onPress={() => onPressExerciseNext()}/>
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
                  <Text style={styles_text.common}>{docs[index].name}</Text>
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

const ItemWithCursor = (props) => {
  const condition = props.condition;
  const child_true = props.child_true;
  const child_false = props.child_false;

  return (
    <>
      {
        condition ?
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Icon name={"keyboard-arrow-right"} size={30} color='white' />
          {child_true}
        </View>
        :
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View style={{width: 30}}/>
          {child_false}
        </View>
      }
    </>
  )
}

const SetHistory = (props) => {
  const style = props.style;
  const viewStyle= props.viewStyle;
  const exercise = props.exercise;
  const index = props.index;

  return (
    <View style={viewStyle}>
      <View style={{flex: 1}}>
        <Display_Set
          style={[styles_text.common, style]}
          reps={exercise.set_target[index].reps}
          load={exercise.set_target[index].load}
          sidedReps={exercise.sidedReps}
          sidedLoad={exercise.sidedLoad}
        />
      </View>
      <View style={{flex: 1}}>
      {
        exercise.set_achieved[index].reps === 0 ?
        <></>
        :
        <View style={{alignItems: "flex-end"}}>
          <Display_Set
            style={[{color:'#fff', fontSize: 10}, style]}
            reps={exercise.set_achieved[index].reps}
            load={exercise.set_achieved[index].load}
            sidedReps={exercise.sidedReps}
            sidedLoad={exercise.sidedLoad}
          />
        </View>
      }
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
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
