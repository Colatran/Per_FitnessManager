import { StyleSheet, FlatList, View } from "react-native";
import { useContext, useState } from "react";
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, exercises } from '../firebase.config';

import ListItem_EditableName from "../components/ListItem_EditableName";
import Field_TextButton from "../components/Field_TextButton";
import { UserContext } from "../utils/UserContext";



const ref_exercises = collection(db, exercises);

export default function ExercisesList() {
  const { exerciseDocs } = useContext(UserContext);

  const [toAdd, setToAdd] = useState("");



  const onPressAdd = async () => {
    if(toAdd.trim().length === 0) return;
    await addDoc(ref_exercises, {
      name: toAdd
    });
  }
  const onPressDelete = async (item) => {
    const docRef = doc(ref_exercises, item.id);
    await deleteDoc(docRef);
  }
  const onChangeName = async (item, name) => {
    const docRef = doc(ref_exercises, item.id);
    await updateDoc(docRef, {name: name});
  }



  return (
    <View style={styles.container}>

      <Field_TextButton
        value={toAdd}
        setValue={setToAdd}
        onPress={onPressAdd}
        icon={"add"}
      />

      <FlatList
        data={exerciseDocs}
        renderItem={({item}) =>
          <ListItem_EditableName 
            item={item}
            onPressDelete={() => onPressDelete(item)}
            onChangeName={onChangeName}
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
});
