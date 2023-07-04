import { StyleSheet, FlatList, View, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db, workouts } from '../firebase.config';

import ItemList from "../components/ItemList";
import Button from "../components/ButtonRitch";



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
    if(myString.trim().length === 0) return;
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
  const onEdit = (item) => {
    navigation.navigate('Exercises', item);
  }



  return (
    <View style={styles.container}>

      <View style={styles.container_exercise_add}>
        <View style={styles.add_section_text}>
          <TextInput
            style={styles.input_add}
            value={toAdd}
            onChangeText={text => setToAdd(text)}
            placeHolder={"Exercise"}
          />
        </View>
        <View style={styles.add_section_buttons}>
          <Button 
            icon={"add"}
            onPress={() => onPressAdd()}
          />
        </View>
      </View>

      <View style={styles.container_exercise_list}>
        <FlatList
          data={docs}
          renderItem={({item}) =>
            <ItemList 
              item={item}
              onChangeName={onChangeName}
              onEdit={() => onEdit(item)}
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

  container_exercise_add: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_exercise_list: {
    flex: 10
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
});
