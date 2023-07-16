import { StyleSheet, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, workouts } from '../firebase.config';

import ItemList from "../components/ItemList";
import Field_Text from "../components/Field_Text";



export default function WorkoutList({ navigation }) {
  const [docs, setDocs] = useState([]);
  const [toAdd, setToAdd] = useState();

  const ref_workouts = collection(db, workouts);



  useEffect(() => {
    return onSnapshot(ref_workouts, (snapshot) => {
      setDocs([]);
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
    if(toAdd.trim().length === 0) return;
    await addDoc(ref_workouts, {
      name: toAdd
    });
  }
  const onChangeName = async (item, name) => {
    const docRef = doc(ref_workouts, item.id);
    await deleteDoc(docRef);
    await addDoc(ref_workouts, {
      name: name
    });
  }
  const onPressEdit = (item) => {
    navigation.navigate('Edit', item);
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
              onChangeName={onChangeName}
              onEdit={() => onPressEdit(item)}
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
