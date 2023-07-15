import { StyleSheet, View, Text, TextInput, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, exercises, workouts } from "../firebase.config";

import { styles_text } from "../utils/styles";
import Field_Text from "../components/Field_Text";



export default function WorkoutEdit({route}) {
  const { id, name } = route.params;

  const [newName, setNewName] = useState(name);
  const [docsExercises, setDocsExercises] = useState([]);
  const [exerciseId, setExerciseId] = useState("");
  const [targetReps, setTargetReps] = useState([{reps: 0, load: 0.0}]);
  const [restTime, setRestTime] = useState(0);
  const [sided, setSided] = useState(false);
  const [imbalance, setImbalance] = useState(0);

  const ref_exercises = collection(db, exercises);
  const ref_workouts = collection(db, workouts);
  


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



  const saveName = async () => {
    const docRef = doc(ref_workouts, id);
    await updateDoc(docRef, {name: newName});
  }

  const onChangeReps = async (text, index) => {
    var newTarget = targetReps;
    newTarget[index].reps = parseInt(text);
    setTargetReps(newTarget);
    
    console.log(newTarget);
  }
  
  const onChangeLoad = async (text, index) => {
    var newTarget = targetReps;
    newTarget[index].load = parseFloat(text);
    setTargetReps(newTarget);

    console.log(newTarget);
  }




  return (
    <View style={styles.container}>

      <Field_Text
        value={newName}
        setValue={setNewName}
        onPress={saveName}
        icon={"check"}
      />

      <View style={styles.container_exercise}>
        <View style={styles.exercise_item}>
          <Text style={styles_text.common}>Exercise</Text>
          <SelectList 
            setSelected={(val) => setExerciseId(val)} 
            data={docsExercises} 
            save="key"
            search={true}
            searchicon={<MaterialIcons name={"search"} size={30} color='white'/>}
            arrowicon={<MaterialIcons name={"arrow-right"} size={30} color='white'/>}
            closeicon={<MaterialIcons name={"arrow-drop-down"} size={30} color='white'/>}
            searchPlaceholder="Exercise"
            notFoundText="Not Found"
            boxStyles={{alignItems:"center", backgroundColor:"black"}}
            inputStyles={{color:'white'}}
            dropdownStyles={{backgroundColor: 'black'}}
            dropdownTextStyles={{color:'white'}}
          />
        </View>

        <View style={styles.exercise_item}>
          <Text style={styles_text.common}>Target</Text>
          <View style={{flexDirection: "row"}}>

            <View style={{justifyContent: "space-evenly"}}>
              <Text style={styles_text.common}>Reps </Text>
              <Text style={styles_text.common}>Load </Text>
            </View>

            <FlatList
              horizontal={true}
              data={targetReps}
              renderItem={({item, index}) =>
                <View>
                  <TextInput
                    style={styles.target_item}
                    keyboardType={"numeric"}
                    value={item.reps.toString()}
                    onChangeText={(text) => onChangeReps(text, index)}
                  />
                  <TextInput
                    style={styles.target_item}
                    keyboardType={"numeric"}
                    value={item.load.toString()}
                    onChangeText={(text) => onChangeLoad(text, index)}
                  />
                </View>
              }
            />
          </View>
          
        </View>
        

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  container_exercise: {
    flex: 10,
  },
  exercise_item: {
    marginBottom: 10,
  },


  target_item: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    margin: 2,
    padding: 2,
  }

});