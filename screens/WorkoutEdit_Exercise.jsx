import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, exercises, workout_exercises } from "../firebase.config";

import Button from "../components/Ritch_Button";
import TextInput from "../components/Ritch_TextInput";
import Field_Boolean from "../components/Field_Boolean";
import Display_Set from "../components/Display_Set";
import { styles_text } from "../styles/styles";



export default function WorkoutEdit_Exercise({navigation, route}) {
  const { workoutId, exerciseCount, exercise } = route.params;

  const [saveLock, setSaveLock] = useState(false);
  const [error_exercise, setError_exercise] = useState(false);
  const [error_target, setError_target] = useState(false);
  const [error_rest, setError_rest] = useState(false);

  const [docsExercises, setDocsExercises] = useState([]);
  const [exerciseId, setExerciseId] = useState(exercise ? exercise.exerciseId : "");

  const [target, setTarget] = useState(exercise ? exercise.target : []);
  const [targetReps, setTargetReps] = useState(0);
  const [targetLoad, setTargetLoad] = useState(0.0);
  
  const [restTime, setRestTime] = useState(exercise ? exercise.restTime : 1);
  const [sidedReps, setSidedReps] = useState(exercise ? exercise.sidedReps : false);
  const [sidedLoad, setSidedLoad] = useState(exercise ? exercise.sidedLoad : false);
  const [imbalance, setImbalance] = useState(exercise ? exercise.imbalance : 0);

  const ref_exercises = collection(db, exercises);
  const ref_workout_exercises = collection(db, workout_exercises);

  

  useEffect(() => {
    return onSnapshot(ref_exercises, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ key: doc.id, value: doc.data().name }));
      data.sort((a, b) => {
        const nameA = a.value.toUpperCase();
        const nameB = b.value.toUpperCase();
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setDocsExercises(data);
    });
  }, []);



  const isFormNotValid = () => {
    setError_exercise(false);
    setError_target(false);
    setError_rest(false);

    if(exerciseId === "") {setError_exercise(true); return true;}
    if(target.length === 0) {setError_target(true); return true;}
    if(restTime < 1) {setError_rest(true); return true;}

    return false;
  }



  const onPressSetAdd = () => {
    if(targetReps === 0) return;
    const newTarget = [...target, { reps: targetReps, load: targetLoad }];
    setTarget(newTarget);
  }

  const onPressExerciseAdd = async () => {
    if(isFormNotValid()) return;
    if(saveLock) return;
    setSaveLock(true);

    const data = {
      workoutId: workoutId,
      exerciseId: exerciseId,
      target: target,
      restTime: restTime,
      sidedReps: sidedReps,
      sidedLoad: sidedLoad,
      imbalance: imbalance,
      index: exerciseCount,
    }

    await addDoc(ref_workout_exercises, data)
    .then(() => {navigation.goBack()})
    .catch(() => {setSaveLock(false)});
  }
  const onPressExerciseSave = async () => {
    if(isFormNotValid()) return;
    if(saveLock) return;
    setSaveLock(true);

    const data = {
      workoutId: workoutId,
      exerciseId: exerciseId,
      target: target,
      restTime: restTime,
      sidedReps: sidedReps,
      sidedLoad: sidedLoad,
      imbalance: imbalance,
    }

    const docRef = doc(ref_workout_exercises, exercise.id);
    await updateDoc(docRef, data)
    .then(() => {navigation.goBack()})
    .catch(() => {setSaveLock(false)});
  }
  const onPressExerciseCancel = () => {
    navigation.goBack();
  }



  return (
    <View style={styles.container}>
      <View style={{marginTop: 10}}/>

      <FormSection title={"Rest Time (min)"} error={error_exercise}>
        <SelectList 
          defaultOption={exercise ? docsExercises.find((item) => item.key === exerciseId) : {}}
          setSelected={(val) => setExerciseId(val)} 
          data={docsExercises} 
          save="key"
          search={true}
          searchicon={<Icon name={"search"} size={30} color='white'/>}
          arrowicon={<Icon name={"arrow-right"} size={30} color='white'/>}
          closeicon={<Icon name={"arrow-drop-down"} size={30} color='white'/>}
          searchPlaceholder="Exercise"
          notFoundText="Not Found"
          boxStyles={{alignItems:'center', backgroundColor:'black', borderRadius: 4, borderColor: 'white'}}
          inputStyles={{color: "white"}}
          dropdownStyles={{backgroundColor: 'black', borderRadius: 4}}
          dropdownTextStyles={{ color:'white'}}
        />
      </FormSection>

      <FormSection title={"Target"} error={error_target}>
        <View style={{flexDirection: "row", height: 80}}>

          <View style={{flex:1, marginRight: 5}}>
            <View style={{flexDirection: "row"}}>
              <View style={{justifyContent: "space-evenly"}}>
                <Text style={styles_text.common}>Reps </Text>
                <Text style={styles_text.common}>Load (Kg) </Text>
              </View>

              <View style={{flex: 1}}>
                <TextInput
                  keyboardType={"numeric"}
                  value={targetReps.toString()}
                  onChangeText={(text) => setTargetReps(text === "" ? 0 : parseInt(text))}
                />
                <TextInput
                  keyboardType={"numeric"}
                  value={targetLoad.toString()}
                  onChangeText={(text) => setTargetLoad(text === "" ? 0.0 : parseFloat(text))}
                />
              </View>
            </View>

            <View style={{flex:1, justifyContent: "center"}}>
              <Button
                style={{backgroundColor: "#000"}}
                icon={"add"}
                onPress={onPressSetAdd}
              />
            </View>
          </View>
      
          <View style={styles.target_list}>
            <FlatList
              data={target}
              renderItem={({item, index}) => 
                <TargetItem 
                  item={item}
                  index={index}
                  target={target}
                  setTarget={setTarget}
                />
              }
            />
          </View>

        </View>
      </FormSection>

      <FormSection title={"Rest Time (min)"} error={error_rest}>
        <View style={{minHeight: 30}}>
          <TextInput
            keyboardType={"numeric"}
            value={restTime.toString()}
            onChangeText={(text) => setRestTime(text === "" ? 0 : parseInt(text))}
          />
        </View>
      </FormSection>

      <FormSection title={"Sided"}>
        <View style={{flexDirection: "row"}}>
          <CheckboxLabel 
            title={"Reps"}
            on={sidedReps}
            onPress={() => setSidedReps(!sidedReps)}
          />
          <CheckboxLabel 
            title={"Load"}
            on={sidedLoad}
            onPress={() => setSidedLoad(!sidedLoad)}
          />
        </View>
      </FormSection>

      <FormSection title={"Imbalance"}>
        <View style={{flexDirection: "row"}}>
          <CheckboxLabel 
            title={"Left"}
            on={imbalance == -1}
            onPress={() => setImbalance(-1)}
          />
          <CheckboxLabel 
            title={"None"}
            on={imbalance == 0}
            onPress={() => setImbalance(0)}
          />
          <CheckboxLabel 
            title={"Right"}
            on={imbalance == 1}
            onPress={() => setImbalance(1)}
          />
        </View>
      </FormSection>

      <View style={{flex: 1, justifyContent: "flex-end"}}>
        {
          exercise ?
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 1}}>
              <Button 
                icon={"check"}
                onPress={() => onPressExerciseSave()}
              />
            </View>
            <View style={{flex: 1}}>
              <Button 
                icon={"close"}
                onPress={() => onPressExerciseCancel()}
              />
            </View>
          </View>
          :
          <Button 
            icon={"add"}
            onPress={() => onPressExerciseAdd()}
          />
        }
      </View>
    </View>
  );
}



