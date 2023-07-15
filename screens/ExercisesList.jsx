import { StyleSheet, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, exercises } from '../firebase.config';

import ItemList from "../components/ItemList";
import Field_Text from "../components/Field_Text";



export default function ExercisesList() {
  const [docs, setDocs] = useState([]);
  const [toAdd, setToAdd] = useState();

  const ref_exercises = collection(db, exercises);


  
  useEffect(() => {
    return onSnapshot(ref_exercises, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setDocs(data);
    });
  }, []);



  const onPressAdd = async () => {
    console.log("onPressAdd");
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

      <Field_Text
        value={toAdd}
        setValue={setToAdd}
        onPress={onPressAdd}
        icon={"add"}
      />

      <View>
        <FlatList
          data={docs}
          renderItem={({item}) =>
            <ItemList 
              item={item}
              onPressDelete={() => onPressDelete(item)}
              onChangeName={onChangeName}
            />
          }
        />
      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
