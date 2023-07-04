import { StyleSheet, View, Text, TextInput, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, exercises, workouts } from "../firebase.config";

import Button from "../components/ButtonRitch";

import { styles_text } from "../utils/styles";



export default function WorkoutExerciseList({route}) {
  const { id, name } = route.params;

  const [newName, setNewName] = useState(name);
  const [docsExercises, setDocsExercises] = useState([]);
  const [exerciseId, setExerciseId] = useState("");
  const [targetReps, setTargetReps] = useState(["0"]);
  const [load, setLoad] = useState(0.0);
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



  return (
    <View style={styles.container}>

      <View style={styles.container_workout_name}>
        <View style={styles.add_section_text}>
          <TextInput
            style={styles.input_add}
            value={newName}
            onChangeText={text => setNewName(text)}
          />
        </View>
        <View style={styles.add_section_buttons}>
          <Button 
            icon={"check"}
            onPress={() => saveName()}
          />
        </View>
      </View>

      <View style={styles.container_exercise_add}>
        <View style={styles.container_exercise_add_item}>
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

        <View style={styles.container_exercise_add_item}>
          <Text style={styles_text.common}>Target Repetitions</Text>
          <FlatList
            horizontal={true}
            data={targetReps}
            renderItem={({item}) =>
            <View/>
            }
          />
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

  container_workout_name: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input_add: {
    marginLeft: 4,
    paddingLeft: 10,
    backgroundColor: "#fff"
  },
  add_section_text: {
    flex: 1,
    justifyContent: 'center',
  },
  add_section_buttons: {
    alignItems: 'flex-end'
  },

  container_exercise_add: {
    flex: 10,
  },
  container_exercise_add_item: {
    marginBottom: 10,
  },

});