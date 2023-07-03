import { StyleSheet, FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import { db, exercises } from '../firebase.config';

import { styles_text } from "../utils/styles";
import Item_ExerciseManage from "../components/Item_ExerciseManage";



export default function ExercisesList() {
  const [docs, setDocs] = useState([]);

  const ref_exercises = collection(db, exercises);

  useEffect(() => {
    return onSnapshot(ref_exercises, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ name: doc.data().name }));
      setDocs(data);
    });
  }, []);



  const onPressDelete = (item) => {
    console.log(`${item.name} onPressDelete`);
  }
  const onPressEdit = (item) => {
    console.log(`${item.name} onPressEdit`);
  }



  return (
    <View style={{flex:1}}>
      <View style={styles.container_exercise_add}>
        <Text style={styles_text.common}>ASDF</Text>
      </View>

      <View style={styles.container_exercise_list}>
        <FlatList
          data={docs}
          renderItem={({item}) =>
            <Item_ExerciseManage 
              item={item}
              onPressDelete={() => onPressDelete(item)}
              onPressEdit={() => onPressEdit(item)}
            />
          }
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  container_exercise_add: {
    flex: 1
  },
  container_exercise_list: {
    flex: 9
  },
});