function FormSection(props) {
  const title = props.title;
  const error = props.error;

  return (
    <View style={(error) ? styles.container_formSection_error : styles.container_formSection}>
      <Text style={styles_text.common}>{title}</Text>
      <View style={styles.container_formSection_container}>
        {props.children}
      </View>
    </View>
  );
}

function CheckboxLabel(props) {
  const title = props.title;
  const on = props.on;
  const onPress = props.onPress;

  return (
    <View style={{alignItems: "center", marginRight: 10}}>
      <Text style={styles_text.common}>{title}</Text>
      <Field_Boolean on={on} onPress={onPress}/>
    </View>
  );
}

function TargetItem(props) {
  const item = props.item;
  const index = props.index;
  const target = props.target;
  const setTarget = props.setTarget;

  const [deleteConf, setDeleteConf] = useState(false);

  const buttonSize = 25;



  const onPressMoveUp = () => {
    const item = target[index];
    const newTarget = [...target];
    newTarget.splice(index, 1);
    newTarget.splice(index - 1, 0, item);
    setTarget(newTarget);
  }
  const onPressMoveDown = () => {
    const item = target[index];
    const newTarget = [...target];
    newTarget.splice(index, 1);
    newTarget.splice(index + 1, 0, item);
    setTarget(newTarget);
  }
  const onPressRemove = () => {
    const newTarget = [...target];
    newTarget.splice(index, 1);
    setTarget(newTarget);
    setDeleteConf(false);
  }



  return (
    <View style={{flexDirection: "row", alignItems: "center"}}>

      <View style={{flex: 1}}>
        <Display_Set reps={item.reps} load={item.load} sidedReps={false} sidedLoad={false}/>
      </View>

      { deleteConf ? 
        <>
          <Button
            style={{backgroundColor: "#000", marginRight: buttonSize + 8}}
            icon={"check"}
            size={buttonSize}
            onPress={() => onPressRemove()}
          />
          <Button
            style={{backgroundColor: "#000"}}
            icon={"close"}
            size={buttonSize}
            onPress={() => setDeleteConf(false)}
          />
        </>
        :
        <>
          { 
            (index == 0) ?
            <></>
            :
            <Button
              style={{backgroundColor: "#000"}}
              icon={"keyboard-arrow-up"}
              size={buttonSize}
              onPress={() => onPressMoveUp()}
            />
          }
          {
            (index == target.length-1) ?
            <></>
            :
            <Button
              style={{backgroundColor: "#000"}}
              icon={"keyboard-arrow-down"}
              size={buttonSize}
              onPress={() => onPressMoveDown()}
            />
          }
          <Button
            style={{backgroundColor: "#000"}}
            icon={"delete"}
            size={buttonSize}
            onPress={() => setDeleteConf(true)}
          />
        </>
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },  

  container_formSection: {
    marginBottom: 15,
    padding: 5,
    backgroundColor: "#222",
  },
  container_formSection_error: {
    marginBottom: 15,
    padding: 5,
    backgroundColor: "#400",
  },
  container_formSection_container: {
    paddingHorizontal: 10,
  },

  input: {
    minWidth: 50,
    margin: 2,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: "#fff",
    justifyContent: "space-evenly"
  },

  target_list: {
    flex:1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#fff"
  },
});
