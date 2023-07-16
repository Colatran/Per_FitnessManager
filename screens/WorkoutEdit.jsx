import { StyleSheet, View, Text, TextInput, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, exercises, workouts } from "../firebase.config";

import Button from "../components/ButtonRitch";
import Field_Text from "../components/Field_Text";
import { styles_text } from "../utils/styles";



export default function WorkoutEdit({navigation, route}) {
  const { id, name } = route.params;

  const [newName, setNewName] = useState(name);
  
  const ref_workouts = collection(db, workouts);



  const onPressSaveName = async () => {
    const docRef = doc(ref_workouts, id);
    await updateDoc(docRef, {name: newName});
  }

  const onPressAddExercise = (item) => {
    navigation.navigate('Edit_Exercise', item);
  }



  return (
    <View style={styles.container}>

      <Field_Text
        value={newName}
        setValue={setNewName}
        onPress={onPressSaveName}
        icon={"check"}
      />

      <Button 
        icons={"edit"}
        onPress={onPressAddExercise}
      />

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});