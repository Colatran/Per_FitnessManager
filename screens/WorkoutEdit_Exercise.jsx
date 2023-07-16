import { StyleSheet, View, Text, TextInput, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, exercises, workouts } from "../firebase.config";

import Button from "../components/ButtonRitch";
import Field_TextButton from "../components/Field_TextButton";
import { styles_text } from "../utils/styles";
import Field_Boolean from "../components/Field_Boolean";



export default function WorkoutEdit_Exercise({navigation}) {
  const [docsExercises, setDocsExercises] = useState([]);
  const [exerciseId, setExerciseId] = useState("");

  const [target, setTarget] = useState([]);
  const [targetReps, setTargetReps] = useState(0);
  const [targetLoad, setTargetLoad] = useState(0.0);
  
  const [restTime, setRestTime] = useState(0);
  const [sided, setSided] = useState(false);
  const [imbalance, setImbalance] = useState(0);

  const ref_exercises = collection(db, exercises);



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



  const addSet = () => {
    if(targetReps === 0) return;
    const newTarget = [...target, { reps: targetReps, load: targetLoad }];
    setTarget(newTarget);
  }
  const removeSet = (index) => {
    const newTarget = [...target];
    newTarget.pop(index);
    setTarget(newTarget);
  }



  return (
    <View style={styles.container}>
      <FormSection title={"Rest Time (min)"}>
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
      </FormSection>

      <FormSection title={"Target"}>
        <View style={{flexDirection: "row", height: 100}}>

          <View style={{flex:1}}>
            <View style={{flexDirection: "row"}}>
              <View style={{justifyContent: "space-evenly"}}>
                <Text style={styles_text.common}>Reps </Text>
                <Text style={styles_text.common}>Load (Kg) </Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  keyboardType={"numeric"}
                  value={targetReps.toString()}
                  onChangeText={(text) => setTargetReps(text === "" ? 0 : parseInt(text))}
                />
                <TextInput
                  style={styles.input}
                  keyboardType={"numeric"}
                  value={targetLoad.toString()}
                  onChangeText={(text) => setTargetLoad(text === "" ? 0.0 : parseFloat(text))}
                />
              </View>

              <View style={{justifyContent: "center"}}>
                <Button
                  icon={"add"}
                  onPress={addSet}
                />
              </View>
            </View>

            <View style={{flex:1}}/>
          </View>
      
          <View style={styles.target_list}>
            <FlatList
              data={target}
              renderItem={({item, index}) => 
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text style={[styles_text.common, {flex:1}]}>
                    {item.reps}r {item.load === 0.0 ? "" : `+ ${item.load}kg`}
                  </Text>
                  <Button
                    icon={"delete"}
                    size={20}
                    onPress={() => removeSet(index)}
                  />
                </View>
              }
            />
          </View>

        </View>
      </FormSection>

      <FormSection title={"Rest Time (min)"}>
        <TextInput
          style={styles.input}
          keyboardType={"numeric"}
          value={restTime.toString()}
          onChangeText={(text) => setRestTime(text === "" ? 0 : parseInt(text))}
        />
      </FormSection>

      <FormSection title={"Sided"}>
        <Field_Boolean on={sided} onPress={() => setSided(!sided)}/>
      </FormSection>

      <FormSection title={"Imbalance"}>
        <View style={{flexDirection: "row"}}>
          <ImbalanceItem 
            title={"Left"}
            on={imbalance == -1}
            onPress={() => setImbalance(-1)}
          />
          <ImbalanceItem 
            title={"None"}
            on={imbalance == 0}
            onPress={() => setImbalance(0)}
          />
          <ImbalanceItem 
            title={"Right"}
            on={imbalance == 1}
            onPress={() => setImbalance(1)}
          />
        </View>
      </FormSection>

      <View style={{flex: 1, justifyContent: "flex-end"}}>
        <Button 
          icon={"add"}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}



function FormSection(props) {
  const title = props.title;
  
  return (
    <View style={styles.container_formSection}>
      <Text style={styles_text.common}>{title}</Text>
      <View style={styles.container_formSection_container}>
        {props.children}
      </View>
    </View>
  );
}

function ImbalanceItem(props) {
  const title = props.title;
  const on = props.on;
  const onPress = props.onPress;

  return (
    <View style={{alignItems: "center"}}>
      <Text style={styles_text.common}>{title}</Text>
      <Field_Boolean on={on} onPress={onPress}/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },  

  container_formSection: {
    marginBottom: 20,
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
