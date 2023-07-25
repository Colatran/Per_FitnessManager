import { StyleSheet, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import { db, workouts } from '../firebase.config';

import ListItem_Play from "../components/ListItem_Play";



export default function WorkoutList_Practice({ navigation }) {
  const [docs, setDocs] = useState([]);

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



  const onPressPlay = (item) => {
    navigation.navigate('Practice', {workout: item});
  }



  return (
    <View style={styles.container}>
      <View style={{marginTop: 20}}>
        <FlatList
          data={docs}
          renderItem={({item}) =>
            <ListItem_Play 
              item={item}
              onPlay={() => onPressPlay(item)}
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
